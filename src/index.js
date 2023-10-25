import AccountBook from "./classes/AccountBook.js";
import OrderBook from "./classes/OrderBook.js";

const accounts = new AccountBook();

accounts.generateInitialBalances();
accounts.showMovements();
accounts.showAllAssetBalances();

console.log("---- ALL SET UP ---");

const orders = new OrderBook();
//they want to buy BTC
orders.createorder(accounts, "Alice", "bid", "BTC", "USD", 1, "limit", 100);
orders.createorder(accounts, "Bob", "bid", "BTC", "USD", 2, "limit", 101);
orders.createorder(accounts, "Charlie", "bid", "BTC", "USD", 2, "limit", 99);

// //they want to sell BTC
orders.createorder(accounts, "John", "ask", "BTC", "USD", 5, "limit", 101);
orders.createorder(accounts, "Paul", "ask", "BTC", "USD", 3, "limit", 99);

accounts.showMovements();
accounts.showAllAssetBalances();

orders.showOrders("BTC", "USD");
