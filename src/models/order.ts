interface Props {
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
}

class Order implements Props {
  public id: number = 0;
  public type: 'buy' | 'sell';
  public stockTokenCode: number = 0;
  public cashTokenCode: number = 0;
  public cashPrice: string = '';
  public stockAmount: string = '';
  public fulfilledStockAmount: string = '';
  public createdAt: string = '';
  public updatedAt: string = '';
  public expiryTime: string = '';
  public maker: string = '';
  public uniqueId: string = '';

  constructor(props: Partial<Props> & { type: 'buy' | 'sell' }) {
    this.type = props.type;
    for (const key of Object.keys(props)) {
      (this as any)[key] = (props as any)[key];
    }
  }

  public setUniqueId(nonce: number) {
    this.uniqueId = `0x${nonce.toString(16).padStart(24, '0')}${this.maker.slice(2).padStart(40, '0')}`;
  }
}

export default Order;
