import Client from '../client/client';
import TokenBalance from './../models/token_balance';
export declare function withdraw(client: Client, args: {
    tokenSymbol: string;
    amount: number;
}): Promise<void>;
export declare function fetchBalance(client: Client): Promise<TokenBalance[]>;
