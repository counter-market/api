import axios from 'axios';

import Market from './models/market';
import Token from './models/token';
import Trade from './models/trade';
import TokenBalance from './models/token_balance';
import Order from './models/order';

const API_URL = 'https://counter.market/api';

interface ApiOptions {
  apiUrl?: string;
  auth?: { username: string, password: string };
}

async function makeRequest(method: 'get' | 'post' | 'put' | 'delete', url: string, data: any) {
  const baseUrl = customApiOptions.apiUrl || API_URL;
  const fullUrl = `${baseUrl}${url}`;
  const response = await axios.request({
    method,
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
  return response.items;
}

async function tokens(): Promise<Token[]> {
  const response = await makeRequest('get', '/tokens?format=hex', {});
  return response.items;
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

async function orders(address: string): Promise<Order[]> {
  const response = await makeRequest('get', `/wallets/${address}/orders?format=float`, {});
  return response.items;
}

async function walletTrades(address: string): Promise<Trade[]> {
  const response = await makeRequest('get', `/wallets/${address}/trades?format=float`, {});
  return response.items;
}

export default {
  setCustomApiOptions,
  markets, tokens, createOrder, cancelOrder, nonce,
  deposit, withdraw, balance, orders, walletTrades,
};
export { ApiOptions };
