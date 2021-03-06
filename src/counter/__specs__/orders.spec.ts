import 'jest';
import { BigNumber } from 'bignumber.js';

import Market from '../../models/market';
import Token from '../../models/token';
import Client from '../../client/client';

import * as Orders from '../orders';

const createOrderMock = jest.fn();
jest.mock('../../requests', () => ({
  default: {
    markets: async () => ([
      { symbol: 'OMG/ETH', stockTokenCode: 1, cashTokenCode: 0 } as Market,
    ]),
    tokens: async () => ([
       { code: 0, decimalPlaces: 18, withdrawalFeeAmount: '0' } as Token,
       { code: 1, decimalPlaces: 18, withdrawalFeeAmount: '0' } as Token,
    ]),
    createOrder: async (...args: any[]) => createOrderMock(...args),
    nonce: async () => 101,
  },
}));

const signEIP712Mock = jest.fn((...args: any[]) => '0xabcdef');
const client: Client = new Client();
client.getAddress = () => '0x12345';
client.signEIP712 = async (...args: any[]) => signEIP712Mock(...args);

beforeEach(() => {
  createOrderMock.mockClear();
  signEIP712Mock.mockClear();
});

describe('Orders', () => {

  describe('createOrder', () => {

    it('places order', async (done) => {
      await Orders.createOrder(client, 'buy', 100, 0.1, 'OMG/ETH');

      expect(signEIP712Mock).toHaveBeenCalledTimes(1);

      let args = signEIP712Mock.mock.calls[0][0];
      expect(args.message.tradeNonce).toEqual(101);
      expect(args.message.action).toEqual(0);
      expect(args.message.priceE8).toEqual(`0x${new BigNumber(0.1).shiftedBy(8).toString(16)}`);
      expect(args.message.amount).toEqual(`0x${new BigNumber(100).shiftedBy(18).toString(16)}`);
      expect(args.message.makerFeeE5).toEqual(100);
      expect(args.message.takerFeeE5).toEqual(200);
      expect(args.message.stockTokenCode).toEqual(1);
      expect(args.message.cashTokenCode).toEqual(0);

      expect(createOrderMock).toHaveBeenCalledTimes(1);

      args = createOrderMock.mock.calls[0][0];

      expect(args.type).toEqual('buy');
      expect(args.tradeNonce).toEqual(101);
      expect(args.stockTokenCode).toEqual(1);
      expect(args.cashTokenCode).toEqual(0);
      expect(args.cashPriceE8).toEqual(`0x${new BigNumber(0.1).shiftedBy(8).toString(16)}`);
      expect(args.stockAmount).toEqual(`0x${new BigNumber(100).shiftedBy(18).toString(16)}`);
      expect(args.makerFeeE5).toEqual(100);
      expect(args.takerFeeE5).toEqual(200);
      expect(args.maker).toEqual('0x12345');
      expect(args.signature).toEqual('0xabcdef');

      done();
    });

  });

});
