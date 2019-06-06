"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var bignumber_js_1 = require("bignumber.js");
var Ticker = /** @class */ (function () {
    function Ticker(props, symbol) {
        this.high = props.high;
        this.low = props.low;
        this.cashVolume = props.cashVolume;
        this.stockVolume = props.stockVolume;
        this.lastPrice = props.lastPrice;
        this.last24hPrice = props.last24hPrice;
        this.openPrice = props.openPrice;
        this.symbol = symbol;
    }
    Ticker.prototype.ccxt = function () {
        return {
            symbol: this.symbol,
            timestamp: moment().unix(),
            datetime: moment().toISOString(),
            high: this.high,
            low: this.low,
            vwap: this.cashVolume === '0' ? 0 : new bignumber_js_1.default(this.stockVolume).dividedBy(this.cashVolume).toString(),
            open: this.openPrice,
            close: this.lastPrice,
            last: this.lastPrice,
            previousClose: this.last24hPrice,
            change: new bignumber_js_1.default(this.lastPrice).minus(this.openPrice).toString(),
            percentage: this.openPrice === '0' ?
                0 : new bignumber_js_1.default(this.lastPrice).dividedBy(this.openPrice).multipliedBy(100).toString(),
            average: new bignumber_js_1.default(this.lastPrice).minus(this.openPrice).dividedBy(2).toString(),
            quoteVolume: this.stockVolume,
            baseVolume: this.cashVolume,
        };
    };
    return Ticker;
}());
exports.Ticker = Ticker;
exports.default = Ticker;
//# sourceMappingURL=ticker.js.map