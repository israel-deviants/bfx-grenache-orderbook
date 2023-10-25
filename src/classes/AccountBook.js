export default class AccountBook {
  constructor() {
    // TODO: These will need to be published in Grenache later
    this.accountBook = []; //owner, asset, amount, timestamp
    this.accountBalances = []; //[asset][account] = amount
    this.initializeAssets();
  }

  initializeAssets = () => {
    this.accountBalances["USD"] = [];
    this.accountBalances["BTC"] = [];
    this.accountBalances["ETC"] = [];
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
    this.addBalance("Alice", "USD", 100);
    this.addBalance("Bob", "USD", 50);
    this.addBalance("Alice", "USD", 20);
    this.addBalance("Bob", "USD", 300);
    this.addBalance("Charlie", "USD", 1000);
    // this.addBalance("Alice", "USD", -10);
    this.addBalance("John", "BTC", 7);
    this.addBalance("Paul", "BTC", 8);

    //it should error
    // this.addBalance("Charlie", "USD", -100000);
  }
}
