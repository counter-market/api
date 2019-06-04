"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order = /** @class */ (function () {
    function Order(props) {
        this.id = 0;
        this.stockTokenCode = 0;
        this.cashTokenCode = 0;
        this.cashPrice = '';
        this.stockAmount = '';
        this.fulfilledStockAmount = '';
        this.createdAt = '';
        this.updatedAt = '';
        this.expiryTime = '';
        this.maker = '';
        this.uniqueId = '';
        this.type = props.type;
        for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
            var key = _a[_i];
            this[key] = props[key];
        }
    }
    Order.prototype.setUniqueId = function (nonce) {
        this.uniqueId = "0x" + nonce.toString(16).padStart(24, '0') + this.maker.slice(2).padStart(40, '0');
    };
    return Order;
}());
exports.default = Order;
//# sourceMappingURL=order.js.map