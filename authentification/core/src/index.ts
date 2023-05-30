import { Features, adminCreateUserFeatureFactory, changePasswordFeatureFactory, createDefaultAdminFeatureFactory, createSessionFeatureFactory, deleteSessionFeatureFactory, getUserInfoFeatureFactory, resolveUserFromSessionIdFeatureFactory } from "./Features";
import { DatabaseProvider } from "./Providers";

export default {
  init: (database: DatabaseProvider) => {
    let features = {} as Features;

    features.createDefaultAdmin = createDefaultAdminFeatureFactory(database);
    features.createSession = createSessionFeatureFactory(database);
    features.deleteSession = deleteSessionFeatureFactory(database);
    features.adminCreateUser = adminCreateUserFeatureFactory(features, database);
    features.changePassword = changePasswordFeatureFactory(database);
    features.resolveUserFromSessionId = resolveUserFromSessionIdFeatureFactory(database);
    features.getUserInfo = getUserInfoFeatureFactory(features);

    return features;
  }
}

export * from "./UserRepository";
export * from "./SessionRepository";
export * from "./Providers";

