# 📡 Data Pusher - Node.js Webhook Forwarding App

This project is a Node.js Express application designed to receive data for registered accounts and forward it to multiple destination platforms via webhooks.

---

## 📦 Tech Stack

- **Node.js** (Express)
- **SQLite** (via `sqlite3`)
- **Axios** (for sending HTTP requests)
- **UUID** (unique ID generation)

---

## 🔧 Features

- ✅ Account CRUD operations
- ✅ Destination CRUD operations (linked to accounts)
- ✅ Data forwarding using webhook URL, method, headers
- ✅ App Secret Token validation (`CL-X-TOKEN`)
- ✅ Forwards data as JSON (POST/PUT) or query params (GET)

---

## 📁 Folder Structure

  ``` /Data-pusher/
│
├── controllers/
│   ├── accountController.js
│   ├── destinationController.js
│   └── dataHandlerController.js
│
├── routes/
│   ├── accountRoutes.js
│   ├── destinationRoutes.js
│   └── dataHandlerRoutes.js
│
├── models/
│   └── database.js
│
├── node_modules/
│
├── data-pusher.db
├── Data-Pusher.postman_collection.json
├── server.js
├── package.json
└── README.md
```

---

## 🚀 API Endpoints

### 🧑 Account APIs

| Method | Endpoint        | Description                  |
|--------|------------------|------------------------------|
| POST   | `/account`       | Create a new account         |
| GET    | `/account`       | List all accounts            |
| PUT    | `/account/:id`   | Update an account            |
| DELETE | `/account/:id`   | Delete an account & its destinations |

---

### 🌐 Destination APIs

| Method | Endpoint                       | Description                    |
|--------|--------------------------------|--------------------------------|
| POST   | `/destination`                 | Create a new destination       |
| GET    | `/destination/:account_id`     | Get destinations by account ID |
| PUT    | `/destination/:id`             | Update a destination           |
| DELETE | `/destination/:id`             | Delete a destination           |

---

### 🔄 Incoming Data Handler

| Method | Endpoint                 | Description                            |
|--------|--------------------------|----------------------------------------|
| POST   | `/server/incoming_data`  | Accepts data and pushes to destinations |

✅ Headers must include: `CL-X-TOKEN: <app_secret_token>`  
✅ Validates the token, identifies account, fetches destinations  
✅ Uses destination method and headers to forward the data  
✅ GET: sends data as query params  
✅ POST/PUT: sends data as JSON body

---

## 🔐 Security

- Every account is assigned a **unique app secret token**.
- Token must be provided in the header of `/server/incoming_data` as `CL-X-TOKEN`.

---

## 🧪 Sample APIs

📁 Postman Collection:  
`sample-apis/Data-Pusher.postman_collection.json`

You can import it into Postman and test all endpoints (Account, Destination, Data Handler).

---

## ▶️ How to Run

```bash
git clone https://github.com/Gowtham5872/data-pusher.git
cd data-pusher
npm install
node server.js

