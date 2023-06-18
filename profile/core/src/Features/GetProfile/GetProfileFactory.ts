import { GetProfileFactory } from ".";

export const getProfileFactory: GetProfileFactory = (database, authentification) =>
  async (sessionId) => {
    const userInfo = await authentification.getUserInfo(sessionId);

    const { profileRepository } = database.getRepositories()
    const profile = await profileRepository.findProfileByUserId(userInfo.userId);

    if (profile === null) {
      throw new Error(`Can't find profile for userId '${userInfo.userId}'`);
    }

    return { profile };
  }

