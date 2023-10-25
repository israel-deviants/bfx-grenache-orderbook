APPROACH

The approach is to have the very basic functionality of accounts and orderbook,
replicate it in grenache and after having this very basic implementation,
add other functionalities such as executing orders

- [OK] Create basic accounts (JS Only)
- [OK] Create Basic Orderbook and account balance update (JS Only)
- [OK] Replicate Orderbook using Grenache
- Order Execution and account balance update
- Validations and Tests

# Running the code:

Alternatively is possible to just see the classes in action (without Grenache)
It will show the results of the account balances after some movements. It will show the orderbook too:

```
node src/index.js

```

start two grape servers
```
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

Then, start the orderBook server
```
node src/server.js
```

Then, start two clients
```
// use these exact parameters for the mock orders
node src/client.js Pam Jim

// after a couple of seconds
node src/client.js Michael Dwight

// you can start a third client if you want
node src/client.js Toby Stanley
```