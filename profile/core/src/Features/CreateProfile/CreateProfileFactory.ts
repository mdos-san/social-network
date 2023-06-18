import { CreateProfileFactory } from ".";
import { v4 } from "uuid";

export const createProfileFactory: CreateProfileFactory = (database, authentification) =>
  async (sessionId) => {
    const userInfo = await authentification.getUserInfo(sessionId);

    const { profileRepository } = database.getRepositories()
    const profileId = await profileRepository.createProfile({
      id: v4(),
      userId: userInfo.userId,
      displayName: "",
      description: "",
    })

    return { profileId }
  }

