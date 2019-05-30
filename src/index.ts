import { createOrder, cancelOrder, fetchOrders } from './counter/orders'
import { fetchMyTrades } from './counter/trades'
import { fetchBalance, withdraw } from './counter/balance'

import PrivateKeyClient from './client/private_key'

export default {
  // orders
  createOrder,
  cancelOrder,
  fetchOrders,

  // trades
  fetchMyTrades,
  
  // balance
  fetchBalance,
  withdraw,
  
  // clients
  PrivateKeyClient
}