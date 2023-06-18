import { Profile } from "Features/CreateProfile";
import { DatabaseProvider } from "Providers";
import { AuthentificationProvider } from "Providers/Authentification";

export interface GetProfileResult {
  profile: Profile,
}

export interface GetProfile {
  (sessionId: string): Promise<GetProfileResult>
}

export interface GetProfileFactory {
  (database: DatabaseProvider, authentification: AuthentificationProvider):  GetProfile
}

export * from "./GetProfileFactory"
