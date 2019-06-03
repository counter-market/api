import { BigNumber } from 'bignumber.js';

import Config from './../config';
import Client from '../client/client';
import Requests from '../requests';

import TokenBalance from './../models/token_balance';

export async function withdraw(client: Client, tokenSymbol: string, amount: number) {
  const WITHDRAW_TITLE = 'counter.market withdraw:';
  const address = client.getAddress();

  const tokens = await Requests.tokens();
  const token = tokens.find((t) => t.symbol === tokenSymbol);
  if (!token) {
    throw new Error(`No token can be found with symbol ${tokenSymbol}`);
  }

  const withdrawNonce = await Requests.nonce(address, 'withdraw');

  const withdrawFee = `0x${new BigNumber(token.withdrawalFeeAmount).toString(16)}`;
  const amountWeiHex = `0x${new BigNumber(amount).shiftedBy(token.decimalPlaces).toString(16)}`;

  const signature = await client.signEIP712({
    types: {
      Message: [
        { name: 'title', type: 'string' },
        { name: 'tokenCode', type: 'uint256' },
        { name: 'withdrawAddress', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'withdrawFee', type: 'uint256' },
        { name: 'withdrawNonce', type: 'uint256' },
      ],
    },
    domain: {
      chainId: Config.NETWORK_ID,
      verifyingContract: Config.EXCHANGE_CONTRACT,
    },
    message: {
      title: WITHDRAW_TITLE,
      tokenCode: token.code,
      withdrawAddress: address,
      amount: amountWeiHex,
      withdrawFee,
      withdrawNonce,
    },
  });

  await Requests.withdraw({
    address,
    tokenCode: token.code,
    amount: amountWeiHex,
    withdrawFeeE5: withdrawFee,
    withdrawAddress: address,
    withdrawNonce,
    signature,
  });
}

export async function getBalance(client: Client): Promise<TokenBalance[]> {
  const address = client.getAddress();
  const tokenBalances = await Requests.balance(address);
  return tokenBalances;
}
