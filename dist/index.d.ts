import { createOrder, cancelOrder, fetchOrders } from './counter/orders';
import { fetchMyTrades } from './counter/trades';
import { fetchBalance, withdraw } from './counter/balance';
import PrivateKeyClient from './client/private_key';
declare const _default: {
    createOrder: typeof createOrder;
    cancelOrder: typeof cancelOrder;
    fetchOrders: typeof fetchOrders;
    fetchMyTrades: typeof fetchMyTrades;
    fetchBalance: typeof fetchBalance;
    withdraw: typeof withdraw;
    PrivateKeyClient: typeof PrivateKeyClient;
};
export default _default;
