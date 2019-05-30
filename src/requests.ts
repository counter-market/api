import axios from 'axios';

import Market from './models/market'
import Token from './models/token'
import Trade from './models/trade'
import TokenBalance from './models/token_balance'
import Order from './models/order'

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
  public static async nonce(address: string, type: 'trade' | 'withdraw'): Promise<number> {
    const nonces = await this.walletNonces(address);
    const tradeNonce = (nonces as any)[type] as number;
    return tradeNonce;
  }

  public static async deposit(args: {
    addressHex: string,
    tokenCode: number,
    amountHex: number,
    txHash: string,
  }) {
    const url = `${API_URL}/wallets/${args.addressHex}/withdrawals`;
    return axios.put(url, {
      tokenCode: args.tokenCode,
      amount: `0x${args.amountHex}`,
      txHash: args.txHash,
    });
  }

  public static async withdraw(args: {
      address: string,
      tokenCode: number,
      amount: string,
      withdrawFeeE5: string,
      withdrawAddress: string,
      withdrawNonce: number,
      signature: string,
  }) {
    const url = `${API_URL}/wallets/${args.address}/withdrawals`;
    return axios.put(url, args);
  }

  public static async balance(address: string): Promise<TokenBalance[]> {
    const url = `${API_URL}/wallets/${address}/token-accounts?format=float`;
    return (await axios.get(url) as any).data.items;
  }

  public static async orders(address: string): Promise<Order[]> {
    const url = `${API_URL}/wallets/${address}/orders?format=float`;
    return (await axios.get(url) as any).data.items;
  }

  public static async walletTrades(address: string): Promise<Trade[]> {
    const url = `${API_URL}/wallets/${address}/trades?format=float`;
    return (await axios.get(url) as any).data.items;
  }
}
