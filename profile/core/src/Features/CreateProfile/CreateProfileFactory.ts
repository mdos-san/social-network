import { CreateProfileFactory } from ".";

export const createProfileFactory: CreateProfileFactory = (database, authentification) =>
  async (sessionId) => {
    const userInfo = await authentification.getUserInfo(sessionId);

    const { profileRepository } = database.getRepositories()
    const profileId = await profileRepository.createProfile({
      id: "blah", // uuid
      userId: userInfo.userId,
      displayName: "",
      description: "",
    })

    return { profileId }
  }

