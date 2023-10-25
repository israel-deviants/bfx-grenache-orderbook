APPROACH

The approach is to have the very basic functionality of accounts and orderbook,
replicate it in grenache and after having this very basic implementation,
add other functionalities such as executing orders

- [OK] Create basic accounts (JS Only)
- [OK] Create Basic Orderbook and account balance update (JS Only)
- [OK] Replicate Orderbook using Grenache
- [OK] Order Execution and account balance update
- Validations

Running the code

```
# boot two grape servers

grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

Then, start the server
```
node src/server.js
```

Then, start two clients
```
use these exact parameters for the mock orders
node src/client.js Pam Jim

after a couple of seconds
node src/client.js Michael Dwight
```