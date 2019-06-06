import axios from 'axios';

import { Market, Props as MarketProps } from './models/market';
import { Token, Props as TokenProps } from './models/token';
import { Trade, Props as TradeProps } from './models/trade';
import { Ticker, Props as TickerProps } from './models/ticker';
import TokenBalance from './models/token_balance';
import { Order, Props as OrderProps } from './models/order';
import OHLCV from './models/ohlcv';
import OrderBook from './models/orderBook';

const API_URL = 'https://counter.market/api';

interface ApiOptions {
  apiUrl?: string;
  auth?: { username: string, password: string };
}

export interface Params {
  limit?: number;
  since?: number;
  till?: number;
  startId?: number;
  step?: number;
}

async function makeRequest(method: 'get' | 'post' | 'put' | 'delete', url: string, data: any, params?: Params) {
  const baseUrl = customApiOptions.apiUrl || API_URL;
  const fullUrl = `${baseUrl}${url}`;
  const response = await axios.request({
    method,
    params,
    url: fullUrl,
    data,
    auth: customApiOptions.auth,
  });
  return response.data;
}

let customApiOptions: ApiOptions = {};

function setCustomApiOptions(apiOptions: ApiOptions) {
  customApiOptions = apiOptions;
}

async function markets(): Promise<Market[]> {
  const response = await makeRequest('get', '/markets', {});
  return response.items.map((market: MarketProps) => new Market(market));
}

async function tokens(): Promise<Token[]> {
  const response = await makeRequest('get', '/tokens?format=hex', {});
  return response.items.map((token: TokenProps) => new Token(token));
}

async function createOrder(data: any) {
  const response = await makeRequest('put', '/orders?format=float', data);
  return response;
}

async function cancelOrder(data: { signature: string }, id: string) {
  const response = await makeRequest('delete', `/orders/${id}`, data);
  return response;
}

async function nonce(address: string, type: 'trade' | 'withdraw'): Promise<number> {
  const response = await makeRequest('get', `/wallets/${address}/nonces`, {});
  const tradeNonce = (response as any)[type] as number;
  return tradeNonce;
}

async function deposit(args: {
  addressHex: string,
  tokenCode: number,
  amountHex: number,
  txHash: string,
}) {
  const response = await makeRequest(
    'put',
    `/wallets/${args.addressHex}/withdrawals`,
    {
      tokenCode: args.tokenCode,
      amount: `0x${args.amountHex}`,
      txHash: args.txHash,
    });
  return response;
}

async function withdraw(args: {
  address: string,
  tokenCode: number,
  amount: string,
  withdrawFeeE5: string,
  withdrawAddress: string,
  withdrawNonce: number,
  signature: string,
}) {
  const response = await makeRequest(
    'put',
    `/wallets/${args.address}/withdrawals`,
    args);
  return response;
}

async function balance(address: string): Promise<TokenBalance[]> {
  const response = await makeRequest('get', `/wallets/${address}/token-accounts?format=float`, {});
  return response.items;
}

async function orders(address: string, params?: Params): Promise<Order[]> {
  const response = await makeRequest('get', `/wallets/${address}/orders?format=float`, {}, params);
  return response.items.map((order: OrderProps) => new Order(order));
}

async function walletTrades(address: string, params?: Params): Promise<Trade[]> {
  const response = await makeRequest('get', `/wallets/${address}/trades?format=float`, {}, params);
  return response.items.map((trade: TradeProps) => new Trade(trade));
}

async function ticker(symbol: string): Promise<Ticker> {
  const response = await makeRequest('get', `/markets/${symbol}/ticker?format=float`, {});
  return new Ticker(response, symbol);
}

async function orderBook(symbol: string, params: Params): Promise<OrderBook> {
  const response = await makeRequest('get', `/markets/${symbol}/orderbook?format=float`, {}, params);
  return new OrderBook(response);
}

async function ohlcv(symbol: string, params: Params): Promise<OHLCV> {
  const response = await makeRequest('get', `/markets/${symbol}/ohlcv?format=float`, {}, params);
  return response.items;
}

async function trades(symbol: string, params: Params): Promise<Trade[]> {
  const response = await makeRequest('get', `/markets/${symbol}/trades?format=float`, {}, params);
  return response.items.map((trade: TradeProps) => new Trade(trade));
}

export default {
  setCustomApiOptions,
  markets, tokens, createOrder, cancelOrder, nonce,
  deposit, withdraw, balance, orders, walletTrades,
  ticker, ohlcv, trades, orderBook,
};
export { ApiOptions };
