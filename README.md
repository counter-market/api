# Counter API

```js
import CounterApi from '../api/dist/index';


(async () => {
    const privateKey = '62537136911bca3a7e2b....';
    const privateKeyClient = new CounterApi.PrivateKeyClient(privateKey);

    const order = await CounterApi.placeOrder(privateKeyClient, 'buy', 123, 123, 'OMG/ETH');
})();
```

##Available clients

###PrivateKeyClient

```js
const privateKey = '62537136911bca3a7e2b....';
const privateKeyClient = new CounterApi.PrivateKeyClient(privateKey);
```

Attribute | Type | Description
--------- | ---- | -----------
privateKey| string | your private key

##Available methods

###placeOrder

```js
CounterApi.placeOrder(privateKeyClient, 'buy', 123, 123, 'OMG/ETH');
```

Attribute | Type | Description
--------- | ---- | -----------
client    | [Client](#available-clients) | client for sign
type      | string | maker action, either `buy` or `sell`
stockAmount | amount | coins count 
cashPrice | cashPrice | cash price
symbol | string | Market symbol

###cancelOrder

```js
CounterApi.cancelOrder(privateKeyClient, '0x00000000000000000000000100001a5078d5831ff28bd6895cdfe450118d37f9');
```

Attribute | Type | Description
--------- | ---- | -----------
client    | [Client](#available-clients) | client for sign
id        | string | unique order id

###fetchOrders

```js
CounterApi.fetchOrders(privateKeyClient);
```

Attribute | Type | Description
--------- | ---- | -----------
client    | [Client](#available-clients) | client for sign

###fetchMyTrades

```js
CounterApi.fetchMyTrades(privateKeyClient);
```

Attribute | Type | Description
--------- | ---- | -----------
client    | [Client](#available-clients) | client for sign

###getBalance

```js
CounterApi.getBalance(privateKeyClient);
```

Attribute | Type | Description
--------- | ---- | -----------
client    | [Client](#available-clients) | client for sign

###withdraw

```js
CounterApi.withdraw(privateKeyClient, 'ETH');
```

Attribute | Type | Description
--------- | ---- | -----------
client    | [Client](#available-clients) | client for sign
symbol    | string | Token symbol
