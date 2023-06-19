import { CreateProfile } from "./CreateProfile";
import { GetProfile } from "./GetProfile";

export interface Features {
  createProfile: CreateProfile,
  getProfile: GetProfile,
}

export * from "./CreateProfile";
export * from "./GetProfile";
