import Generic, { EIP712Data } from './generic';
declare class PrivateKeyProvider implements Generic {
    private privateKey;
    private privateKeyBuffer;
    initialize(privateKey: string): void;
    getAddress(): string;
    signEIP712(data: EIP712Data): Promise<string>;
}
export default PrivateKeyProvider;
