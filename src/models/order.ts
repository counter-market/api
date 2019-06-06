import moment = require('moment');

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

export class Order implements Props {
  public id: number = 0;
  public type: 'buy' | 'sell';
  public stockTokenCode: number = 0;
  public cashTokenCode: number = 0;
  public cashPrice: string = '';
  public stockAmount: string = '';
  public fulfilledStockAmount: string = '';
  public createdAt: string = moment().toISOString();
  public updatedAt: string = moment().toISOString();
  public expiryTime: string = '';
  public maker: string = '';
  public uniqueId: string = '';
  public symbol: string = '';

  constructor(props: Partial<Props> & { type: 'buy' | 'sell' }) {
    this.type = props.type;
    for (const key of Object.keys(props)) {
      (this as any)[key] = (props as any)[key];
    }
  }

  public setUniqueId(nonce: number) {
    this.uniqueId = `0x${nonce.toString(16).padStart(24, '0')}${this.maker.slice(2).padStart(40, '0')}`;
  }

  public ccxt() {
    return {
      id: this.uniqueId,
      datetime: this.createdAt,
      timestamp: moment(this.createdAt).unix(),
      lastTradeTimestamp: moment(this.updatedAt).unix(),
      symbol: this.symbol,
      type: 'limit',
      side: this.type,
      price: this.cashPrice,
      amount: this.stockAmount,
    };
  }
}

export default Order;
