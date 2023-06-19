import { createProfileFactory, Features, getProfileFactory } from "./Features";
import { DatabaseProvider } from "./Providers";
import { AuthentificationProvider } from "Providers/Authentification";

export default {
  init: (database: DatabaseProvider, authentification: AuthentificationProvider) => {
    let features = {} as Features;

    features.createProfile = createProfileFactory(database, authentification);
    features.getProfile = getProfileFactory(database, authentification);

    return features;
  }
}

export * from "./Providers";
export * from "./Features";

