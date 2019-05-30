import Client from '../client/client';
import Order from './../models/order';
export declare function createOrder(client: Client, args: {
    type: 'buy' | 'sell';
    stockAmount: number;
    cashPrice: number;
    marketSymbol: string;
}): Promise<Order>;
export declare function cancelOrder(client: Client, id: string): Promise<void>;
export declare function fetchOrders(client: Client): Promise<Order[]>;
