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
var CounterApi = require("./index");
var bignumber_js_1 = require("bignumber.js");
var requests_1 = require("./requests");
var moment = require("moment");
var Counter = /** @class */ (function () {
    function Counter(client) {
        this.client = client;
    }
    Counter.prototype.fetchBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address, tokenBalances, balance, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = this.client.getAddress();
                        return [4 /*yield*/, requests_1["default"].balance(address)];
                    case 1:
                        tokenBalances = _a.sent();
                        balance = {
                            free: {},
                            used: {},
                            total: {}
                        };
                        return [4 /*yield*/, requests_1["default"].tokens()];
                    case 2:
                        tokens = _a.sent();
                        tokenBalances.forEach(function (tokenBalance) {
                            var symbol = tokens.find(function (token) { return tokenBalance.tokenCode === token.code; }).symbol;
                            var free = new bignumber_js_1["default"](tokenBalance.totalAmount).minus(tokenBalance.onOrders).toString();
                            var used = tokenBalance.onOrders;
                            var total = tokenBalance.totalAmount;
                            balance.free[symbol] = free;
                            balance.used[symbol] = used;
                            balance.total[symbol] = total;
                            balance[symbol] = { free: free, used: used, total: total };
                        });
                        return [2 /*return*/, balance];
                }
            });
        });
    };
    Counter.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type !== 'limit') {
                            throw new Error(type + " not supported");
                        }
                        return [4 /*yield*/, CounterApi.createOrder(this.client, side, amount, price, symbol)];
                    case 1: return [2 /*return*/, (_a.sent()).ccxt()];
                }
            });
        });
    };
    Counter.prototype.cancelOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, CounterApi.cancelOrder(this.client, id)];
            });
        });
    };
    Counter.prototype.fetchOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CounterApi.fetchOrders(this.client)];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (order) { return order.ccxt(); })];
                }
            });
        });
    };
    Counter.prototype.fetchOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchOrders()];
                    case 1: return [2 /*return*/, (_a.sent()).find(function (order) { return order.id === id; })];
                }
            });
        });
    };
    Counter.prototype.fetchMyTrades = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, CounterApi.fetchMyTrades(this.client)];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).map(function (trade) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, trade.ccxt()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })])];
                }
            });
        });
    };
    Counter.prototype.withdraw = function (code, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, CounterApi.withdraw(this.client, code, amount)];
            });
        });
    };
    Counter.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, requests_1["default"].markets()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).map(function (market) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, market.ccxt()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })])];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    Counter.prototype.fetchCurrencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, requests_1["default"].tokens()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).map(function (token) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, token.ccxt()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })])];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    Counter.prototype.fetchTicker = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, requests_1["default"].ticker(symbol)];
                    case 1: return [2 /*return*/, (_a.sent()).ccxt()];
                }
            });
        });
    };
    Counter.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params.limit = limit;
                        return [4 /*yield*/, requests_1["default"].orderBook(symbol, params)];
                    case 1: return [2 /*return*/, (_a.sent()).ccxt()];
                }
            });
        });
    };
    Counter.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (limit === void 0) { limit = 30; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var timeframes, date;
            return __generator(this, function (_a) {
                timeframes = {
                    '1m': 60,
                    '5m': 300,
                    '15m': 900,
                    '30m': 1800,
                    '1h': 3600,
                    '2h': 7200,
                    '4h': 14400,
                    '12h': 43200,
                    '1d': 86400,
                    '3d': 259200,
                    '1w': 604800
                };
                date = moment();
                params.step = timeframes[timeframe];
                params.since = since || date.unix() - limit * params.step;
                params.till = +params.since + limit * params.step;
                return [2 /*return*/, requests_1["default"].ohlcv(symbol, params)];
            });
        });
    };
    Counter.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = 0; }
        if (limit === void 0) { limit = 30; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        params.since = since;
                        params.limit = limit;
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, requests_1["default"].trades(symbol, params)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).map(function (trade) { return trade.ccxt(); })])];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    return Counter;
}());
exports["default"] = Counter;
