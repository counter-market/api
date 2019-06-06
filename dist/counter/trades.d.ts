import Client from '../client/client';
import TokenBalance from './../models/token_balance';
import Trade from './../models/trade';
export declare function getBalance(client: Client): Promise<TokenBalance[]>;
export declare function fetchMyTrades(client: Client): Promise<Trade[]>;
