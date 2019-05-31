"use strict";
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
exports.__esModule = true;
var Moment = require("moment");
var bignumber_js_1 = require("bignumber.js");
var config_1 = require("./../config");
var requests_1 = require("../requests");
var order_1 = require("./../models/order");
function placeOrder(client, args) {
    return __awaiter(this, void 0, void 0, function () {
        var CREATE_TITLE, address, markets, market, tokens, stockToken, tradeNonce, order, signature, requestData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    CREATE_TITLE = 'counter.market order:';
                    address = client.getAddress();
                    return [4 /*yield*/, requests_1.Requests.markets()];
                case 1:
                    markets = _a.sent();
                    market = markets.find(function (m) { return m.symbol === args.marketSymbol; });
                    if (!market) {
                        throw new Error("Market " + args.marketSymbol + " is not listed on counter");
                    }
                    return [4 /*yield*/, requests_1.Requests.tokens()];
                case 2:
                    tokens = _a.sent();
                    stockToken = tokens.find(function (t) { return t.code === market.stockTokenCode; });
                    if (!stockToken) {
                        throw new Error("Token with code " + market.stockTokenCode + " can not be found");
                    }
                    return [4 /*yield*/, requests_1.Requests.nonce(address, 'trade')];
                case 3:
                    tradeNonce = _a.sent();
                    order = new order_1["default"]({
                        type: args.type,
                        cashPrice: "" + args.cashPrice,
                        stockAmount: "" + args.stockAmount,
                        stockTokenCode: market.stockTokenCode,
                        cashTokenCode: market.cashTokenCode,
                        expiryTime: Moment().add(config_1["default"].ORDER_TTL_IN_DAYS, 'days').toISOString(),
                        maker: address
                    });
                    order.setUniqueId(tradeNonce);
                    return [4 /*yield*/, client.signEIP712({
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
                                    { name: 'tradeNonce', type: 'uint256' },
                                ]
                            },
                            domain: {
                                chainId: config_1["default"].NETWORK_ID,
                                verifyingContract: config_1["default"].EXCHANGE_CONTRACT
                            },
                            message: {
                                title: CREATE_TITLE,
                                tradeNonce: tradeNonce,
                                action: order.type === 'buy' ? 0 : 1,
                                priceE8: "0x" + new bignumber_js_1.BigNumber(order.cashPrice).shiftedBy(8).toString(16),
                                amount: "0x" + new bignumber_js_1.BigNumber(order.stockAmount).shiftedBy(stockToken.decimalPlaces).toString(16),
                                makerFeeE5: config_1["default"].MAKER_FEE_E5,
                                takerFeeE5: config_1["default"].TAKER_FEE_E5,
                                stockTokenCode: order.stockTokenCode,
                                cashTokenCode: order.cashTokenCode,
                                expiryTime: Moment(order.expiryTime).unix()
                            }
                        })];
                case 4:
                    signature = _a.sent();
                    requestData = {
                        type: args.type,
                        tradeNonce: tradeNonce,
                        stockTokenCode: order.stockTokenCode,
                        cashTokenCode: order.cashTokenCode,
                        cashPriceE8: "0x" + new bignumber_js_1.BigNumber(order.cashPrice).shiftedBy(8).toString(16),
                        stockAmount: "0x" + new bignumber_js_1.BigNumber(order.stockAmount).shiftedBy(stockToken.decimalPlaces).toString(16),
                        makerFeeE5: config_1["default"].MAKER_FEE_E5,
                        takerFeeE5: config_1["default"].TAKER_FEE_E5,
                        maker: address,
                        signature: signature,
                        expiryTime: order.expiryTime
                    };
                    return [4 /*yield*/, requests_1.Requests.placeOrder(requestData)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, order];
            }
        });
    });
}
exports.placeOrder = placeOrder;
function cancelOrder(client, id) {
    return __awaiter(this, void 0, void 0, function () {
        var CANCEL_TITLE, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    CANCEL_TITLE = 'counter.market order cancel:';
                    return [4 /*yield*/, client.signEIP712({
                            types: {
                                Message: [
                                    { name: 'title', type: 'string' },
                                    { name: 'uniqueId', type: 'bytes32' },
                                ]
                            },
                            domain: {
                                chainId: config_1["default"].NETWORK_ID,
                                verifyingContract: config_1["default"].EXCHANGE_CONTRACT
                            },
                            message: {
                                title: CANCEL_TITLE,
                                uniqueId: id
                            }
                        })];
                case 1:
                    signature = _a.sent();
                    return [4 /*yield*/, requests_1.Requests.cancelOrder({ signature: signature }, id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.cancelOrder = cancelOrder;
function fetchOrders(client) {
    return __awaiter(this, void 0, void 0, function () {
        var address, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    address = client.getAddress();
                    return [4 /*yield*/, requests_1.Requests.orders(address)];
                case 1:
                    orders = _a.sent();
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.fetchOrders = fetchOrders;
