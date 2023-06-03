import { Features } from "Features";
import { Provider1 } from "Providers";

export interface Feature1Result {
}

export interface Feature1 {
  (): Promise<Feature1Result>
}

export interface Feature1Factory {
  (features: Features, provider1: Provider1):  Feature1
}

export * from "./Feature1Factory"
