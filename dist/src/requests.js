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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var API_URL = 'https://counter.market/api';
function makeRequest(method, url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var baseUrl, fullUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = customApiOptions.apiUrl || API_URL;
                    fullUrl = "" + baseUrl + url;
                    return [4 /*yield*/, axios_1.default.request({
                            method: method,
                            url: fullUrl,
                            data: data,
                            auth: customApiOptions.auth,
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
var customApiOptions = {};
function setCustomApiOptions(apiOptions) {
    customApiOptions = apiOptions;
}
function markets() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('get', '/markets', {})];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.items];
            }
        });
    });
}
function tokens() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('get', '/tokens?format=hex', {})];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.items];
            }
        });
    });
}
function createOrder(data) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('put', '/orders?format=float', data)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
function cancelOrder(data, id) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('delete', "/orders/" + id, data)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
function nonce(address, type) {
    return __awaiter(this, void 0, void 0, function () {
        var response, tradeNonce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('get', "/wallets/" + address + "/nonces", {})];
                case 1:
                    response = _a.sent();
                    tradeNonce = response[type];
                    return [2 /*return*/, tradeNonce];
            }
        });
    });
}
function deposit(args) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('put', "/wallets/" + args.addressHex + "/withdrawals", {
                        tokenCode: args.tokenCode,
                        amount: "0x" + args.amountHex,
                        txHash: args.txHash,
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
function withdraw(args) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('put', "/wallets/" + args.address + "/withdrawals", args)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
function balance(address) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('get', "/wallets/" + address + "/token-accounts?format=float", {})];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.items];
            }
        });
    });
}
function orders(address) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('get', "/wallets/" + address + "/orders?format=float", {})];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.items];
            }
        });
    });
}
function walletTrades(address) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('get', "/wallets/" + address + "/trades?format=float", {})];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.items];
            }
        });
    });
}
exports.default = {
    setCustomApiOptions: setCustomApiOptions,
    markets: markets, tokens: tokens, createOrder: createOrder, cancelOrder: cancelOrder, nonce: nonce,
    deposit: deposit, withdraw: withdraw, balance: balance, orders: orders, walletTrades: walletTrades,
};
//# sourceMappingURL=requests.js.map