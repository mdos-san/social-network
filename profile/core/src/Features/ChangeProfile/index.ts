import { Profile } from "Features/CreateProfile";
import { DatabaseProvider } from "Providers";
import { AuthentificationProvider } from "Providers/Authentification";

export interface ChangeProfileResult {
  profile: Profile,
}

export interface ChangeProfileOptions {
  sessionId: string;
  displayName: Profile['displayName'];
  description: Profile['description'];
}

export interface ChangeProfile {
  (options: ChangeProfileOptions): Promise<ChangeProfileResult>
}

export interface ChangeProfileFactory {
  (database: DatabaseProvider, authentification: AuthentificationProvider):  ChangeProfile
}

export * from "./ChangeProfileFactory"
