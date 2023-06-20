import { ChangeProfileFactory } from ".";

export const changeProfileFactory: ChangeProfileFactory = (database, authentification) =>
  async ({ sessionId, description, displayName }) => {
    const userInfo = await authentification.getUserInfo(sessionId);

    const { profileRepository } = database.getRepositories()
    const profile = await profileRepository.findProfileByUserId(userInfo.userId)
    if (profile === null) {
      throw new Error("Profile does not exist");
    }

    profile.description = description; // TODO: Validation
    profile.displayName = displayName; // TODO: Validation

    await profileRepository.saveProfile(profile);

    return { profile }
  }

