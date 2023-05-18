const { expect } = require('@jest/globals');
const request = require('supertest');
const { startServer, closeServer } = require("./index.js");
const { findOne, init, close, del, deleteOne } = require("./mongodb");

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

        // remove last test admin
        await init();
        await deleteOne("users", { login: 'admin' });
        await close();

        // Act
        const response = await request("http://localhost:3000")
            .post("/setup");

        // Assert: Http response
        expect(response.statusCode).toBe(200);

        // Assert: Database
        await init();
        const user = await findOne("users", { login: "admin" });
        expect(user.password).not.toBe("admin");
        await close();

        // Act
        await request("http://localhost:3000")
            .post("/setup")
            .expect(400);

        // Clean 
        closeServer();
    });

    it("can create a session", async () => {
        // Arrangement
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

        // Assert: Database
        await init();
        const session = await findOne("sessions", { login: "admin" });
        expect(session).toBeDefined();
        await del("sessions", {});
        await del("users", {});
        await close();

        // Clean 
        closeServer();
    });
});
