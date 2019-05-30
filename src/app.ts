import { TypedData, signTypedData } from '@dicether/eip712';
import * as EthereumJSUtil from 'ethereumjs-util';
import * as Moment from 'moment';
import { BigNumber } from 'bignumber.js';
import { Requests } from './request';
import { Market, Token } from 'typings';

type TypedDataEIP712 = TypedData;

const NETWORK_ID = 1;
const EXCHANGE_CONTRACT = '0xc0deee11aa091189fff0713353c43c7c8cae7881';

let markets: Market[];
let tokens: Token[];

async function init() {
  markets = await Requests.markets();
  tokens = await Requests.tokens();
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
      Message: data.types!.Message,
    },
    primaryType: 'Message',
    domain: {
      name: 'counter.market',
      version: '1',
      chainId: data.domain!.chainId,
      verifyingContract: data.domain!.verifyingContract,
    },
    message: data.message!,
  };
  return result;
}

function getHexWalletAdress(privateKey: string) {
  const buffPrivateKey = Buffer.from(privateKey, 'hex');
  return `0x${EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex')}`;
}

// tslint:disable-next-line: max-line-length
export async function createOrder(symbol: string, type: 'buy' | 'sell', amount: number, price: number, privateKey: string) {
  const CREATE_TITLE = 'counter.market order:';

  await init();

  const buffPrivateKey = Buffer.from(privateKey, 'hex');
  const hexWalletAdress = getHexWalletAdress(privateKey);

  const tradeNonce = await Requests.nonce(hexWalletAdress);

  const market = markets.find((m: Market) => m.symbol === symbol);
  if (!market) {
    throw new Error('incorect market');
  }

  const stockToken = tokens.find((token: Token) => token.code === market.stockTokenCode);

  const order = {
    tradeNonce,
    action: type === 'buy' ? 0 : 1,
    priceE8: `0x${new BigNumber(price).shiftedBy(8).toString(16)}`,
    amount: `0x${new BigNumber(amount).shiftedBy(stockToken!.decimalPlaces).toString(16)}`,
    makerFeeE5: 100,
    takerFeeE5: 200,
    stockTokenCode: market.stockTokenCode,
    cashTokenCode: market.cashTokenCode,
    expiryTime: Moment().add(1, 'months').unix(),
  };

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
        { name: 'tradeNonce', type: 'uint256' },
      ],
    },
    domain: {
      chainId: NETWORK_ID,
      verifyingContract: EXCHANGE_CONTRACT,
    },
    message: {
      title: CREATE_TITLE,
      ...order,
    },
  });

  const eip712 = await signTypedData(data, buffPrivateKey) as string;

  const requestData = {
    type,
    tradeNonce,
    stockTokenCode: order.stockTokenCode,
    cashTokenCode: order.cashTokenCode,
    cashPriceE8: order.priceE8,
    stockAmount: order.amount,
    makerFeeE5: order.makerFeeE5,
    takerFeeE5: order.takerFeeE5,
    maker: hexWalletAdress,
    signature: eip712,
    expiryTime: order.expiryTime,
  };

  await Requests.createOrder(requestData);

  // tslint:disable-next-line: max-line-length
  return `0x${tradeNonce.toString(16).padStart(24, '0')}${hexWalletAdress.slice(2).padStart(40, '0')}`;
}

export async function cancelOrder(id: string, privateKey: string) {
  const CANCEL_TITLE = 'counter.market order cancel:';

  const buffPrivateKey = Buffer.from(privateKey, 'hex');

  const data = composeTypedDataEIP712({
    types: {
      Message: [
        { name: 'title', type: 'string' },
        { name: 'uniqueId', type: 'bytes32' },
      ],
    },
    domain: {
      chainId: NETWORK_ID,
      verifyingContract: EXCHANGE_CONTRACT,
    },
    message: {
      title: CANCEL_TITLE,
      uniqueId: id,
    },
  });
  const eip712 = await signTypedData(data, buffPrivateKey) as string;
  await Requests.cancelOrder({ signature: eip712 }, id);
}

export async function withdraw(symbol: string, amount: number, privateKey: string) {
  const WITHDRAW_TITLE = 'counter.market withdraw:';

  await init();

  const buffPrivateKey = Buffer.from(privateKey, 'hex');

  const hexWalletAdress = getHexWalletAdress(privateKey);
  const withdrowNonce = await Requests.nonce(hexWalletAdress, 'withdraw');

  const token = tokens.find((t: Token) => t.symbol === symbol);
  if (!token) {
    throw new Error('incorect symbol');
  }

  const withdrawalFeeAmountHex = `0x${new BigNumber(token.withdrawalFeeAmount || 0).toString(16)}`;

  const amountWeiHex = `0x${new BigNumber(amount).shiftedBy(token!.decimalPlaces).toString(16)}`;

  const data = composeTypedDataEIP712({
    types: {
      Message: [
        { name: 'title', type: 'string' },
        { name: 'tokenCode', type: 'uint256' },
        { name: 'withdrawAddress', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'withdrawFee', type: 'uint256' },
        { name: 'withdrawNonce', type: 'uint256' },
      ],
    },
    domain: {
      chainId: NETWORK_ID,
      verifyingContract: EXCHANGE_CONTRACT,
    },
    message: {
      title: WITHDRAW_TITLE,
      tokenCode: token.code,
      withdrawAddress: hexWalletAdress,
      amount: amountWeiHex,
      withdrawFee: withdrawalFeeAmountHex,
      withdrawNonce: withdrowNonce,
    },
  });

  const eip712 = await signTypedData(data, buffPrivateKey) as string;

  const requestData = {
    tokenCode: token.code,
    amount: amountWeiHex,
    withdrawFeeE5: withdrawalFeeAmountHex,
    withdrawAddress: hexWalletAdress,
    withdrawNonce: withdrowNonce,
    signature: eip712,
  };

  await Requests.withdraw(hexWalletAdress, requestData);
}

export async function fetchBalance(privateKey: string, query?: any) {
  const hexWalletAdress = getHexWalletAdress(privateKey);
  return Requests.balance(hexWalletAdress, query);
}

export async function fetchOrders(privateKey: string, query?: any) {
  const hexWalletAdress = getHexWalletAdress(privateKey);
  return Requests.orders(hexWalletAdress, query);
}

export async function fetchMyTrades(privateKey: string, query?: any) {
  const hexWalletAdress = getHexWalletAdress(privateKey);
  return Requests.walletTrades(hexWalletAdress, query);
}
