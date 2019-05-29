import axios from 'axios';

export declare type Market = {
    stockTokenCode: number,
    cashTokenCode: number,
    symbol: string
}

export declare type Token = {
    code: number,
    symbol: string,
    name: string,
    decimalPlaces: number,
    contractAddress: string
}

export declare type Order = {
    id: number,
    type: 'buy' | 'sell',
    stockTokenCode: number,
    cashTokenCode: number,
    cashPrice: string,
    stockAmount: string,
    fulfilledStockAmount: string,
    createdAt: string,
    updatedAt: string,
    expiryTime: string,
    maker: string,
    uniqueId: string
}

export declare type Trade = {
    id: number,
    type: 'buy' | 'sell',
    stockTokenCode: number,
    cashTokenCode: number,
    stockAmount: string,
    cashAmount: string,
    amountEth: string,
    cashPrice: string,
    maker: string,
    taker: string,
    isBuyerMaker: true,
    timestamp: string
}


export class API {
    public static async walletNonces(address: string, query?: any) {
        const url = `/api/wallets/${address}/nonces`;
        return (await axios.get(url)).data.item;
    }

    public static async markets(): Promise<Market[]> {
        const url = `/api/markets`;
        return (await axios.get(url)).data.item;
    }

    public static async tokens(): Promise<Token[]> {
        const url = `/api/tokens`;
        return (await axios.get(url)).data.item;
    }

    public static async createOrder(data: any) {
        const url = '/api/orders'
        await axios.put(url, data)
    }

    public static async cancelOrder(data: any) {
        const url = '/api/orders'
        await axios.delete(url, data)
    }

    public static async nonce(address: string): Promise<number> {
        const nonces = await this.walletNonces(address);
        const tradeNonce = (nonces as any).trade as number;
        return tradeNonce
    }

    public static async withdraw(address: string, data: any) {
        const url = `/api/wallets/${address}/withdrawals`;
        await axios.put(url, data)
    }

    public static async getTokenAccounts(address: string, query?: any) {
       const url = `/wallets/${address}/token-accounts?format=hex`;
       return (axios.get(url, query) as any).items;
    }

    public static async getOrders(address: string, query?: any): Promise<Order[]> {
        const url = `/api/wallets/${address}/orders?format=float`;
        return (axios.get(url, query) as any).items;
    }

    public static async getWalletTrades(address: string, query?: any): Promise<Trade[]> {
        const url = `/api/wallets/${address}/trades?format=float`;
        return (axios.get(url, query) as any).items;
    }
}

