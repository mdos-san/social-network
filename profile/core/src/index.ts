import { createProfileFactory } from "Features/CreateProfile";
import { Features, feature1Factory, feature2Factory, feature3Factory } from "./Features";
import { DatabaseProvider, Provider1 } from "./Providers";
import { AuthentificationProvider } from "Providers/Authentification";

export default {
  init: (provider1: Provider1, database: DatabaseProvider, authentification: AuthentificationProvider) => {
    let features = {} as Features;

    features.feature1 = feature1Factory(features, provider1);
    features.feature2 = feature2Factory(features, provider1);
    features.feature3 = feature3Factory(features, provider1);
    features.createProfile = createProfileFactory(database, authentification);

    return features;
  }
}

export * from "./Providers";
export * from "./Features";

