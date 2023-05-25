import { DatabaseProvider } from "./DatabaseProvider";

export interface CreateSessionFeatureResult {
  success: boolean;
  sessionId: string;
}

export interface CreateSessionFeature {
  (database: DatabaseProvider, login: string, password: string): Promise<CreateSessionFeatureResult>
}
