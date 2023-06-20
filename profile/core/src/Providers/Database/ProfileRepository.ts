import { Profile } from "Features/CreateProfile";

export interface ProfileRepository {
  createProfile: (profile: Profile) => Promise<Profile['id']>
  findProfileByUserId: (userId: Profile['userId']) => Promise<Profile | null>
  saveProfile: (profile: Profile) => Promise<void>
}
