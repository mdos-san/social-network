import { DatabaseProvider } from "./DatabaseProvider";
import { SessionModel } from "./SessionRepository";
import { UserModel } from "./UserRepository";

export interface AdminCreateUserFeatureResult {
  success: boolean;
}

export interface AdminCreateUserFeature {
  (sessionId: SessionModel['sessionId'], login: UserModel['login'], password: UserModel['password']): Promise<AdminCreateUserFeatureResult>
}

export interface AdminCreateUserFeatureFactory {
  (database: DatabaseProvider):  AdminCreateUserFeature
}
