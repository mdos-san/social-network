import { DatabaseProvider } from "Providers";
import { SessionModel } from "SessionRepository";
import { UserModel } from "UserRepository";

export interface ChangePasswordFeatureResult {
  success: boolean;
}

export interface ChangePasswordOptions {
  sessionId: SessionModel['sessionId'];
  userId: UserModel['login'];
  newPassword: UserModel['password']
}

export interface ChangePasswordFeature {
  (options: ChangePasswordOptions): Promise<ChangePasswordFeatureResult>
}

export interface ChangePasswordFeatureFactory {
  (database: DatabaseProvider):  ChangePasswordFeature
}

