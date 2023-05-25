import { DatabaseProvider } from "./DatabaseProvider";

export interface CreateDefaultAdminFeatureResult {
  success: boolean;
}

export interface CreateDefaultAdminFeature {
  (database: DatabaseProvider): Promise<CreateDefaultAdminFeatureResult>
}
