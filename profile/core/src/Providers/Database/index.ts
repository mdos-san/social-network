import { ProfileRepository } from "./ProfileRepository";

export interface DatabaseProvider {
  init: () => Promise<void>;
  close: () => Promise<void>;
  getRepositories: () => {
    profileRepository: ProfileRepository,
  }
}

export * from "./ProfileRepository";
