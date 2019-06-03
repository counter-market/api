import * as Moment from 'moment';
import { BigNumber } from 'bignumber.js';

import Config from './../config';
import Client from '../client/client';
import Requests from '../requests';

import Order from './../models/order';

export async function placeOrder(client: Client,
                                 type: 'buy' | 'sell',
                                 stockAmount: number,
                                 cashPrice: number,
                                 marketSymbol: string): Promise<Order> {
  const CREATE_TITLE = 'counter.market order:';
  const address = client.getAddress();

  const markets = await Requests.markets();
  const market = markets.find((m) => m.symbol === marketSymbol);
  if (!market) {
    throw new Error(`Market ${marketSymbol} is not listed on counter`);
  }

  const tokens = await Requests.tokens();
  const stockToken = tokens.find((t) => t.code === market.stockTokenCode);
  if (!stockToken) {
    throw new Error(`Token with code ${market.stockTokenCode} can not be found`);
  }

  const tradeNonce = await Requests.nonce(address, 'trade');

  const order: Order = new Order({
    type: type,
    cashPrice: `${cashPrice}`,
    stockAmount: `${stockAmount}`,
    stockTokenCode: market.stockTokenCode,
    cashTokenCode: market.cashTokenCode,
    expiryTime: Moment().add(Config.ORDER_TTL_IN_DAYS, 'days').toISOString(),
    maker: address,
  });
  order.setUniqueId(tradeNonce);

  const signature = await client.signEIP712({
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
      chainId: Config.NETWORK_ID,
      verifyingContract: Config.EXCHANGE_CONTRACT,
    },
    message: {
      title: CREATE_TITLE,
      tradeNonce,
      action: order.type === 'buy' ? 0 : 1,
      priceE8: `0x${new BigNumber(order.cashPrice).shiftedBy(8).toString(16)}`,
      amount: `0x${new BigNumber(order.stockAmount).shiftedBy(stockToken.decimalPlaces).toString(16)}`,
      makerFeeE5: Config.MAKER_FEE_E5,
      takerFeeE5: Config.TAKER_FEE_E5,
      stockTokenCode: order.stockTokenCode,
      cashTokenCode: order.cashTokenCode,
      expiryTime: Moment(order.expiryTime).unix(),
    },
  });

  const requestData = {
    type: type,
    tradeNonce,
    stockTokenCode: order.stockTokenCode,
    cashTokenCode: order.cashTokenCode,
    cashPriceE8: `0x${new BigNumber(order.cashPrice).shiftedBy(8).toString(16)}`,
    stockAmount: `0x${new BigNumber(order.stockAmount).shiftedBy(stockToken.decimalPlaces).toString(16)}`,
    makerFeeE5: Config.MAKER_FEE_E5,
    takerFeeE5: Config.TAKER_FEE_E5,
    maker: address,
    signature,
    expiryTime: order.expiryTime,
  };

  await Requests.placeOrder(requestData);

  return order;
}

export async function cancelOrder(client: Client, id: string) {
  const CANCEL_TITLE = 'counter.market order cancel:';

  const signature = await client.signEIP712({
    types: {
      Message: [
        { name: 'title', type: 'string' },
        { name: 'uniqueId', type: 'bytes32' },
      ],
    },
    domain: {
      chainId: Config.NETWORK_ID,
      verifyingContract: Config.EXCHANGE_CONTRACT,
    },
    message: {
      title: CANCEL_TITLE,
      uniqueId: id,
    },
  });

  await Requests.cancelOrder({ signature }, id);
}

export async function fetchOrders(client: Client): Promise<Order[]> {
  const address = client.getAddress();
  const orders = await Requests.orders(address);
  return orders;
}
