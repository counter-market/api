import { TypedData, signTypedData } from '@dicether/eip712'
import * as EthereumJSUtil from 'ethereumjs-util'
import * as Moment from 'moment'
import { API, Market, Token } from './api';
import BigNumber from "bignumber.js"

export type TypedDataEIP712 = TypedData

const NETWORK_ID = 1;
const EXCHANGE_CONTRACT = '0xc0deee11aa091189fff0713353c43c7c8cae7881';
const NODE_RPC_URL = 'http://195.154.81.55:3000';

let markets: Market[];
let tokens: Token[];

async function init() {
    markets = await API.markets();
    tokens = await API.tokens()
}

function composeTypedDataEIP712(data: Partial<TypedDataEIP712>) {
    const result: TypedDataEIP712 = {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ],
            Message: data.types!.Message
        },
        primaryType: 'Message',
        domain: {
            name: 'counter.market',
            version: '1',
            chainId: data.domain!.chainId,
            verifyingContract: data.domain!.verifyingContract
        },
        message: data.message!
    }
    return result
}


export async function createOrder(symbol: string, type: "buy" | "sell", amount: number, price: number, privateKey: string) {
    const CREATE_TITLE = 'counter.market order:';

    await init();
    const buffPrivateKey = Buffer.from(privateKey, 'hex');
    const walletAdress = '0x' + EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex');
    const tradeNonce = await API.nonce(walletAdress);

    const market = markets.find((market: Market) => market.symbol == symbol);
    if (!market) {
        throw 'incorect market';
    }

    const stockToken = tokens.find((token: Token) => token.code == market.stockTokenCode);

    const order = {
        action: type == 'buy' ? 0 : 1,
        priceE8: '0x' + new BigNumber(price).shiftedBy(8).toString(16),
        amount: '0x' + new BigNumber(amount).shiftedBy(stockToken!.decimalPlaces).toString(16),
        makerFeeE5: 100,
        takerFeeE5: 200,
        stockTokenCode: market.stockTokenCode,
        cashTokenCode: market.cashTokenCode,
        expiryTime: Moment().add('months', 1).unix(),
        tradeNonce: tradeNonce
    }
    const data = composeTypedDataEIP712({
        types: {
            Message: [
                { name: 'title', type: 'string' },
                { name: 'action', type: 'uint256' },
                { name: 'priceE8', type: 'uint256' },
                { name: 'amount', type: 'uint256' },
                { name: 'makerFeeE5', type: 'uint256' },
                { name: 'takerFeeE5', type: 'uint256' },
                { name: 'stockTokenCode', type: 'uint256' },
                { name: 'cashTokenCode', type: 'uint256' },
                { name: 'expiryTime', type: 'uint256' },
                { name: 'tradeNonce', type: 'uint256' }
            ]
        },
        domain: {
            chainId: NETWORK_ID,
            verifyingContract: EXCHANGE_CONTRACT
        },
        message: {
            title: CREATE_TITLE,
            ...order
        },
    });

    const eip712 = await signTypedData(data, buffPrivateKey) as string


    const requestData = {
        stockTokenCode: order.stockTokenCode,
        cashTokenCode: order.cashTokenCode,
        type: type,
        cashPriceE8: order.priceE8,
        stockAmount: order.amount,
        makerFeeE5: order.makerFeeE5,
        takerFeeE5: order.takerFeeE5,
        maker: walletAdress,
        signature: eip712,
        tradeNonce: tradeNonce, //'0x' + tradeNonce.toString(16),
        expiryTime: order.expiryTime
    }

    API.createOrder(requestData);
}

export async function cancaleOrder(id: string, privateKey: string) {
    const CANCEL_TITLE = 'counter.market order cancel:'

    const buffPrivateKey = Buffer.from(privateKey, 'hex');

    const data = composeTypedDataEIP712({
        types: {
            Message: [
                { name: 'title', type: 'string' },
                { name: 'uniqueId', type: 'bytes32' },
            ]
        },
        domain: {
            chainId: NETWORK_ID,
            verifyingContract: EXCHANGE_CONTRACT
        },
        message: {
            title: CANCEL_TITLE,
            uniqueId: id,
        }
    });
    const eip712 = await signTypedData(data, buffPrivateKey) as string;
    await API.cancelOrder({ eip712 });
}


export async function withdraw(symbol: string, amount: number, privateKey: string) {
    const WITHDRAW_TITLE = "counter.market withdraw:"

    const buffPrivateKey = Buffer.from(privateKey, 'hex');

    const walletAdress = '0x' + EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex');
    const withdrowNonce = await API.nonce(walletAdress);

    const token = tokens.find((token: Token) => token.symbol === symbol);
    if (!token) {
        throw 'incorect symbol'
    }


    const amountWei = new BigNumber(amount).shiftedBy(token!.decimalPlaces);

    const data = composeTypedDataEIP712({
        types: {
            Message: [
                { name: 'title', type: 'string' },
                { name: 'tokenCode', type: 'uint256' },
                { name: 'withdrawAddress', type: 'address' },
                { name: 'amount', type: 'uint256' },
                { name: 'withdrawFee', type: 'uint256' },
                { name: 'withdrawNonce', type: 'uint256' },
            ]
        },
        domain: {
            chainId: NETWORK_ID,
            verifyingContract: EXCHANGE_CONTRACT
        },
        message: {
            title: WITHDRAW_TITLE,
            tokenCode: token.code,
            withdrawAddress: walletAdress,
            amount: '0x' + amountWei.toString(16),
            withdrawFee: '0x' + (1000000000000000).toString(16),
            withdrawNonce: withdrowNonce
        }
    });

    const eip712 = await signTypedData(data, buffPrivateKey) as string;

    const requestData = {
        tokenCode: token.code,
        amount: '0x' + amountWei.toString(16),
        withdrawFeeE5: '0x' + (1000000000000000).toString(16),
        withdrawAddress: walletAdress,
        withdrawNonce: withdrowNonce,
        signature: eip712
    }

    await API.withdraw(walletAdress, requestData)
}


export async function fetchBalance(privateKey: string, query?: any) {
    const buffPrivateKey = Buffer.from(privateKey, 'hex');
    const walletAdress = '0x' + EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex');
    return API.getTokenAccounts(walletAdress, query);
}

export async function fetchOrders(privateKey: string, query?: any) {
    const buffPrivateKey = Buffer.from(privateKey, 'hex');
    const walletAdress = '0x' + EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex');
    return API.getOrders(walletAdress, query);
}

export async function fetchMyTrades(privateKey: string, query?: any) {
    const buffPrivateKey = Buffer.from(privateKey, 'hex');
    const walletAdress = '0x' + EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex');
    return API.getWalletTrades(walletAdress, query);
}