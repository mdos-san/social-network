import { Features, feature1Factory, feature2Factory, feature3Factory } from "./Features";
import { Provider1, Provider2 } from "./Providers";

export default {
  init: (provider1: Provider1) => {
    let features = {} as Features;

    features.feature1 = feature1Factory(features, provider1);
    features.feature2 = feature2Factory(features, provider1);
    features.feature3 = feature3Factory(features, provider1);

    return features;
  }
}

export * from "./Providers";

