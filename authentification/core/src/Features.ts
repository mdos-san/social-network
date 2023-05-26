import { CreateDefaultAdminFeature } from "./CreateDefaultAdminFeature";
import { CreateSessionFeature } from "./CreateSessionFeature";

export default interface Features {
  createSession: CreateSessionFeature,
  createDefaultAdmin: CreateDefaultAdminFeature,
}
