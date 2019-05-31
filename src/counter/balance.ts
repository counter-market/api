import { BigNumber } from 'bignumber.js'

import Config from './../config'
import Client from '../client/client'
import { Requests } from '../requests'

import TokenBalance from './../models/token_balance'

export async function withdraw(client: Client, args: {
  tokenSymbol: string,
  amount: number
}) {
  const WITHDRAW_TITLE = 'counter.market withdraw:';
  const address = client.getAddress()

  const tokens = await Requests.tokens()
  const token = tokens.find(t => t.symbol === args.tokenSymbol);
  if (!token) {
    throw new Error(`No token can be found with symbol ${args.tokenSymbol}`);
  }

  const withdrawNonce = await Requests.nonce(address, 'withdraw');

  // FIXME: need to get withdrawFee from tokens
  const withdrawFee = `0x${new BigNumber(0).toString(16)}`;
  const amountWeiHex = `0x${new BigNumber(args.amount).shiftedBy(token.decimalPlaces).toString(16)}`;

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
      withdrawFee: withdrawFee,
      withdrawNonce,
    }
  })

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
  const address = client.getAddress()
  const tokenBalances = await Requests.balance(address)
  return tokenBalances
}