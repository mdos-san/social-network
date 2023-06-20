import request from 'supertest';
import Config from './config';
import { requestAuthentificationSession } from './utils';

const { profile_url } = Config;

describe("[MODULE]: Profile", () => {
  it("can create a default profile", async () => {
    // Log as admin
    const adminSessionResponse = await requestAuthentificationSession("admin", "admin");
    expect(adminSessionResponse.statusCode).toBe(200);

    // Create default profile
    const postProfileResponse = await request(profile_url)
      .post("/profile")
      .set('Cookie', adminSessionResponse.headers['set-cookie'])
      .set('Accept', 'application/json')

    expect(postProfileResponse.statusCode).toBe(200);
    expect(postProfileResponse.body.profileId).toBeDefined();
  });

  it("can request a profile from session", async () => {
    // Log as admin
    const adminSessionResponse = await requestAuthentificationSession("admin", "admin");
    expect(adminSessionResponse.statusCode).toBe(200);

    // Act
    const getProfileResponse = await request(profile_url)
      .get(`/profile`)
      .set('Cookie', adminSessionResponse.headers['set-cookie'])
      .set('Accept', 'application/json')

    // Assert
    expect(getProfileResponse.statusCode).toBe(200);
    const { profile } = getProfileResponse.body;
    expect(profile.id).toBeDefined();
    expect(profile.userId).toBe("admin");
    expect(profile.displayName).toBe("");
    expect(profile.description).toBe("");
  });

  it("can change a profile", async () => {
    // Log as admin
    const adminSessionResponse = await requestAuthentificationSession("admin", "admin");
    expect(adminSessionResponse.statusCode).toBe(200);

    // Act
    const putProfileResponse = await request(profile_url)
      .put(`/profile`)
      .set('Cookie', adminSessionResponse.headers['set-cookie'])
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ description: "This is my description", displayName: "Scratchy" })
    const getProfileResponse = await request(profile_url)
      .get(`/profile`)
      .set('Cookie', adminSessionResponse.headers['set-cookie'])
      .set('Accept', 'application/json')

    // Assert
    expect(putProfileResponse.statusCode).toBe(200);
    const { profile } = getProfileResponse.body;
    expect(profile.id).toBeDefined();
    expect(profile.userId).toBe("admin");
    expect(profile.displayName).toBe("Scratchy");
    expect(profile.description).toBe("This is my description");
  });
});
