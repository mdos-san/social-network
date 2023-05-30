import { ResolveUserFromSessionIdFeatureFactory, ResolveUserFromSessionIdFeatureResult } from "./ResolveUserFromSessionIdFeature";

export const resolveUserFromSessionIdFeatureFactory: ResolveUserFromSessionIdFeatureFactory =
  (database) =>
    async (sessionId) => {

      const sessionRepository = database.getRepositories().sessionRepository;
      const session = await sessionRepository.findSessionById(sessionId)
      if (!session) {
        throw new Error("Can't find session")
      }

      const userRepositories = database.getRepositories().userRepository;
      const user = await userRepositories.findUserByUserId(session.userId);
      if (!user) {
        throw new Error(`User with id '${session.userId}' does not exist`)
      }

      const result: ResolveUserFromSessionIdFeatureResult = {
        success: true,
        user,
      }

      return result;
    }

