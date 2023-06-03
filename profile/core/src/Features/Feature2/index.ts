import { Features } from "Features";
import { Provider1 } from "Providers";

export interface Feature2Result {
  success: boolean;
}

export interface Feature2 {
  (): Promise<Feature2Result>
}

export interface Feature2Factory {
  (features: Features, provider1: Provider1):  Feature2
}

export * from "./Feature2Factory"
