export interface Props {
  code: number;
  symbol: string;
  name: string;
  decimalPlaces: number;
  contractAddress: string;
  withdrawalFeeAmount: string;
}

export class Token implements Props {
  public code: number;
  public symbol: string;
  public name: string;
  public decimalPlaces: number;
  public contractAddress: string;
  public withdrawalFeeAmount: string;

  constructor(prop: Props) {
    this.code = prop.code;
    this.symbol = prop.symbol;
    this.name = prop.name;
    this.decimalPlaces = prop.decimalPlaces;
    this.contractAddress = prop.contractAddress;
    this.withdrawalFeeAmount = prop.withdrawalFeeAmount;
  }

  public ccxt() {
    return {
      id: this.code,
      code: this.code,
      name: this.name,
      symbol: this.symbol,
      decimalPlaces: this.decimalPlaces,
      withdrawalFeeAmount: this.withdrawalFeeAmount,
    };
  }

}

export default Token;
