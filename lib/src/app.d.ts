export declare function createOrder(symbol: string, type: 'buy' | 'sell', amount: number, price: number, privateKey: string): Promise<string>;
export declare function cancelOrder(id: string, privateKey: string): Promise<void>;
export declare function withdraw(symbol: string, amount: number, privateKey: string): Promise<void>;
export declare function fetchBalance(privateKey: string, query?: any): Promise<import("../typings").TokenBalance[]>;
export declare function fetchOrders(privateKey: string, query?: any): Promise<import("../typings").Order[]>;
export declare function fetchMyTrades(privateKey: string, query?: any): Promise<import("../typings").Trade[]>;
