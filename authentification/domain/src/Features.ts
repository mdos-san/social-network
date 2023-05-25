import { CreateDefaultAdminFeatureResult } from "./CreateDefaultAdminFeature";
import { CreateSessionFeatureResult } from "./CreateSessionFeature";

export default interface Features {
  createSession: CreateSessionFeatureResult,
  createDefaultAdmin: CreateDefaultAdminFeatureResult,
}
