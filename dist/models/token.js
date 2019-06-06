"use strict";
exports.__esModule = true;
var Token = /** @class */ (function () {
    function Token(prop) {
        this.code = prop.code;
        this.symbol = prop.symbol;
        this.name = prop.name;
        this.decimalPlaces = prop.decimalPlaces;
        this.contractAddress = prop.contractAddress;
        this.withdrawalFeeAmount = prop.withdrawalFeeAmount;
    }
    Token.prototype.ccxt = function () {
        return {
            id: this.code,
            code: this.code,
            name: this.name,
            symbol: this.symbol,
            decimalPlaces: this.decimalPlaces,
            withdrawalFeeAmount: this.withdrawalFeeAmount
        };
    };
    return Token;
}());
exports.Token = Token;
exports["default"] = Token;
