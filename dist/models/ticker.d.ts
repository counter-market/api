export interface Props {
    high: string;
    low: string;
    cashVolume: string;
    stockVolume: string;
    lastPrice: string;
    last24hPrice: string;
    openPrice: string;
}
export declare class Ticker implements Props {
    high: string;
    low: string;
    cashVolume: string;
    stockVolume: string;
    lastPrice: string;
    last24hPrice: string;
    openPrice: string;
    symbol: string;
    constructor(props: Props, symbol: string);
    ccxt(): {
        symbol: string;
        timestamp: number;
        datetime: string;
        high: string;
        low: string;
        vwap: string | number;
        open: string;
        close: string;
        last: string;
        previousClose: string;
        change: string;
        percentage: string | number;
        average: string;
        quoteVolume: string;
        baseVolume: string;
    };
}
export default Ticker;
