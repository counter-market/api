import moment = require('moment');
import BigNumber from 'bignumber.js';

export interface Props {
    high: string;
    low: string;
    cashVolume: string;
    stockVolume: string;
    lastPrice: string;
    last24hPrice: string;
    openPrice: string;
}

export class Ticker implements Props {
    public high: string;
    public low: string;
    public cashVolume: string;
    public stockVolume: string;
    public lastPrice: string;
    public last24hPrice: string;
    public openPrice: string;
    public symbol: string;

    constructor(props: Props, symbol: string) {
        this.high = props.high;
        this.low = props.low;
        this.cashVolume = props.cashVolume;
        this.stockVolume = props.stockVolume;
        this.lastPrice = props.lastPrice;
        this.last24hPrice = props.last24hPrice;
        this.openPrice = props.openPrice;
        this.symbol = symbol;
    }
    public ccxt() {
        return {
            symbol: this.symbol,
            timestamp: moment().unix(),
            datetime: moment().toISOString(),
            high: this.high,
            low: this.low,
            vwap: this.cashVolume === '0' ? 0 : new BigNumber(this.stockVolume).dividedBy(this.cashVolume).toString(),
            open: this.openPrice,
            close: this.lastPrice,
            last: this.lastPrice,
            previousClose: this.last24hPrice,
            change: new BigNumber(this.lastPrice).minus(this.openPrice).toString(),
            percentage: this.openPrice === '0' ?
                0 : new BigNumber(this.lastPrice).dividedBy(this.openPrice).multipliedBy(100).toString(),
            average: new BigNumber(this.lastPrice).minus(this.openPrice).dividedBy(2).toString(),
            quoteVolume: this.stockVolume,
            baseVolume: this.cashVolume,
        };
    }

}

export default Ticker;
