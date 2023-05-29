import createDefaultAdminFeatureFactory from "./CreateDefaultAdminFeatureFactory";
import Features from "./Features";
import createSessionFeatureFactory from "./CreateSessionFeatureFactory";
import { DatabaseProvider } from "./DatabaseProvider";
import deleteSessionFeatureFactory from "./DeleteSessionFeatureFactory";

export default {
  init: (database: DatabaseProvider) => {
    let features = {} as Features;

    features.createDefaultAdmin = createDefaultAdminFeatureFactory(database);
    features.createSession = createSessionFeatureFactory(database);
    features.deleteSession = deleteSessionFeatureFactory(database);

    return features;
  }
}

// Database
export * from "./DatabaseProvider";
export * from "./UserRepository";
export * from "./SessionRepository";

// Api
export * from "./ApiProvider";
