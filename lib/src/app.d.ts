import { TypedData } from '@dicether/eip712';
export declare type TypedDataEIP712 = TypedData;
export declare function createOrder(symbol: string, type: "buy" | "sell", amount: number, price: number, privateKey: string): Promise<void>;
export declare function cancaleOrder(id: string, privateKey: string): Promise<void>;
export declare function withdraw(symbol: string, amount: number, privateKey: string): Promise<void>;
export declare function fetchBalance(privateKey: string): Promise<{
    [index: string]: any;
}>;
export declare function fetchOrders(privateKey: string): Promise<import("./api").Order[]>;
export declare function fetchMyTrades(privateKey: string): Promise<import("./api").Trade>;
