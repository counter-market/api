type Props = {
  id: number,
  type: 'buy' | 'sell',
  stockTokenCode: number,
  cashTokenCode: number,
  cashPrice: string,
  stockAmount: string,
  fulfilledStockAmount: string,
  createdAt: string,
  updatedAt: string,
  expiryTime: string | number,
  maker: string,
  uniqueId: string,
}

class Order implements Props {
  id: number = 0
  type: 'buy' | 'sell'
  stockTokenCode: number = 0
  cashTokenCode: number = 0
  cashPrice: string = ''
  stockAmount: string = ''
  fulfilledStockAmount: string = ''
  createdAt: string = ''
  updatedAt: string = ''
  expiryTime: string = ''
  maker: string = ''
  uniqueId: string = ''

  constructor(props: Partial<Props> & { type: 'buy' | 'sell' }) {
    this.type = props.type
    for(const key of Object.keys(props)) {
      (this as any)[key] = (props as any)[key]
    }
  }

  setUniqueId(nonce: number) {
    this.uniqueId = `0x${nonce.toString(16).padStart(24, '0')}${this.maker.slice(2).padStart(40, '0')}`
  }
}

export default Order