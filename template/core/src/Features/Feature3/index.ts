import { Features } from "Features";
import { Provider1 } from "Providers";

export interface Feature3Result {
}

export interface Feature3 {
  (): Promise<Feature3Result>
}

export interface Feature3Factory {
  (features: Features, provider1: Provider1):  Feature3
}

export * from "./Feature3Factory"
