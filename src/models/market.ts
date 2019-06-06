import Requests from '../requests';

export interface Props {
  stockTokenCode: number;
  cashTokenCode: number;
  symbol: string;
}

export class Market implements Props {
  public stockTokenCode: number;
  public cashTokenCode: number;
  public symbol: string;

  constructor(prop: Props) {
    this.stockTokenCode = prop.stockTokenCode;
    this.cashTokenCode = prop.cashTokenCode;
    this.symbol = prop.symbol;
  }

  public async ccxt() {
    const tokens = await Requests.tokens();
    const stockToken = tokens.find((token) => token.code === this.stockTokenCode);
    const bq = this.symbol.split ('/');
    return {
      symbol: this.symbol,
      base: bq[0],
      quote: bq[1],
      id: this.symbol,
      precision: {
        price: 8,
        amount: stockToken!.decimalPlaces,
      },
    };
  }

}

export default Market;
