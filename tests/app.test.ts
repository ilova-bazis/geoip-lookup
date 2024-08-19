import request from "supertest";
import createApp from "../src/app";

describe("index", () => {
    it("should be true", () => {
        expect(2 + 2).toBe(4);
    });
})

describe("Test app", () => {
    it("GET /", async () => {
        const app = await createApp();
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
})