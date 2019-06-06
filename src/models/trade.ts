import moment = require("moment");
import Requests from '../requests';

export interface Props {
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
}

export class Trade implements Props {
  public id!: number;
  public type: 'buy' | 'sell';
  public stockTokenCode!: number;
  public cashTokenCode!: number;
  public stockAmount!: string;
  public cashAmount!: string;
  public amountEth!: string;
  public cashPrice!: string;
  public maker!: string;
  public taker!: string;
  public isBuyerMaker!: true;
  public timestamp!: string;

  constructor(props: Props) {
    this.id = props.id;
    this.type = props.type;
    this.stockTokenCode = props.stockTokenCode;
    this.cashTokenCode = props.cashTokenCode;
    this.stockAmount = props.stockAmount;
    this.cashAmount = props.cashAmount;
    this.amountEth = props.amountEth;
    this.cashPrice = props.cashPrice;
    this.maker = props.maker;
    this.taker = props.taker;
    this.isBuyerMaker = props.isBuyerMaker;
    this.timestamp = props.timestamp;
  }

  public async ccxt() {
    const tokens = await Requests.tokens();
    const stockToken = tokens.find((token) => token.code === this.stockTokenCode);
    const cashToken = tokens.find((token) => token.code === this.cashTokenCode);
    return {
      id: this.id,
      timestamp: this.timestamp,
      datetime: moment(this.timestamp).toISOString(),
      symbol: `${stockToken!.symbol}/${cashToken!.symbol}`,
      type: 'limit',
      side: this.type,
      takerOrMaker: this.isBuyerMaker ? 'maker' : 'taker',
      price: this.cashPrice,
      amount: this.amountEth,
    };
  }
}

export default Trade;
