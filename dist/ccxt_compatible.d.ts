import Client from './client/client';
import { Balance } from './models/token_balance';
import { Params } from './requests';
declare class Counter {
    client: Client;
    constructor(client: Client);
    fetchBalance(): Promise<Balance>;
    createOrder(symbol: string, type: string, side: 'buy' | 'sell', amount: number, price: number, params: any): Promise<{
        id: string;
        datetime: string;
        timestamp: number;
        lastTradeTimestamp: number;
        symbol: string;
        type: string;
        side: "buy" | "sell";
        price: string;
        amount: string;
    }>;
    cancelOrder(id: string): Promise<void>;
    fetchOrders(): Promise<{
        id: string;
        datetime: string;
        timestamp: number;
        lastTradeTimestamp: number;
        symbol: string;
        type: string;
        side: "buy" | "sell";
        price: string;
        amount: string;
    }[]>;
    fetchOrder(id: string): Promise<{
        id: string;
        datetime: string;
        timestamp: number;
        lastTradeTimestamp: number;
        symbol: string;
        type: string;
        side: "buy" | "sell";
        price: string;
        amount: string;
    }>;
    fetchMyTrades(): Promise<Promise<{
        id: number;
        timestamp: string;
        datetime: string;
        symbol: string;
        type: string;
        side: "buy" | "sell";
        takerOrMaker: string;
        price: string;
        amount: string;
    }>[]>;
    withdraw(code: string, amount: number): Promise<void>;
    fetchMarkets(): Promise<{
        symbol: string;
        base: string;
        quote: string;
        id: string;
        precision: {
            price: number;
            amount: number;
        };
    }[]>;
    fetchCurrencies(): Promise<{
        id: number;
        code: number;
        name: string;
        symbol: string;
        decimalPlaces: number;
        withdrawalFeeAmount: string;
    }[]>;
    fetchTicker(symbol: string): Promise<{
        symbol: string;
        timestamp: number;
        datetime: string;
        high: string;
        low: string;
        vwap: string | number;
        open: string;
        close: string;
        last: string;
        previousClose: string;
        change: string;
        percentage: string | number;
        average: string;
        quoteVolume: string;
        baseVolume: string;
    }>;
    fetchOrderBook(symbol: string, limit?: number, params?: Params): Promise<{
        bids: string[][];
        asks: string[][];
    }>;
    fetchOHLCV(symbol: string, timeframe: string, since: number, limit?: number, params?: Params): Promise<import("./models/ohlcv").OHLCV>;
    fetchTrades(symbol: string, since?: number, limit?: number, params?: Params): Promise<{
        id: number;
        timestamp: string;
        datetime: string;
        symbol: string;
        type: string;
        side: "buy" | "sell";
        takerOrMaker: string;
        price: string;
        amount: string;
    }[]>;
}
export default Counter;
