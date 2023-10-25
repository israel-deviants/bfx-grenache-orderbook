const mockupOrders = [];
// Buy BTC
mockupOrders["Pam"] = {
  function: "createOrder",
  owner: "Pam",
  action: "bid",
  market: "BTC",
  currency: "USD",
  amount: 1,
  orderType: "limit",
  price: 100,
};
mockupOrders["Michael"] = {
  function: "createOrder",
  owner: "Michael",
  action: "bid",
  market: "BTC",
  currency: "USD",
  amount: 2,
  orderType: "limit",
  price: 101,
};
mockupOrders["Jim"] = {
  function: "createOrder",
  owner: "Jim",
  action: "bid",
  market: "BTC",
  currency: "USD",
  amount: 2,
  orderType: "limit",
  price: 99,
};

// sell BTC
mockupOrders["Dwight"] = {
  function: "createOrder",
  owner: "Dwight",
  action: "ask",
  market: "BTC",
  currency: "USD",
  amount: 5,
  orderType: "limit",
  price: 101,
};
mockupOrders["Toby"] = {
  function: "createOrder",
  owner: "Toby",
  action: "ask",
  market: "BTC",
  currency: "USD",
  amount: 3,
  orderType: "limit",
  price: 99,
};

module.exports = mockupOrders;
