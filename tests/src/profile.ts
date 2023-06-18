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
    const profileCreationResponse = await request(profile_url)
      .post("/profile")
      .set('Cookie', adminSessionResponse.headers['set-cookie'])
      .set('Accept', 'application/json')

    expect(profileCreationResponse.statusCode).toBe(200);
    expect(profileCreationResponse.body.profileId).toBeDefined();
  });

  it("can request a profile by id", async () => {
    // Log as admin
    const adminSessionResponse = await requestAuthentificationSession("admin", "admin");
    expect(adminSessionResponse.statusCode).toBe(200);

    // Create default profile
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
});
