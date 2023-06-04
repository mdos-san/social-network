import request from 'supertest';

const authentification_url = "http://localhost:4000"
const profile_url = "http://localhost:4001"

async function requestAuthentificationSession(login: string, password: string) {
  return await request(authentification_url)
    .post("/session")
    .send({ login, password })
    .set('Accept', 'application/json')
}

describe("[MODULE]: Profile", () => {
  it("can create a default profile", async () => {
    // Act

    // Log as admin
    const adminSessionResponse = await requestAuthentificationSession("admin", "iLoveCats");
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
