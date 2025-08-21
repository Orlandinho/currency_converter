const request = require("supertest");
const express = require("express");
const app = express();

//Unfortunately, these tests are not working; I probably didn't set this up correctly'

describe('Transaction routes', () => {
    it("should fail if currency not available", async () => {
        const res = await request(app)
            .post("/localhost:8000/api/v1/transactions")
            .send({ currency_from: "ARG", currency_to: "EUR", amount: 100 });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toMatch(false);
        expect(res.body.error).toMatch(
            "Only EUR, BRL, JPY and USD are available"
        )
    });

    it("should return 400 if amount <= 0", async () => {
        const res = await request(app).post("/localhost:8000/api/v1/transactions").send({
            currency_from: "USD",
            currency_to: "EUR",
            amount: 0,
        });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Amount must be greater than 0");
    });


    it("should return 400 if required fields are missing", async () => {
        const res = await request(app).post("/localhost:8000/api/v1/transactions").send({
            currency_from: "USD",
            // currency_to missing
            amount: 100,
        });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Missing required fields");
    });

    it("should return all data when it is persisted successfully", async () => {
        const res = await request(app)
            .post("/localhost:8000/api/v1/transactions")
            .send({ currency_from: "BRL", currency_to: "EUR", amount: 100 });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toMatch(true);
        expect(res.body.json).toMatch(
            {
                "id": expect.any(Number),
                "user_id": expect.any(Number),
                "currency_from": "BRL",
                "currency_to": "EUR",
                "amount": 100,
                "conversion_tax": expect.any(Number),
                "result": expect.any(Number),
                "created_at": expect.any(String)
            }
        )
    });
});