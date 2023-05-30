import { DatabaseProvider } from "./DatabaseProvider";
import { SessionModel } from "./SessionRepository";
import { UserModel } from "./UserRepository";

export interface ResolveUserFromSessionIdFeatureResult {
  success: boolean;
  user: UserModel;
}

export interface ResolveUserFromSessionIdFeature {
  (sessionId: SessionModel['sessionId']): Promise<ResolveUserFromSessionIdFeatureResult>
}

export interface ResolveUserFromSessionIdFeatureFactory {
  (database: DatabaseProvider):  ResolveUserFromSessionIdFeature
}
