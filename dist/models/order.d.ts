export interface Props {
    id: number;
    type: 'buy' | 'sell';
    stockTokenCode: number;
    cashTokenCode: number;
    symbol: string;
    cashPrice: string;
    stockAmount: string;
    fulfilledStockAmount: string;
    createdAt: string;
    updatedAt: string;
    expiryTime: string | number;
    maker: string;
    uniqueId: string;
}
export declare class Order implements Props {
    id: number;
    type: 'buy' | 'sell';
    stockTokenCode: number;
    cashTokenCode: number;
    cashPrice: string;
    stockAmount: string;
    fulfilledStockAmount: string;
    createdAt: string;
    updatedAt: string;
    expiryTime: string;
    maker: string;
    uniqueId: string;
    symbol: string;
    constructor(props: Partial<Props> & {
        type: 'buy' | 'sell';
    });
    setUniqueId(nonce: number): void;
    ccxt(): {
        id: string;
        datetime: string;
        timestamp: number;
        lastTradeTimestamp: number;
        symbol: string;
        type: string;
        side: "buy" | "sell";
        price: string;
        amount: string;
    };
}
export default Order;
