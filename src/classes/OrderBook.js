module.exports = class orderBook {
  constructor(accountBook) {
    this.orders = []; //owner, action, market, currency, amount, orderType, price
    this.accountBook = accountBook;
  }

  createorder(owner, action, market, currency, amount, orderType, price) {
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

    // console.log(owner, action, market, currency, amount, orderType, price);

    if (action === "bid") {
      this.accountBook.addBalance(owner, currency, -(amount * price));
    } else {
      this.accountBook.addBalance(owner, market, -amount);
      // this.respondbidOrders(this.orders.length - 1);
    }

    this.sortOrders();

    //after the order enters, it checks at the opposite pair to execute matching orders
  }

  respondbidOrders() {
    // WIP;

    //This should iterate over all the orders that can fill this ask order
    while (/* there are valid orders */ true == false) {
      // get next order, substract amount
      // if amount is 0, remove order target order
      // if there are more to fill, continue
      // else, remove this order
    }
  }

  sortOrders() {
    // TODO: inefficient sorting, but it works for now
    this.orders.sort((a, b) => {
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
      return 0;
    });
  }

  getOrders(market, currency, action = "all") {
    const table = [];
    this.orders.forEach((order) => {
      if (market === order.market && currency === order.currency) {
        if (action === "all" || action === order.action) table.push(order);
      }
    });
    return table;
  }

  showOrders(market, currency) {
    console.table([
      ...this.getOrders(market, currency, "bid"),
      ...this.getOrders(market, currency, "ask"),
    ]);
  }
};
