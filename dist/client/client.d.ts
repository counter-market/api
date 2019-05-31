/// <reference types="node" />
import { ApiOptions } from '../requests';
declare type Type = {
    name: string;
    type: string;
};
declare type Data = {
    [id: string]: Data;
} | string | Buffer | number | number[] | undefined;
declare type EIP712Data = {
    types: {
        [id: string]: Type[];
    };
    domain: {
        chainId: number;
        verifyingContract: string;
    };
    message: {
        [id: string]: Data;
    };
};
declare class Client {
    getAddress(): string;
    signEIP712(data: EIP712Data): Promise<string>;
    setCustomApiOptions(apiOptions: ApiOptions): void;
}
export default Client;
export { EIP712Data };
