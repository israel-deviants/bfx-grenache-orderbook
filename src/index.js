import AccountBook from "./AccountBook.js";

const book = new AccountBook();

book.generateInitialBalances();
book.showMovements();
book.showBalances("USD");
