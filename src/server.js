"use strict";
const AccountBook = require("./classes/AccountBook.js");
const OrderBook = require("./classes/OrderBook.js");

const { PeerRPCServer } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

// This server implements the OrderBook class I've created, it will be used by the clients
// a client can ask to include an order and the server will handle it

const accounts = new AccountBook();
accounts.generateInitialBalances();
// accounts.showMovements();
accounts.showAllAssetBalances();

const orderBook = new OrderBook(accounts);

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCServer(link, {});
peer.init();

const service = peer.transport("server");
service.listen(1337);

setInterval(() => {
  link.announce("orderbook_worker", service.port, {});
}, 1000);

service.on("request", (rid, key, payload, handler) => {
  // console.log("payload", payload);
  if (payload.function === "createOrder") {
    orderBook.createorder(
      payload.owner,
      payload.action,
      payload.market,
      payload.currency,
      payload.amount,
      payload.orderType,
      payload.price
    );

    orderBook.showOrders(payload.market, payload.currency);

    handler.reply(null, orderBook.getOrders(payload.market, payload.currency));
  } else if (payload.function === "getOrders") {
    handler.reply(null, orderBook.orders);
  }
});
