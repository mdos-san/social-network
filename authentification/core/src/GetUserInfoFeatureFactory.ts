import { GetUserInfoFeatureFactory, GetUserInfoFeatureResult } from "./GetUserInfoFeature";

const getUserInfoFeatureFactory: GetUserInfoFeatureFactory =
  (features) =>
    async (sessionId) => {

      const { user } = await features.resolveUserFromSessionId(sessionId);

      const result: GetUserInfoFeatureResult = {
        success: true,
        userinfo: {
          userId: user.id,
          scopes: user.scopes,
        },
      }

      return result;
    }

export default getUserInfoFeatureFactory;
