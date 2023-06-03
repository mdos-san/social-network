import { DatabaseProvider } from "Providers";
import { AuthentificationProvider } from "Providers/Authentification";

export interface Profile {
  id: string,
  userId: string,
  displayName: string,
  description: string,
}

export interface CreateProfileResult {
  profileId: Profile['id'],
}

export interface CreateProfile {
  (sessionId: string): Promise<CreateProfileResult>
}

export interface CreateProfileFactory {
  (database: DatabaseProvider, authentification: AuthentificationProvider):  CreateProfile
}

export * from "./CreateProfileFactory"
