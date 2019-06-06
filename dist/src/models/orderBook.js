"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderBook = /** @class */ (function () {
    function OrderBook(props) {
        this.buy = props.buy;
        this.sell = props.sell;
    }
    OrderBook.prototype.ccxt = function () {
        var bids = this.buy.map(function (b) { return [b.cashPrice, b.stockAmount]; });
        var asks = this.buy.map(function (b) { return [b.cashPrice, b.stockAmount]; });
        return {
            bids: bids,
            asks: asks,
        };
    };
    return OrderBook;
}());
exports.OrderBook = OrderBook;
exports.default = OrderBook;
//# sourceMappingURL=orderBook.js.map