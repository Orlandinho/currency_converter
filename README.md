## How to run this app

Open your terminal and access the root folder of this project, then run: "npm run dev" and It should start the backend on port 8000.

## How to use this app
You can use Postman to send post-requests to localhost:8000/api/v1/transactions with the body containing similar data as this to test the api:
{
    "amount": 100,
    "currency_from": "USD",
    "currency_to": "BRL"
}.

You can only convert values between USD, EUR, BRL and JPY for now.

If successful, it should return the transaction id, the user_id (auto-generated), converted_from, converted_to, amount, result, conversion_tax (also auto-generated) and the UTC date. When not successful, it'll return an error message and the http status code as a response.

There's an endpoint to get all transactions for a user id. You can send a get-request to localhost:8000/api/v1/user/:id/transactions where :id is the user id. It will return all transactions for that user or an error message and the http status code if there's no user for the id.

## What tools were used

The api was built primarily with Node.js and Express. It's using SQLite as its database. Also, it uses some packages like dotenv, better-sqlite3, jest, supertest and nodemon. The data used to calculate the currency rates comes from [exchangerates api](https://exchangeratesapi.io)

## Features and Purpose

There's little to say about this project. It's just a simple and limited currency converter api. I tried to use some of the tools that are among the most popular in the web development for JavaScript developers
