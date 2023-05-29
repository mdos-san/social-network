import Features from "./Features";
import adminCreateUserFeatureFactory from "./AdminCreateUserFeatureFactory";
import createDefaultAdminFeatureFactory from "./CreateDefaultAdminFeatureFactory";
import createSessionFeatureFactory from "./CreateSessionFeatureFactory";
import deleteSessionFeatureFactory from "./DeleteSessionFeatureFactory";
import { DatabaseProvider } from "./DatabaseProvider";

export default {
  init: (database: DatabaseProvider) => {
    let features = {} as Features;

    features.createDefaultAdmin = createDefaultAdminFeatureFactory(database);
    features.createSession = createSessionFeatureFactory(database);
    features.deleteSession = deleteSessionFeatureFactory(database);
    features.adminCreateUser = adminCreateUserFeatureFactory(database);

    return features;
  }
}

// Database
export * from "./DatabaseProvider";
export * from "./UserRepository";
export * from "./SessionRepository";

// Api
export * from "./ApiProvider";
