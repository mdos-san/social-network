import request from 'supertest';
import Config from "./config";
import { requestAuthentificationSession } from './utils';

const { authentification_url } = Config;

describe("[MODULE]: Authentification", () => {
  it("should be initialised", async () => {
    // Act
    const response = await request(authentification_url)
      .get("/");

    expect(response.statusCode).toBe(200);
  });

  it("can setup a default admin", async () => {
    // Act
    const response = await request(authentification_url)
      .post("/setup");

    // Assert: Http response
    expect(response.statusCode).toBe(200);

    // Act
    await request(authentification_url)
      .post("/setup")
      .expect(400);
  });

  it("can create a session", async () => {
    // Act
    await request(authentification_url).post("/setup");
    const response = await requestAuthentificationSession("admin", "admin");

    // Assert: Http response
    expect(response.statusCode).toBe(200);
    const setCookieHeader = response.headers["set-cookie"][0];
    expect(setCookieHeader).toContain("session=");
    expect(setCookieHeader).toContain("HttpOnly");
    expect(setCookieHeader.length).toBeGreaterThan(256);
  });

  it("can delete a session", async () => {
    // Act
    await request(authentification_url).post("/setup");
    await requestAuthentificationSession("admin", "admin");
    const response = await request(authentification_url)
      .delete("/session")

    // Assert: Http response
    expect(response.statusCode).toBe(200);
    const setCookieHeader = response.headers["set-cookie"][0];
    expect(setCookieHeader).toContain("session=;");
  });

  it("can create a user", async () => {
    // Act
    await request(authentification_url).post("/setup");
    const adminSessionResponse = await requestAuthentificationSession("admin", "admin");
    await request(authentification_url)
      .post("/user")
      .set('Accept', 'application/json')
      .set('Cookie', adminSessionResponse.headers['set-cookie'])
      .send({ login: 'plume', password: 'iLoveCats' })
      .expect(200)
    await request(authentification_url)
      .post("/user")
      .set('Accept', 'application/json')
      .set('Cookie', adminSessionResponse.headers['set-cookie'])
      .send({ login: 'plume', password: 'iLoveCats' })
      .expect(400)
    const userSessionResponse = await requestAuthentificationSession("plume", "iLoveCats");
    expect(userSessionResponse.statusCode).toBe(200);
  });

  it("can change a user password", async () => {
    // Act
    await request(authentification_url).post("/setup");
    const adminSessionResponse = await requestAuthentificationSession("admin", "admin");
    await request(authentification_url)
      .put("/password/admin")
      .set('Accept', 'application/json')
      .set('Cookie', adminSessionResponse.headers['set-cookie'])
      .send({ password: 'iLoveCats' })
      .expect(200)
    const adminWithNewPasswordSessionResponse = await requestAuthentificationSession("admin", "iLoveCats");
    expect(adminWithNewPasswordSessionResponse.statusCode).toBe(200);

    // Clean
    await request(authentification_url)
      .put("/password/admin")
      .set('Accept', 'application/json')
      .set('Cookie', adminSessionResponse.headers['set-cookie'])
      .send({ password: 'admin' })
      .expect(200)
  });

  it("can get userinfo", async () => {
    // Act
    await request(authentification_url).post("/setup");
    const adminSessionResponse = await requestAuthentificationSession("admin", "admin");
    const response = await request(authentification_url)
      .get("/userinfo")
      .set('Cookie', adminSessionResponse.headers['set-cookie'])

    // Assert
    expect(response.body.userId).toBe("admin");
  });
});

