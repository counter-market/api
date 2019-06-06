import { Market } from './models/market';
import { Token } from './models/token';
import { Trade } from './models/trade';
import { Ticker } from './models/ticker';
import TokenBalance from './models/token_balance';
import { Order } from './models/order';
import OHLCV from './models/ohlcv';
import OrderBook from './models/orderBook';
interface ApiOptions {
    apiUrl?: string;
    auth?: {
        username: string;
        password: string;
    };
}
export interface Params {
    limit?: number;
    since?: number;
    till?: number;
    startId?: number;
    step?: number;
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
declare function orders(address: string, params?: Params): Promise<Order[]>;
declare function walletTrades(address: string, params?: Params): Promise<Trade[]>;
declare function ticker(symbol: string): Promise<Ticker>;
declare function orderBook(symbol: string, params: Params): Promise<OrderBook>;
declare function ohlcv(symbol: string, params: Params): Promise<OHLCV>;
declare function trades(symbol: string, params: Params): Promise<Trade[]>;
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
    ticker: typeof ticker;
    ohlcv: typeof ohlcv;
    trades: typeof trades;
    orderBook: typeof orderBook;
};
export default _default;
export { ApiOptions };
