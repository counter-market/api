# Counter market API 
The official api library for trading on Counter market.

For more information, please visit [Counter api docs](https://counter.market/developers/#general)

#### Example of using

```js
import CounterApi from 'counter-market';

(async () => {
    const privateKey = '62537136911bca3a7e2b....';
    const privateKeyClient = new CounterApi.PrivateKeyClient(privateKey);

    const order = await CounterApi.createOrder(privateKeyClient, 'buy', 100, 0.00797, 'OMG/ETH');
})();
```

#### CCXT compatible version
Counter market contain wrapper for compatibility with ccxt.
For more information about methods see [CCXT](https://github.com/ccxt/ccxt/wiki/Manual) documentation

```js
import CounterApi from 'counter-market';

(async () => {
    const privateKey = '62537136911bca3a7e2b....';
    const privateKeyClient = new CounterApi.PrivateKeyClient(privateKey);

    const counter = new CounterApi.CCXTCompatible(privateKeyClient);
	const order = await counter.createOrder('OMG/ETH','limit',"buy", 100, 0.00797)
})();
```

## Available clients


### PrivateKeyClient

```js
const privateKey = '62537136911bca3a7e2b....';
const privateKeyClient = new CounterApi.PrivateKeyClient(privateKey);
```

Attribute | Type | Description
--------- | ---- | -----------
privateKey| string | your private key

## Available methods

### createOrder(client, type, stockAmount, cashPrice, symbol)

```js
CounterApi.createOrder(privateKeyClient, 'buy', 123, 123, 'OMG/ETH');
```

Attribute | Type | Description
--------- | ---- | -----------
client    | Client | client for sign
type      | string | maker action, either `buy` or `sell`
stockAmount | string | coins count 
cashPrice | string | cash price
symbol | string | Market symbol

Output: 
```js
Promise<Order>
```

### cancelOrder(client, id)

```js
CounterApi.cancelOrder(privateKeyClient, '0x00000000000000000000000100001a5078d5831ff28bd6895cdfe450118d37f9');
```

Attribute | Type | Description
--------- | ---- | -----------
client    | Client | client for sign
id        | string | unique order id

### fetchOrders(client)

```js
CounterApi.fetchOrders(privateKeyClient);
```

Attribute | Type | Description
--------- | ---- | -----------
client    | Client | client for sign

Output:
```js
Promise<Order[]>
```

### fetchMyTrades(client)

```js
CounterApi.fetchMyTrades(privateKeyClient);
```

Attribute | Type | Description
--------- | ---- | -----------
client    | Client | client for sign

Output: 
```js
Promise<Trade>
```

### getBalance(client)

```js
CounterApi.getBalance(privateKeyClient);
```

Attribute | Type | Description
--------- | ---- | -----------
client    | Client | client for sign

Output: 
```js
Promise<Balance>
```

### withdraw(client)

```js
CounterApi.withdraw(privateKeyClient, 'ETH');
```

Attribute | Type | Description
--------- | ---- | -----------
client    | Client | client for sign
symbol    | string | Token symbol
