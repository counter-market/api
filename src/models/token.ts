type Token = {
  code: number,
  symbol: string,
  name: string,
  decimalPlaces: number,
  contractAddress: string,

  // FIXME: is not available via public API
  // withdrawalFeeAmount: string, 
}

export default Token