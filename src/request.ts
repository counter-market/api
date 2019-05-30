import axios from 'axios';
import { Market, Token, TokenBalance, Order, Trade } from 'typings';

const API_URL = 'https://counter.market/api';

export class Requests {
  public static async walletNonces(address: string, query?: any) {
    const url = `${API_URL}/wallets/${address}/nonces`;
    return (await axios.get(url, query)).data;
  }

  public static async markets(): Promise<Market[]> {
    const url = `${API_URL}/markets`;
    return (await axios.get(url)).data.items;
  }

  public static async tokens(): Promise<Token[]> {
    const url = `${API_URL}/tokens?format=hex`;
    return (await axios.get(url)).data.items;
  }

  public static async createOrder(data: any) {
    const url = `${API_URL}/orders?format=float`;
    return axios.put(url, data);
  }

  public static async cancelOrder(data: any, id: string) {
    const url = `${API_URL}/orders/${id}`;
    return axios.delete(url, { data });
  }

// tslint:disable-next-line: max-line-length
  public static async nonce(address: string, type: 'trade' | 'withdraw' = 'trade'): Promise<number> {
    const nonces = await this.walletNonces(address);
    const tradeNonce = (nonces as any)[type] as number;
    return tradeNonce;
  }

  public static async withdraw(address: string, data: any) {
    const url = `${API_URL}/wallets/${address}/withdrawals`;
    return axios.put(url, data);
  }

  public static async balance(address: string, query?: any): Promise<TokenBalance[]> {
    const url = `${API_URL}/wallets/${address}/token-accounts?format=float`;
    return (await axios.get(url, query) as any).data.items;
  }

  public static async orders(address: string, query?: any): Promise<Order[]> {
    const url = `${API_URL}/wallets/${address}/orders?format=float`;
    return (await axios.get(url, query) as any).data.items;
  }

  public static async walletTrades(address: string, query?: any): Promise<Trade[]> {
    const url = `${API_URL}/wallets/${address}/trades?format=float`;
    return (await axios.get(url, query) as any).data.items;
  }
}
