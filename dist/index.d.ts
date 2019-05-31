import { placeOrder, cancelOrder, fetchOrders } from './counter/orders';
import { fetchMyTrades } from './counter/trades';
import { getBalance, withdraw } from './counter/balance';
import PrivateKeyClient from './client/private_key';
declare const _default: {
    placeOrder: typeof placeOrder;
    cancelOrder: typeof cancelOrder;
    fetchOrders: typeof fetchOrders;
    fetchMyTrades: typeof fetchMyTrades;
    getBalance: typeof getBalance;
    withdraw: typeof withdraw;
    PrivateKeyClient: typeof PrivateKeyClient;
};
export default _default;
