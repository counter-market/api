declare type Props = {
    id: number;
    type: 'buy' | 'sell';
    stockTokenCode: number;
    cashTokenCode: number;
    cashPrice: string;
    stockAmount: string;
    fulfilledStockAmount: string;
    createdAt: string;
    updatedAt: string;
    expiryTime: string | number;
    maker: string;
    uniqueId: string;
};
declare class Order implements Props {
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
    constructor(props: Partial<Props> & {
        type: 'buy' | 'sell';
    });
    setUniqueId(nonce: number): void;
}
export default Order;
