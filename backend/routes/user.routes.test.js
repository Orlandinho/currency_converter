const request = require("supertest");
const express = require("express");
const app = express();

//Unfortunately, these tests are not working; I probably didn't set this up correctly'

describe('GET User routes', () => {
    it("should return 404 if user has no transactions", async () => {
        const res = await request(app).get("/99/transactions");

        expect(res.status).toBe(404);
        expect(res.json.success).toBe(false);
        expect(res.json.error).toBe("User not found!");
    });

    it("should return 200 and list of transactions for a valid user", async () => {
        const res = await request(app).get("/1/transactions");

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toHaveProperty("currency_from");
    });
});