import request from 'supertest';
import { start, stop } from "./index";

describe("Module", () => {
  it("should be initialised", async () => {
    await start();

    // Act
    const response = await request("http://localhost:3000")
      .get("/");

    expect(response.statusCode).toBe(200);

    await stop();
  });

  it("can setup a default admin", async () => {
    // Arrangement
    await start();

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
    await stop();
  });

  it("can create a session", async () => {
    // Arrange
    await start();

    // Act
    await request("http://localhost:3000").post("/setup");
    const response = await request("http://localhost:3000")
      .post("/session")
      .send({ login: 'admin', password: 'admin' })
      .set('Accept', 'application/json')

    // Assert: Http response
    expect(response.statusCode).toBe(200);
    const setCookieHeader = response.headers["set-cookie"][0];
    expect(setCookieHeader).toContain("session=");
    expect(setCookieHeader).toContain("HttpOnly");
    expect(setCookieHeader.length).toBeGreaterThan(256);

    // Clean 
    await stop();
  });

  it("can delete a session", async () => {
    // Arrange
    await start();

    // Act
    await request("http://localhost:3000").post("/setup");
    await request("http://localhost:3000")
      .post("/session")
      .send({ login: 'admin', password: 'admin' })
      .set('Accept', 'application/json')
    const response = await request("http://localhost:3000")
      .delete("/session")

    // Assert: Http response
    expect(response.statusCode).toBe(200);
    const setCookieHeader = response.headers["set-cookie"][0];
    expect(setCookieHeader).toContain("session=;");

    // Clean 
    await stop();
  });

  it("can create a user", async () => {
    // Arrange
    await start();

    // Act
    await request("http://localhost:3000").post("/setup");
    const adminSessionRequest = await request("http://localhost:3000")
      .post("/session")
      .send({ login: 'admin', password: 'admin' })
      .set('Accept', 'application/json')
    await request("http://localhost:3000")
      .post("/user")
      .set('Accept', 'application/json')
      .set('Cookie', adminSessionRequest.headers['set-cookie'])
      .send({ login: 'plume', password: 'iLoveCats' })
      .expect(200)
    await request("http://localhost:3000")
      .post("/user")
      .set('Accept', 'application/json')
      .set('Cookie', adminSessionRequest.headers['set-cookie'])
      .send({ login: 'plume', password: 'iLoveCats' })
      .expect(400)
    await request("http://localhost:3000")
      .post("/session")
      .set('Accept', 'application/json')
      .send({ login: 'plume', password: 'iLoveCats' })
      .expect(200)

    // Clean 
    await stop();
  });

  it("can change a user password", async () => {
    // Arrange
    await start();

    // Act
    await request("http://localhost:3000").post("/setup");
    const adminSessionRequest = await request("http://localhost:3000")
      .post("/session")
      .send({ login: 'admin', password: 'admin' })
      .set('Accept', 'application/json')
    await request("http://localhost:3000")
      .put("/password/admin")
      .set('Accept', 'application/json')
      .set('Cookie', adminSessionRequest.headers['set-cookie'])
      .send({ password: 'iLoveCats' })
      .expect(200)
    await request("http://localhost:3000")
      .post("/session")
      .send({ login: 'admin', password: 'iLoveCats' })
      .set('Accept', 'application/json')
      .expect(200);

    // Clean 
    await stop();
  });

  it("can get userinfo", async () => {
    // Arrange
    await start();

    // Act
    await request("http://localhost:3000").post("/setup");
    const adminSessionRequest = await request("http://localhost:3000")
      .post("/session")
      .send({ login: 'admin', password: 'iLoveCats' })
      .set('Accept', 'application/json')
    const response = await request("http://localhost:3000")
      .get("/userinfo")
      .set('Cookie', adminSessionRequest.headers['set-cookie'])


    // Assert
    expect(response.body.userId).toBe("admin");

    // Clean 
    await stop();
  });
});
