import { ChangeProfile } from "./ChangeProfile";
import { CreateProfile } from "./CreateProfile";
import { GetProfile } from "./GetProfile";

export interface Features {
  createProfile: CreateProfile,
  getProfile: GetProfile,
  changeProfile: ChangeProfile,
}

export * from "./CreateProfile";
export * from "./GetProfile";
export * from "./ChangeProfile";
