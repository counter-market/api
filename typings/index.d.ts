export declare type Market = {
    stockTokenCode: number,
    cashTokenCode: number,
    symbol: string,
  };
  
  export declare type Token = {
    code: number,
    symbol: string,
    name: string,
    decimalPlaces: number,
    contractAddress: string,
    withdrawalFeeAmount: string,
  };
  
  export declare type Order = {
    id: number,
    type: 'buy' | 'sell',
    stockTokenCode: number,
    cashTokenCode: number,
    cashPrice: string,
    stockAmount: string,
    fulfilledStockAmount: string,
    createdAt: string,
    updatedAt: string,
    expiryTime: string,
    maker: string,
    uniqueId: string,
  };
  
  export declare type Trade = {
    id: number,
    type: 'buy' | 'sell',
    stockTokenCode: number,
    cashTokenCode: number,
    stockAmount: string,
    cashAmount: string,
    amountEth: string,
    cashPrice: string,
    maker: string,
    taker: string,
    isBuyerMaker: true,
    timestamp: string,
  };
  
  export declare type TokenBalance = {
    id: string,
    tokenCode: 0,
    totalAmount: string,
    onOrders: string,
  };