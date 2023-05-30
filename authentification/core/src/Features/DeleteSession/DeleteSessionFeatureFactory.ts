import { DeleteSessionFeatureFactory, DeleteSessionsFeatureResult } from "./DeleteSessionFeature";

export const deleteSessionFeatureFactory: DeleteSessionFeatureFactory = (database) => async (sessionId) => {
  const result: DeleteSessionsFeatureResult = {
    success: true,
  }

  const sessionRepository = database.getRepositories().sessionRepository;
  await sessionRepository.deleteSessionBySessionId(sessionId);

  return result;
}

