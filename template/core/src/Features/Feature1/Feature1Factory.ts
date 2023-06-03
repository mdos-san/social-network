import { Feature1Factory, Feature1Result } from "./";

export const feature1Factory: Feature1Factory =
  (_features, _provider1) =>
    async () => {
      return {} as Feature1Result;
    }

