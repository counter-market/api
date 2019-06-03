import Requests, { ApiOptions } from '../requests';

interface Type {
  name: string;
  type: string;
}

type Data = {
  [id: string]: Data;
} | string | Buffer | number | number[] | undefined;

interface EIP712Data {
  types: {
    [id: string]: Type[],
  };
  domain: {
    chainId: number,
    verifyingContract: string,
  };
  message: {
    [id: string]: Data,
  };
}

class Client {
  public getAddress(): string {
    throw new Error('Implementation required');
  }
  public async signEIP712(data: EIP712Data): Promise<string> {
    throw new Error('Implementation required');
  }

  public setCustomApiOptions(apiOptions: ApiOptions) {
    Requests.setCustomApiOptions(apiOptions);
  }
}

export default Client;
export { EIP712Data };
