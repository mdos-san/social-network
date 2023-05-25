import request from 'supertest';
import { startServer, closeServer } from "./index";

describe("ExpressJS", () => {
    it("should be initialised", (done) => {
        startServer();

        request("http://localhost:3000")
            .get("/")
            .expect(200, () => {
                closeServer();
                done();
            });
    });

    it("can setup a default admin", async () => {
        // Arrangement
        startServer();

        // Act
        const response = await request("http://localhost:3000")
            .post("/setup");

        // Assert: Http response
        expect(response.statusCode).toBe(200);

        // Act
        await request("http://localhost:3000")
            .post("/setup")
            .expect(400);

        // Clean 
        await closeServer();
    });

    it("can create a session", async () => {
        // Arrange
        startServer();

        // Act
        await request("http://localhost:3000").post("/setup");
        const response = await request("http://localhost:3000")
            .post("/session")
            .send({ login: 'admin', password: 'admin'})
            .set('Accept', 'application/json')

        // Assert: Http response
        expect(response.statusCode).toBe(200);
        const setCookieHeader = response.headers["set-cookie"][0];
        expect(setCookieHeader).toContain("session=");
        expect(setCookieHeader).toContain("HttpOnly");
        expect(setCookieHeader.length).toBeGreaterThan(256);

        // Clean 
        await closeServer();
    });
});
