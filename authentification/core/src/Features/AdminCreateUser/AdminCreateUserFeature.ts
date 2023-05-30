import { DatabaseProvider } from "Providers";
import { Features } from "Features";
import { UserModel } from "UserRepository";
import { SessionModel } from "SessionRepository";

export interface AdminCreateUserFeatureResult {
  success: boolean;
}

export interface AdminCreateUserFeature {
  (sessionId: SessionModel['sessionId'], login: UserModel['login'], password: UserModel['password']): Promise<AdminCreateUserFeatureResult>
}

export interface AdminCreateUserFeatureFactory {
  (features: Features, database: DatabaseProvider):  AdminCreateUserFeature
}
