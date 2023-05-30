import Features from "./Features";
import UserInfo from "./UserInfo";
import { SessionModel } from "./SessionRepository";

export interface GetUserInfoFeatureResult {
  success: boolean;
  userinfo: UserInfo;
}

export interface GetUserInfoFeature {
  (sessionId: SessionModel['sessionId']): Promise<GetUserInfoFeatureResult>
}

export interface GetUserInfoFeatureFactory {
  (features: Features):  GetUserInfoFeature
}
