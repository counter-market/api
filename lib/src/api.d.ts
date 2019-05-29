export declare type Market = {
    stockTokenCode: number;
    cashTokenCode: number;
    symbol: string;
};
export declare type Token = {
    code: number;
    symbol: string;
    name: string;
    decimalPlaces: number;
    contractAddress: string;
};
export declare type Order = {
    id: number;
    type: 'buy' | 'sell';
    stockTokenCode: number;
    cashTokenCode: number;
    cashPrice: string;
    stockAmount: string;
    fulfilledStockAmount: string;
    createdAt: string;
    updatedAt: string;
    expiryTime: string;
    maker: string;
    uniqueId: string;
};
export declare type Trade = {
    id: number;
    type: 'buy' | 'sell';
    stockTokenCode: number;
    cashTokenCode: number;
    stockAmount: string;
    cashAmount: string;
    amountEth: string;
    cashPrice: string;
    maker: string;
    taker: string;
    isBuyerMaker: true;
    timestamp: string;
};
export declare class API {
    static walletNonces(address: string, query?: any): Promise<any>;
    static markets(): Promise<Market[]>;
    static tokens(): Promise<Token[]>;
    static createOrder(data: any): Promise<void>;
    static cancelOrder(data: any): Promise<void>;
    static nonce(address: string): Promise<number>;
    static withdraw(address: string, data: any): Promise<void>;
    static getOrders(address: string, query?: any): Promise<Order[]>;
    static getWalletTrades(address: string, query?: any): Promise<Trade>;
}
