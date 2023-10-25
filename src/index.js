const AccountBook = require("./classes/AccountBook.js");
const OrderBook = require("./classes/OrderBook.js");

const accounts = new AccountBook();

accounts.generateInitialBalances();
accounts.showMovements();
accounts.showAllAssetBalances();

console.log("---- ALL SET UP ---");

const orders = new OrderBook(accounts);
//they want to buy BTC
orders.createorder("Pam", "bid", "BTC", "USD", 1, "limit", 100);
orders.createorder("Michael", "bid", "BTC", "USD", 2, "limit", 101);
orders.createorder("Jim", "bid", "BTC", "USD", 2, "limit", 99);

// they want to sell BTC
//deberia chequear la orden de michael y ejecutarla, entregarle los BTC y recibir los USD
orders.createorder("Dwight", "ask", "BTC", "USD", 5, "limit", 101);
orders.createorder("Toby", "ask", "BTC", "USD", 3, "limit", 99);

accounts.showMovements();
accounts.showAllAssetBalances();

orders.showOrders("BTC", "USD");
