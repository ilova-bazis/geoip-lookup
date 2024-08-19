import request from "supertest";
import createApp from "../../src/app";

describe("Users routes", () => {
    
    it("GET /users/me", async () => {
        let { token} = await login("fnosiri@tamos.tj", "PeopleOfTheWild!");

        const app = await createApp();
        const response = await request(app)
            .get("/users/me")
            .set("Authorization", "Bearer " + token.token)
            
        expect(response.statusCode).toBe(200);
    });
})

async function login(email: string, password: string) {
    const app = await createApp();
    const response = await request(app)
        .post("/auth/signin")
        .send({ email, password })
    return response.body;
}