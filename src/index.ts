import { createOrder, cancelOrder, fetchOrders } from './counter/orders';
import { fetchMyTrades } from './counter/trades';
import { getBalance, withdraw } from './counter/balance';

import PrivateKeyClient from './client/private_key';

import CCXTCompatible from './ccxt_compatible';

export {
  // orders
  createOrder,
  cancelOrder,
  fetchOrders,

  // trades
  fetchMyTrades,

  // balance
  getBalance,
  withdraw,

  // clients
  PrivateKeyClient,

  // ccxt
  CCXTCompatible,
};
