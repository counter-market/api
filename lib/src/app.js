"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var eip712_1 = require("@dicether/eip712");
var EthereumJSUtil = require("ethereumjs-util");
var Moment = require("moment");
var api_1 = require("./api");
var bignumber_js_1 = require("bignumber.js");
var web3_1 = require("web3");
var erc20_1 = require("./abis/erc20");
var NETWORK_ID = 1;
var EXCHANGE_CONTRACT = '0xc0deee11aa091189fff0713353c43c7c8cae7881';
var markets;
var tokens;
function init() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api_1.API.markets()];
                case 1:
                    markets = _a.sent();
                    return [4 /*yield*/, api_1.API.tokens()];
                case 2:
                    tokens = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function composeTypedDataEIP712(data) {
    var result = {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ],
            Message: data.types.Message
        },
        primaryType: 'Message',
        domain: {
            name: 'counter.market',
            version: '1',
            chainId: data.domain.chainId,
            verifyingContract: data.domain.verifyingContract
        },
        message: data.message
    };
    return result;
}
function createOrder(symbol, type, amount, price, privateKey) {
    return __awaiter(this, void 0, void 0, function () {
        var CREATE_TITLE, buffPrivateKey, walletAdress, tradeNonce, market, stockToken, order, data, eip712, requestData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    CREATE_TITLE = 'counter.market order:';
                    return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    buffPrivateKey = Buffer.from(privateKey, 'hex');
                    walletAdress = '0x' + EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex');
                    return [4 /*yield*/, api_1.API.nonce(walletAdress)];
                case 2:
                    tradeNonce = _a.sent();
                    market = markets.find(function (market) { return market.symbol == symbol; });
                    if (!market) {
                        throw 'incorect market';
                    }
                    stockToken = tokens.find(function (token) { return token.code == market.stockTokenCode; });
                    order = {
                        action: type == 'buy' ? 0 : 1,
                        priceE8: '0x' + new bignumber_js_1.default(price).shiftedBy(8).toString(16),
                        amount: '0x' + new bignumber_js_1.default(amount).shiftedBy(stockToken.decimalPlaces).toString(16),
                        makerFeeE5: 100,
                        takerFeeE5: 200,
                        stockTokenCode: market.stockTokenCode,
                        cashTokenCode: market.cashTokenCode,
                        expiryTime: Moment().add('months', 1).unix(),
                        tradeNonce: tradeNonce
                    };
                    data = composeTypedDataEIP712({
                        types: {
                            Message: [
                                { name: 'title', type: 'string' },
                                { name: 'action', type: 'uint256' },
                                { name: 'priceE8', type: 'uint256' },
                                { name: 'amount', type: 'uint256' },
                                { name: 'makerFeeE5', type: 'uint256' },
                                { name: 'takerFeeE5', type: 'uint256' },
                                { name: 'stockTokenCode', type: 'uint256' },
                                { name: 'cashTokenCode', type: 'uint256' },
                                { name: 'expiryTime', type: 'uint256' },
                                { name: 'tradeNonce', type: 'uint256' }
                            ]
                        },
                        domain: {
                            chainId: NETWORK_ID,
                            verifyingContract: EXCHANGE_CONTRACT
                        },
                        message: __assign({ title: CREATE_TITLE }, order),
                    });
                    return [4 /*yield*/, eip712_1.signTypedData(data, buffPrivateKey)];
                case 3:
                    eip712 = _a.sent();
                    requestData = {
                        stockTokenCode: order.stockTokenCode,
                        cashTokenCode: order.cashTokenCode,
                        type: type,
                        cashPriceE8: order.priceE8,
                        stockAmount: order.amount,
                        makerFeeE5: order.makerFeeE5,
                        takerFeeE5: order.takerFeeE5,
                        maker: walletAdress,
                        signature: eip712,
                        tradeNonce: tradeNonce,
                        expiryTime: order.expiryTime
                    };
                    api_1.API.createOrder(requestData);
                    return [2 /*return*/];
            }
        });
    });
}
exports.createOrder = createOrder;
function cancaleOrder(id, privateKey) {
    return __awaiter(this, void 0, void 0, function () {
        var CANCEL_TITLE, buffPrivateKey, data, eip712;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    CANCEL_TITLE = 'counter.market order cancel:';
                    buffPrivateKey = Buffer.from(privateKey, 'hex');
                    data = composeTypedDataEIP712({
                        types: {
                            Message: [
                                { name: 'title', type: 'string' },
                                { name: 'uniqueId', type: 'bytes32' },
                            ]
                        },
                        domain: {
                            chainId: NETWORK_ID,
                            verifyingContract: EXCHANGE_CONTRACT
                        },
                        message: {
                            title: CANCEL_TITLE,
                            uniqueId: id,
                        }
                    });
                    return [4 /*yield*/, eip712_1.signTypedData(data, buffPrivateKey)];
                case 1:
                    eip712 = _a.sent();
                    return [4 /*yield*/, api_1.API.cancelOrder({ eip712: eip712 })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.cancaleOrder = cancaleOrder;
function withdraw(symbol, amount, privateKey) {
    return __awaiter(this, void 0, void 0, function () {
        var WITHDRAW_TITLE, buffPrivateKey, walletAdress, withdrowNonce, token, amountWei, data, eip712, requestData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    WITHDRAW_TITLE = "counter.market withdraw:";
                    buffPrivateKey = Buffer.from(privateKey, 'hex');
                    walletAdress = '0x' + EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex');
                    return [4 /*yield*/, api_1.API.nonce(walletAdress)];
                case 1:
                    withdrowNonce = _a.sent();
                    token = tokens.find(function (token) { return token.symbol === symbol; });
                    if (!token) {
                        throw 'incorect symbol';
                    }
                    amountWei = new bignumber_js_1.default(amount).shiftedBy(token.decimalPlaces);
                    data = composeTypedDataEIP712({
                        types: {
                            Message: [
                                { name: 'title', type: 'string' },
                                { name: 'tokenCode', type: 'uint256' },
                                { name: 'withdrawAddress', type: 'address' },
                                { name: 'amount', type: 'uint256' },
                                { name: 'withdrawFee', type: 'uint256' },
                                { name: 'withdrawNonce', type: 'uint256' },
                            ]
                        },
                        domain: {
                            chainId: NETWORK_ID,
                            verifyingContract: EXCHANGE_CONTRACT
                        },
                        message: {
                            title: WITHDRAW_TITLE,
                            tokenCode: token.code,
                            withdrawAddress: walletAdress,
                            amount: '0x' + amountWei.toString(16),
                            withdrawFee: '0x' + (1000000000000000).toString(16),
                            withdrawNonce: withdrowNonce
                        }
                    });
                    return [4 /*yield*/, eip712_1.signTypedData(data, buffPrivateKey)];
                case 2:
                    eip712 = _a.sent();
                    requestData = {
                        tokenCode: token.code,
                        amount: '0x' + amountWei.toString(16),
                        withdrawFeeE5: '0x' + (1000000000000000).toString(16),
                        withdrawAddress: walletAdress,
                        withdrawNonce: withdrowNonce,
                        signature: eip712
                    };
                    return [4 /*yield*/, api_1.API.withdraw(walletAdress, requestData)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.withdraw = withdraw;
function fetchBalance(privateKey) {
    return __awaiter(this, void 0, void 0, function () {
        var web3, buffPrivateKey, walletAdress, balances, _i, tokens_1, token, balanceWei, contract, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    web3 = new web3_1.default(new web3_1.default.providers.HttpProvider('123123123'));
                    buffPrivateKey = Buffer.from(privateKey, 'hex');
                    walletAdress = '0x' + EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex');
                    balances = {};
                    _i = 0, tokens_1 = tokens;
                    _a.label = 1;
                case 1:
                    if (!(_i < tokens_1.length)) return [3 /*break*/, 7];
                    token = tokens_1[_i];
                    if (token.contractAddress === "") {
                        return [3 /*break*/, 6];
                    }
                    balanceWei = void 0;
                    if (!(token.symbol === 'ETH')) return [3 /*break*/, 3];
                    return [4 /*yield*/, web3.eth.getBalance(walletAdress)];
                case 2:
                    balanceWei = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    contract = new web3.eth.Contract(erc20_1.default, token.contractAddress);
                    return [4 /*yield*/, contract.methods.balanceOf(walletAdress).call()];
                case 4:
                    balanceWei = _a.sent();
                    _a.label = 5;
                case 5:
                    balance = new bignumber_js_1.default(balanceWei.toString()).shiftedBy(-token.decimalPlaces);
                    balances[token.symbol] = balance;
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/, balances];
            }
        });
    });
}
exports.fetchBalance = fetchBalance;
function fetchOrders(privateKey) {
    return __awaiter(this, void 0, void 0, function () {
        var buffPrivateKey, walletAdress;
        return __generator(this, function (_a) {
            buffPrivateKey = Buffer.from(privateKey, 'hex');
            walletAdress = '0x' + EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex');
            return [2 /*return*/, api_1.API.getOrders(walletAdress)];
        });
    });
}
exports.fetchOrders = fetchOrders;
function fetchMyTrades(privateKey) {
    return __awaiter(this, void 0, void 0, function () {
        var buffPrivateKey, walletAdress;
        return __generator(this, function (_a) {
            buffPrivateKey = Buffer.from(privateKey, 'hex');
            walletAdress = '0x' + EthereumJSUtil.privateToAddress(buffPrivateKey).toString('hex');
            return [2 /*return*/, api_1.API.getWalletTrades(walletAdress)];
        });
    });
}
exports.fetchMyTrades = fetchMyTrades;
//# sourceMappingURL=app.js.map