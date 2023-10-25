module.exports = class AccountBook {
  constructor() {
    this.accountBook = []; //owner, asset, amount, timestamp
    this.accountBalances = []; //[asset][account] = amount
    this.initializeAssets();
  }

  initializeAssets = () => {
    this.accountBalances["USD"] = [];
    this.accountBalances["BTC"] = [];
    this.accountBalances["ETH"] = [];
  };

  addBalance(owner, asset, amount) {
    // TODO: validations
    const movement = {
      owner,
      asset,
      amount,
    };

    this.accountBook.push(movement);

    //calculate current balance and store in currentBalances
    this.initializeAccount(movement.owner, movement.asset);
    this.accountBalances[asset][owner] += amount;
  }

  initializeAccount(owner, asset) {
    if (!this.accountBalances[asset][owner])
      this.accountBalances[asset][owner] = 0;
  }

  showMovements() {
    console.table(this.accountBook);
  }

  getBalances(asset) {
    const table = [];

    for (let account in this.accountBalances[asset]) {
      table.push({
        account,
        balance: this.accountBalances[asset][account],
        asset,
      });
    }
    return table;
  }

  showAllAssetBalances() {
    console.table([...this.getBalances("USD"), ...this.getBalances("BTC")]);
  }

  generateInitialBalances() {
    this.addBalance("Pam", "USD", 100);
    this.addBalance("Michael", "USD", 50);
    this.addBalance("Pam", "USD", 20);
    this.addBalance("Michael", "USD", 300);
    this.addBalance("Jim", "USD", 1000);
    // this.addBalance("Pam", "USD", -10);
    this.addBalance("Dwight", "BTC", 7);
    this.addBalance("Toby", "BTC", 8);
    this.addBalance("Stanley", "USD", 800);

    //it should error
    // this.addBalance("Jim", "USD", -100000);
  }
};
