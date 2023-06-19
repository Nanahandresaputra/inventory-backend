### Usage

##### Clone repository

```terminal
$ git clone https://github.com/Nanahandresaputra/inventory-backend.git
```

##### Run Aplication backend

```terminal
 $ npm run dev
```

##### Run aplication frontend

frontend documentation link

```http
https://github.com/Nanahandresaputra/inventory-frontend.git
```

### Api Usage

#### Items Request

##### Get Items Data

```http
  GET /api/items
```

#### Add Items Data

```http
  POST /api/items/
```

| Parameter      | Type     | Description   |
| :------------- | :------- | :------------ |
| `name`         | `string` | **Required**. |
| `unit`         | `number` | **Required**. |
| `stok`         | `number` | **Required**. |
| `harga_satuan` | `number` | **Required**. |
| `image`        | `file`   | **Required**. |

#### Update Items Data

```http
  PUT /api/items/:id
```

| Parameter      | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `id`           | `id`     | **Required**. Id of item to fetch |
| `name`         | `string` | **Required**.                     |
| `unit`         | `number` | **Required**.                     |
| `stok`         | `number` | **Required**.                     |
| `harga_satuan` | `number` | **Required**.                     |
| `image`        | `file`   | **Required**.                     |

#### Delete Items Data

```http
  DELETE /api/items/:id
```

#### Costumers Request

##### Get Costumers Data

```http
  GET /api/costumers
```

#### Add Costumers Data

```http
  POST /api/costumers/
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `name`    | `string` | **Required**. |
| `contact` | `number` | **Required**. |
| `email`   | `string` | **Required**. |
| `alamat`  | `string` | **Required**. |
| `image`   | `file`   | **Required**. |

#### Update Costumers Data

```http
  PUT /api/costumers/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `id`     | **Required**. Id of item to fetch |
| `name`    | `string` | **Required**.                     |
| `contact` | `number` | **Required**.                     |
| `email`   | `string` | **Required**.                     |
| `alamat`  | `string` | **Required**.                     |
| `image`   | `file`   | **Required**.                     |

#### Delete Costumers Data

```http
  DELETE /api/costumers/:id
```

##### Get Sales Data

```http
  GET /api/sales
```

#### Add Sales Data

```http
  POST /api/sales/
```

| Parameter     | Type     | Description   |
| :------------ | :------- | :------------ |
| `costumer`    | `string` | **Required**. |
| `items`       | `array`  | **Required**. |
| `total_harga` | `number` | **Required**. |
