export interface Props {
    code: number;
    symbol: string;
    name: string;
    decimalPlaces: number;
    contractAddress: string;
    withdrawalFeeAmount: string;
}
export declare class Token implements Props {
    code: number;
    symbol: string;
    name: string;
    decimalPlaces: number;
    contractAddress: string;
    withdrawalFeeAmount: string;
    constructor(prop: Props);
    ccxt(): {
        id: number;
        code: number;
        name: string;
        symbol: string;
        decimalPlaces: number;
        withdrawalFeeAmount: string;
    };
}
export default Token;
