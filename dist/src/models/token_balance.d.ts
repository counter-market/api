interface TokenBalance {
    id: string;
    tokenCode: 0;
    totalAmount: string;
    onOrders: string;
}
export interface Balance {
    free: {
        [key: string]: string;
    };
    used: {
        [key: string]: string;
    };
    total: {
        [key: string]: string;
    };
    [key: string]: {
        [key: string]: string;
    } | {
        [key: string]: {
            free: string;
            used: string;
            total: string;
        };
    };
}
export default TokenBalance;
