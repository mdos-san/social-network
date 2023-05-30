import { DatabaseProvider } from "Providers";

export interface CreateSessionFeatureResult {
  success: boolean;
  sessionId: string;
}

export interface CreateSessionFeature {
  (login: string, password: string): Promise<CreateSessionFeatureResult>
}

export interface CreateSessionFeatureFactory {
  (database: DatabaseProvider):  CreateSessionFeature
}
