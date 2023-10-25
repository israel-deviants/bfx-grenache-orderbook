"use strict";
const { PeerRPCClient } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

//Mockup orders
const mockupOrders = require("./mockups/orders.js");

// This client will act as one of the users, it will place an order after some seconds,
// then act as the second user user and place another order later

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

//After all is set up for the client, will request the orderBook
var orderBook = [];

function updateOrderbook(newOrderBook) {
  // This is an inneficient way to update the orderbook.
  // It would be better to just get the new transactions notified by the server
  orderBook = newOrderBook;
}

requestOrderbook();

//set a timer for the first and second order (5 seconds)
setTimeout(() => {
  placeOrder(mockupOrders[account]);

  //After placing an order, it will place another (10 seconds)
  if (process.argv.length > 2) {
    account = process.argv[3];
    console.log("I am", account);

    setTimeout(() => {
      placeOrder(mockupOrders[account]);
    }, 10000);
  }
}, 3000);

// This process will ask the new orderbook from the server in an interval
var updateInterval;
function scheduleUpdate() {
  // clears the previous interval, this allows to call this
  // function from anywhere and it will be canceled to be scheduled again
  clearInterval(updateInterval);
  updateInterval = setInterval(() => {
    requestOrderbook();
  }, 1000);
}

function placeOrder(payload) {
  // console.log("ORDER", payload);
  peer.request(
    "orderbook_worker",
    payload, //payload comes from the mockup
    { timeout: 100000 },
    (err, result) => {
      if (err) throw err;
      updateOrderbook(result);
      // console.table(orderBook);
      scheduleUpdate();
    }
  );
}

function requestOrderbook() {
  peer.request(
    "orderbook_worker",
    { function: "getOrders" },
    { timeout: 100000 },
    (err, result) => {
      if (err) throw err;

      updateOrderbook(result);
      console.table(orderBook);
      scheduleUpdate();
    }
  );
}
