export interface CreateSessionFeatureResult {
  success: boolean;
  sessionId: string;
}

export interface CreateSessionFeature {
  (login: string, password: string): CreateSessionFeatureResult
}
