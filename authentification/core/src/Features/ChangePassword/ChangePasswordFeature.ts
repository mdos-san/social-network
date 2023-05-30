import { DatabaseProvider } from "Providers";
import { SessionModel } from "SessionRepository";
import { UserModel } from "UserRepository";

export interface ChangePasswordFeatureResult {
  success: boolean;
}

export interface ChangePasswordFeature {
  (sessionId: SessionModel['sessionId'], userId: UserModel['login'], newPassword: UserModel['password']): Promise<ChangePasswordFeatureResult>
}

export interface ChangePasswordFeatureFactory {
  (database: DatabaseProvider):  ChangePasswordFeature
}

