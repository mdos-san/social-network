import Features from "./Features";
import adminCreateUserFeatureFactory from "./AdminCreateUserFeatureFactory";
import changePasswordFeatureFactory from "./ChangePasswordFeatureFactory";
import createDefaultAdminFeatureFactory from "./CreateDefaultAdminFeatureFactory";
import createSessionFeatureFactory from "./CreateSessionFeatureFactory";
import deleteSessionFeatureFactory from "./DeleteSessionFeatureFactory";
import { DatabaseProvider } from "./DatabaseProvider";
import resolveUserFromSessionIdFeatureFactory from "./ResolveUserFromSessionIdFeatureFactory";

export default {
  init: (database: DatabaseProvider) => {
    let features = {} as Features;

    features.createDefaultAdmin = createDefaultAdminFeatureFactory(database);
    features.createSession = createSessionFeatureFactory(database);
    features.deleteSession = deleteSessionFeatureFactory(database);
    features.adminCreateUser = adminCreateUserFeatureFactory(features, database);
    features.changePassword = changePasswordFeatureFactory(database);
    features.resolveUserFromSessionId = resolveUserFromSessionIdFeatureFactory(database);

    return features;
  }
}

// Database
export * from "./DatabaseProvider";
export * from "./UserRepository";
export * from "./SessionRepository";

// Api
export * from "./ApiProvider";
