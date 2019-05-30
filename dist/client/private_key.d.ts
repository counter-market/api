import Client, { EIP712Data } from './client';
declare class PrivateKeyClient implements Client {
    private privateKey;
    private privateKeyBuffer;
    constructor(privateKey: string);
    getAddress(): string;
    signEIP712(data: EIP712Data): Promise<string>;
}
export default PrivateKeyClient;
