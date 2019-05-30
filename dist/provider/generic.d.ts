/// <reference types="node" />
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
declare type GenericProvider = {
    initialize: (...args: any[]) => void;
    getAddress: () => string;
    signEIP712: (data: EIP712Data) => Promise<string>;
};
export default GenericProvider;
export { EIP712Data };
