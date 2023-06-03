import request from 'supertest';
import { start, stop } from "./index";

const authentification_url = "http://localhost:3000"
const profile_url = "http://localhost:3001"

beforeAll(async () => {
    await start();
})

afterAll(async () => {
    await stop();
})

describe("Profile", () => {
  it("can create a default profile", async () => {
    // Act

    // Setup default admin
    await request(authentification_url).post("/setup");

    // Log as admin
    const adminSessionResponse = await request(authentification_url)
      .post("/session")
      .send({ login: 'admin', password: 'admin' })
      .set('Accept', 'application/json')
    expect(adminSessionResponse.statusCode).toBe(200);

    // Create default profile
    const profileCreationResponse = await request(profile_url)
      .post("/profile")
      .set('Cookie', adminSessionResponse.headers['set-cookie'])
      .set('Accept', 'application/json')
    expect(profileCreationResponse.statusCode).toBe(200);
    expect(profileCreationResponse.body.profileId).toBeDefined();
  });
});
