import { TypedData, signTypedData } from '@dicether/eip712'
import * as EthereumJSUtil from 'ethereumjs-util'

import Client, { EIP712Data } from './client'

function composeEIP712Data(data: EIP712Data) {
  const result: TypedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Message: data.types!.Message,
    },
    primaryType: 'Message',
    domain: {
      name: 'counter.market',
      version: '1',
      chainId: data.domain!.chainId,
      verifyingContract: data.domain!.verifyingContract,
    },
    message: data.message!,
  };
  return result;
}

class PrivateKeyClient implements Client {
  private privateKey: string = ""
  private privateKeyBuffer: Buffer = new Buffer("")

  constructor(privateKey: string) {
    this.privateKey = privateKey
    this.privateKeyBuffer = Buffer.from(privateKey, 'hex')
  }

  public getAddress() {
    const buffPrivateKey = Buffer.from(this.privateKey, 'hex')
    return `0x${EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex')}`
  }

  public async signEIP712(data: EIP712Data) {
    const EIP712data = composeEIP712Data(data)
    const signature = await signTypedData(EIP712data, this.privateKeyBuffer)
    return signature
  }
}

export default PrivateKeyClient