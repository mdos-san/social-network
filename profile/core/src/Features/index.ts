import { CreateProfile } from "./CreateProfile";
import { Feature1 } from "./Feature1";
import { Feature2 } from "./Feature2";
import { Feature3 } from "./Feature3";

export interface Features {
  feature1: Feature1,
  feature2: Feature2,
  feature3: Feature3,
  createProfile: CreateProfile,
}

export * from "./Feature1";
export * from "./Feature2";
export * from "./Feature3";
