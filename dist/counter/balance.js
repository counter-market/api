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
var bignumber_js_1 = require("bignumber.js");
var config_1 = require("./../config");
var requests_1 = require("../requests");
function withdraw(client, args) {
    return __awaiter(this, void 0, void 0, function () {
        var WITHDRAW_TITLE, address, tokens, token, withdrawNonce, withdrawFee, amountWeiHex, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    WITHDRAW_TITLE = 'counter.market withdraw:';
                    address = client.getAddress();
                    return [4 /*yield*/, requests_1.Requests.tokens()];
                case 1:
                    tokens = _a.sent();
                    token = tokens.find(function (t) { return t.symbol === args.tokenSymbol; });
                    if (!token) {
                        throw new Error("No token can be found with symbol " + args.tokenSymbol);
                    }
                    return [4 /*yield*/, requests_1.Requests.nonce(address, 'withdraw')];
                case 2:
                    withdrawNonce = _a.sent();
                    withdrawFee = "0x" + new bignumber_js_1.BigNumber(0).toString(16);
                    amountWeiHex = "0x" + new bignumber_js_1.BigNumber(args.amount).shiftedBy(token.decimalPlaces).toString(16);
                    return [4 /*yield*/, client.signEIP712({
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
                                chainId: config_1["default"].NETWORK_ID,
                                verifyingContract: config_1["default"].EXCHANGE_CONTRACT
                            },
                            message: {
                                title: WITHDRAW_TITLE,
                                tokenCode: token.code,
                                withdrawAddress: address,
                                amount: amountWeiHex,
                                withdrawFee: withdrawFee,
                                withdrawNonce: withdrawNonce
                            }
                        })];
                case 3:
                    signature = _a.sent();
                    return [4 /*yield*/, requests_1.Requests.withdraw({
                            address: address,
                            tokenCode: token.code,
                            amount: amountWeiHex,
                            withdrawFeeE5: withdrawFee,
                            withdrawAddress: address,
                            withdrawNonce: withdrawNonce,
                            signature: signature
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.withdraw = withdraw;
function fetchBalance(client) {
    return __awaiter(this, void 0, void 0, function () {
        var address, tokenBalances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    address = client.getAddress();
                    return [4 /*yield*/, requests_1.Requests.balance(address)];
                case 1:
                    tokenBalances = _a.sent();
                    return [2 /*return*/, tokenBalances];
            }
        });
    });
}
exports.fetchBalance = fetchBalance;
