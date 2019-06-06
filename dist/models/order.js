"use strict";
exports.__esModule = true;
var moment = require("moment");
var Order = /** @class */ (function () {
    function Order(props) {
        this.id = 0;
        this.stockTokenCode = 0;
        this.cashTokenCode = 0;
        this.cashPrice = '';
        this.stockAmount = '';
        this.fulfilledStockAmount = '';
        this.createdAt = moment().toISOString();
        this.updatedAt = moment().toISOString();
        this.expiryTime = '';
        this.maker = '';
        this.uniqueId = '';
        this.symbol = '';
        this.type = props.type;
        for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
            var key = _a[_i];
            this[key] = props[key];
        }
    }
    Order.prototype.setUniqueId = function (nonce) {
        this.uniqueId = "0x" + nonce.toString(16).padStart(24, '0') + this.maker.slice(2).padStart(40, '0');
    };
    Order.prototype.ccxt = function () {
        return {
            id: this.uniqueId,
            datetime: this.createdAt,
            timestamp: moment(this.createdAt).unix(),
            lastTradeTimestamp: moment(this.updatedAt).unix(),
            symbol: this.symbol,
            type: 'limit',
            side: this.type,
            price: this.cashPrice,
            amount: this.stockAmount
        };
    };
    return Order;
}());
exports.Order = Order;
exports["default"] = Order;
