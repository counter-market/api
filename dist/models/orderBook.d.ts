export interface Props {
    buy: Array<{
        cashPrice: string;
        stockAmount: string;
        cashAmount: string;
    }>;
    sell: Array<{
        cashPrice: string;
        stockAmount: string;
        cashAmount: string;
    }>;
}
export declare class OrderBook implements Props {
    buy: Array<{
        cashPrice: string;
        stockAmount: string;
        cashAmount: string;
    }>;
    sell: Array<{
        cashPrice: string;
        stockAmount: string;
        cashAmount: string;
    }>;
    constructor(props: Props);
    ccxt(): {
        bids: string[][];
        asks: string[][];
    };
}
export default OrderBook;
