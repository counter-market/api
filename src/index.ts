import { placeOrder, cancelOrder, fetchOrders } from './counter/orders';
import { fetchMyTrades } from './counter/trades';
import { getBalance, withdraw } from './counter/balance';

import PrivateKeyClient from './client/private_key';

export default {
  // orders
  placeOrder,
  cancelOrder,
  fetchOrders,

  // trades
  fetchMyTrades,

  // balance
  getBalance,
  withdraw,

  // clients
  PrivateKeyClient,
};