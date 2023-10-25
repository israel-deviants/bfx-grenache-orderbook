"use strict";
const { PeerRPCClient } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");
const mockupOrders = require("./mockups/orders.js");

var account = "Pam";
//Console arguments
if (process.argv.length > 1) {
  account = process.argv[2];
  console.log("I am", account);
}

const link = new Link({
  grape: "http://127.0.0.1:30001",
  requestTimeout: 10000,
});
link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

requestOrderbook();

var orderBook = [];

// MOCKUP ORDERS, every client will place an order in a random time
setTimeout(() => {
  placeOrder(mockupOrders[account]);

  //After placing an order, it will place another
  if (process.argv.length > 2) {
    account = process.argv[3];
    console.log("I am", account);

    setTimeout(() => {
      placeOrder(mockupOrders[account]);
    }, 3000 + Math.random() * 10000);
  }
}, 2000 + Math.random() * 5000);

var updateInterval;

function scheduleUpdate() {
  clearInterval(updateInterval);
  updateInterval = setInterval(() => {
    requestOrderbook();
  }, 1000);
}

function placeOrder(payload) {
  // console.log("placing order");
  peer.request(
    "orderbook_worker",
    payload,
    { timeout: 100000 },
    (err, result) => {
      if (err) throw err;
      console.log(
        "placing order",
        payload.owner,
        payload.action,
        payload.market,
        payload.price,
        payload.currency,
        payload.amount
      );
      orderBook = result;

      console.table(orderBook);
      scheduleUpdate();
    }
  );
}

function requestOrderbook() {
  peer.request(
    "orderbook_worker",
    {
      function: "getOrders",
    },
    { timeout: 100000 },
    (err, result) => {
      if (err) throw err;

      orderBook = result;

      console.table(orderBook);

      scheduleUpdate();
    }
  );
}
