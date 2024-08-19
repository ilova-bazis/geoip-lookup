import request from "supertest";
import createApp from "../../src/app";

const key = "584544e2e1d04805b547e1d7e2f866e1"

describe("Users routes", () => {
    
    it("GET /lookup/:ip", async () => {
        const key = await getKey();
        const app = await createApp();
        const response = await request(app)
            .get("/lookup/8.8.8.8?apikey=" + key)
            
        expect(response.body.org).toBe("GOOGLE");
        expect(response.body.country).toBe("United States");
        expect(response.body.ip).toBe("8.8.8.8");
        expect(response.body.type).toBe("ipv4");
        expect(response.body.asn).toBe(15169);
        expect(response.body.longitude).toBeDefined();
        expect(response.body.latitude).toBeDefined();
        expect(response.statusCode).toBe(200);
    });

    it("GET /lookup/geo", async () => {
        const key = await getKey();
        const app = await createApp();
        const response = await request(app)
            .get("/lookup/geo?longitude=-0.118092&latitude=51.50986&apikey=" + key)
        
        console.log(response.body);
        expect(response.body.country_code).toBe("GB");
        expect(response.body.timezone).toBe("Europe/London");
        expect(response.statusCode).toBe(200);
    });
            
})

async function getKey() {
    return key;
}