import { DatabaseProvider } from "./DatabaseProvider";

export interface CreateDefaultAdminFeatureResult {
  success: boolean;
}

export interface CreateDefaultAdminFeature {
  (): Promise<CreateDefaultAdminFeatureResult>
}

export interface CreateDefaultAdminFeatureFactory {
  (database: DatabaseProvider): CreateDefaultAdminFeature
}
