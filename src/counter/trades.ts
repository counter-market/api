import Client from '../client/client'
import Requests from '../requests'

import TokenBalance from './../models/token_balance'
import Trade from './../models/trade'

export async function fetchBalance(client: Client): Promise<TokenBalance[]> {
  const address = client.getAddress()
  const tokenBalances = await Requests.balance(address)
  return tokenBalances
}

export async function fetchMyTrades(client: Client): Promise<Trade[]> {
  const address = client.getAddress()
  const trades = Requests.walletTrades(address)
  return trades
}
