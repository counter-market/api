import Market from './models/market';
import Token from './models/token';
import Trade from './models/trade';
import TokenBalance from './models/token_balance';
import Order from './models/order';
export declare class Requests {
    static walletNonces(address: string, query?: any): Promise<any>;
    static markets(): Promise<Market[]>;
    static tokens(): Promise<Token[]>;
    static createOrder(data: any): Promise<import("axios").AxiosResponse<any>>;
    static cancelOrder(data: any, id: string): Promise<import("axios").AxiosResponse<any>>;
    static nonce(address: string, type: 'trade' | 'withdraw'): Promise<number>;
    static withdraw(args: {
        address: string;
        tokenCode: number;
        amount: string;
        withdrawFeeE5: string;
        withdrawAddress: string;
        withdrawNonce: number;
        signature: string;
    }): Promise<import("axios").AxiosResponse<any>>;
    static balance(address: string): Promise<TokenBalance[]>;
    static orders(address: string): Promise<Order[]>;
    static walletTrades(address: string): Promise<Trade[]>;
}
