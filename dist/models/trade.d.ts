declare type Trade = {
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
};
export default Trade;
