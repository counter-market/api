import moment = require('moment');

export interface Props {
    buy: Array<{
        cashPrice: string,
        stockAmount: string,
        cashAmount: string,
    }>;
    sell: Array<{
        cashPrice: string,
        stockAmount: string,
        cashAmount: string,
    }>;
}

export class OrderBook implements Props {
    public buy: Array<{ cashPrice: string; stockAmount: string; cashAmount: string; }>;
    public sell: Array<{ cashPrice: string; stockAmount: string; cashAmount: string; }>;

    constructor(props: Props) {
        this.buy = props.buy;
        this.sell = props.sell;
    }

    public ccxt() {
        const bids = this.buy.map((b) => [b.cashPrice, b.stockAmount]);
        const asks = this.buy.map((b) => [b.cashPrice, b.stockAmount]);
        return {
            bids,
            asks,
        };
    }
}

export default OrderBook;
