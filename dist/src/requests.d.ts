import Market from './models/market';
import Token from './models/token';
import Trade from './models/trade';
import TokenBalance from './models/token_balance';
import Order from './models/order';
interface ApiOptions {
    apiUrl?: string;
    auth?: {
        username: string;
        password: string;
    };
}
declare function setCustomApiOptions(apiOptions: ApiOptions): void;
declare function markets(): Promise<Market[]>;
declare function tokens(): Promise<Token[]>;
declare function createOrder(data: any): Promise<any>;
declare function cancelOrder(data: {
    signature: string;
}, id: string): Promise<any>;
declare function nonce(address: string, type: 'trade' | 'withdraw'): Promise<number>;
declare function deposit(args: {
    addressHex: string;
    tokenCode: number;
    amountHex: number;
    txHash: string;
}): Promise<any>;
declare function withdraw(args: {
    address: string;
    tokenCode: number;
    amount: string;
    withdrawFeeE5: string;
    withdrawAddress: string;
    withdrawNonce: number;
    signature: string;
}): Promise<any>;
declare function balance(address: string): Promise<TokenBalance[]>;
declare function orders(address: string): Promise<Order[]>;
declare function walletTrades(address: string): Promise<Trade[]>;
declare const _default: {
    setCustomApiOptions: typeof setCustomApiOptions;
    markets: typeof markets;
    tokens: typeof tokens;
    createOrder: typeof createOrder;
    cancelOrder: typeof cancelOrder;
    nonce: typeof nonce;
    deposit: typeof deposit;
    withdraw: typeof withdraw;
    balance: typeof balance;
    orders: typeof orders;
    walletTrades: typeof walletTrades;
};
export default _default;
export { ApiOptions };
