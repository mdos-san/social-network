const request = require('supertest');
const { startServer, closeServer } = require("./index.js");

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
});
