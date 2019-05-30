type Type = {
  name: string;
  type: string;
}

type Data = {
  [id: string]: Data;
} | string | Buffer | number | number[] | undefined;

type EIP712Data = {
  types: { 
    [id: string]: Type[]
  },
  domain: {
    chainId: number,
    verifyingContract: string
  },
  message: {
    [id: string]: Data
  }
}

type Client = {
  getAddress: () => string
  signEIP712: (data: EIP712Data) => Promise<string>
}

export default Client
export { EIP712Data }