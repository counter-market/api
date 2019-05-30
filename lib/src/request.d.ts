import { Market, Token, TokenBalance, Order, Trade } from 'typings';
export declare class Requests {
    static walletNonces(address: string, query?: any): Promise<any>;
    static markets(): Promise<Market[]>;
    static tokens(): Promise<Token[]>;
    static createOrder(data: any): Promise<import("axios").AxiosResponse<any>>;
    static cancelOrder(data: any, id: string): Promise<import("axios").AxiosResponse<any>>;
    static nonce(address: string, type?: 'trade' | 'withdraw'): Promise<number>;
    static withdraw(address: string, data: any): Promise<import("axios").AxiosResponse<any>>;
    static balance(address: string, query?: any): Promise<TokenBalance[]>;
    static orders(address: string, query?: any): Promise<Order[]>;
    static walletTrades(address: string, query?: any): Promise<Trade[]>;
}
