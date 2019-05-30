"use strict";
exports.__esModule = true;
var orders_1 = require("./counter/orders");
var trades_1 = require("./counter/trades");
var balance_1 = require("./counter/balance");
var private_key_1 = require("./client/private_key");
exports["default"] = {
    // orders
    createOrder: orders_1.createOrder,
    cancelOrder: orders_1.cancelOrder,
    fetchOrders: orders_1.fetchOrders,
    // trades
    fetchMyTrades: trades_1.fetchMyTrades,
    // balance
    fetchBalance: balance_1.fetchBalance,
    withdraw: balance_1.withdraw,
    // clients
    PrivateKeyClient: private_key_1["default"]
};
