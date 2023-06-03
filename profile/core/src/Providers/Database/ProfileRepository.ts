import { Profile } from "Features/CreateProfile";

export interface ProfileRepository {
  createProfile: (profile: Profile) => Promise<Profile['id']>
}
