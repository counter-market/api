import Client from './client/client';
import * as CounterApi from './index';
import { Balance } from './models/token_balance';
import BigNumber from 'bignumber.js';
import Requests, { Params } from './requests';
import moment = require('moment');

class Counter {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async fetchBalance() {
        const address = this.client.getAddress();
        const tokenBalances = await Requests.balance(address);
        const balance: Balance = {
            free: {},
            used: {},
            total: {},
        };
        const tokens = await Requests.tokens();

        tokenBalances.forEach((tokenBalance) => {
            const symbol = tokens.find((token) => tokenBalance.tokenCode === token.code)!.symbol;
            const free = new BigNumber(tokenBalance.totalAmount).minus(tokenBalance.onOrders).toString();
            const used = tokenBalance.onOrders;
            const total = tokenBalance.totalAmount;
            balance.free[symbol] = free;
            balance.used[symbol] = used;
            balance.total[symbol] = total;
            balance[symbol] = { free, used, total };
        });
        return balance;
    }

    public async createOrder(symbol: string, type: string,
                             side: 'buy' | 'sell', amount: number, price: number, params: any) {
        if (type !== 'limit') {
            throw new Error(`${type} not supported`);
        }
        return (await CounterApi.createOrder(this.client, side, amount, price, symbol)).ccxt();
    }

    public async cancelOrder(id: string) {
        return CounterApi.cancelOrder(this.client, id);
    }

    public async fetchOrders() {
        return (await CounterApi.fetchOrders(this.client)).map((order) => order.ccxt());
    }

    public async fetchOrder(id: string) {
        return (await this.fetchOrders()).find((order) => order.id === id);
    }

    public async fetchMyTrades() {
        return Promise.all((await CounterApi.fetchMyTrades(this.client)).map(async (trade) => await trade.ccxt()));
    }

    public async withdraw(code: string, amount: number) {
        return CounterApi.withdraw(this.client, code, amount);
    }

    public async fetchMarkets() {
        return await Promise.all((await Requests.markets()).map(async (market) => await market.ccxt()));
    }

    public async fetchCurrencies() {
        return await Promise.all((await Requests.tokens()).map(async (token) => await token.ccxt()));
    }

    public async fetchTicker(symbol: string) {
        return (await Requests.ticker(symbol)).ccxt();
    }

    public async fetchOrderBook(symbol: string, limit?: number, params: Params = {}) {
        params.limit = limit;
        return (await Requests.orderBook(symbol, params)).ccxt();
    }

    public async fetchOHLCV(symbol: string, timeframe: string = '1m',
                            since: number, limit: number = 30, params: Params = {}) {

        const timeframes: { [key: string]: number } = {
            '1m': 60,
            '5m': 300,
            '15m': 900,
            '30m': 1800,
            '1h': 3600,
            '2h': 7200,
            '4h': 14400,
            '12h': 43200,
            '1d': 86400,
            '3d': 259200,
            '1w': 604800,
        };
        const date = moment();

        params.step = timeframes[timeframe];
        params.since = since || date.unix() - limit * params.step;
        params.till = +params.since + limit * params.step;
        return Requests.ohlcv(symbol, params);
    }

    public async fetchTrades(symbol: string, since: number = 0, limit: number = 30, params: Params = {}) {
        params.since = since;
        params.limit = limit;
        return await Promise.all((await Requests.trades(symbol, params)).map((trade) => trade.ccxt()));
    }
}

export default Counter;
