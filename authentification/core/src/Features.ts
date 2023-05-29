import { CreateDefaultAdminFeature } from "./CreateDefaultAdminFeature";
import { CreateSessionFeature } from "./CreateSessionFeature";
import { DeleteSessionFeature } from "./DeleteSessionFeature";

export default interface Features {
  createSession: CreateSessionFeature,
  createDefaultAdmin: CreateDefaultAdminFeature,
  deleteSession: DeleteSessionFeature,
}
