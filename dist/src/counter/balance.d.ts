import Client from '../client/client';
import TokenBalance from './../models/token_balance';
export declare function withdraw(client: Client, tokenSymbol: string, amount: number): Promise<void>;
export declare function getBalance(client: Client): Promise<TokenBalance[]>;
