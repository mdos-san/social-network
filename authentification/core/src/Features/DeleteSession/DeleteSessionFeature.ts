import { DatabaseProvider } from "Providers";
import { SessionModel } from "SessionRepository";

export interface DeleteSessionsFeatureResult {
  success: boolean;
}

export interface DeleteSessionFeature {
  (sessionId: SessionModel['sessionId']): Promise<DeleteSessionsFeatureResult>
}

export interface DeleteSessionFeatureFactory {
  (database: DatabaseProvider): DeleteSessionFeature
}

