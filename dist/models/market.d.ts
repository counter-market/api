export interface Props {
    stockTokenCode: number;
    cashTokenCode: number;
    symbol: string;
}
export declare class Market implements Props {
    stockTokenCode: number;
    cashTokenCode: number;
    symbol: string;
    constructor(prop: Props);
    ccxt(): Promise<{
        symbol: string;
        base: string;
        quote: string;
        id: string;
        precision: {
            price: number;
            amount: number;
        };
    }>;
}
export default Market;
