export interface Props {
    id: number;
    type: 'buy' | 'sell';
    stockTokenCode: number;
    cashTokenCode: number;
    stockAmount: string;
    cashAmount: string;
    amountEth: string;
    cashPrice: string;
    maker: string;
    taker: string;
    isBuyerMaker: true;
    timestamp: string;
}
export declare class Trade implements Props {
    id: number;
    type: 'buy' | 'sell';
    stockTokenCode: number;
    cashTokenCode: number;
    stockAmount: string;
    cashAmount: string;
    amountEth: string;
    cashPrice: string;
    maker: string;
    taker: string;
    isBuyerMaker: true;
    timestamp: string;
    constructor(props: Props);
    ccxt(): Promise<{
        id: number;
        timestamp: string;
        datetime: string;
        symbol: string;
        type: string;
        side: "buy" | "sell";
        takerOrMaker: string;
        price: string;
        amount: string;
    }>;
}
export default Trade;
