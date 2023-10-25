export default class orderBook {
  constructor() {
    // TODO: These will need to be published in Grenache later
    this.orders = []; //owner, action, market, currency, amount, orderType, price
  }

  createorder(
    accountBook,
    owner,
    action,
    market,
    currency,
    amount,
    orderType,
    price
  ) {
    // TODO: validations
    this.orders.push({
      owner,
      action,
      market,
      currency,
      amount,
      orderType,
      price,
    });

    console.log(owner, action, market, currency, amount, orderType, price);

    if (action === "bid") {
      accountBook.addBalance(owner, currency, -(amount * price));
    } else {
      accountBook.addBalance(owner, market, -amount);
    }

    this.sortOrders();

    //after the order enters, it checks at the opposite pair to execute matching orders
  }

  sortOrders() {
    // TODO: inefficient sorting, but it works for now
    this.orders.sort((a, b) => {
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
      return 0;
    });
  }

  showOrders(market, currency) {
    const table = [];
    this.orders.forEach((order) => {
      if (market === order.market && currency === order.currency)
        table.push(order);
    });
    console.table(table);
  }
}
