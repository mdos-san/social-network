import { AdminCreateUserFeature } from "./AdminCreateUserFeature";
import { ChangePasswordFeature } from "./ChangePasswordFeature";
import { CreateDefaultAdminFeature } from "./CreateDefaultAdminFeature";
import { CreateSessionFeature } from "./CreateSessionFeature";
import { DeleteSessionFeature } from "./DeleteSessionFeature";

export default interface Features {
  createSession: CreateSessionFeature,
  createDefaultAdmin: CreateDefaultAdminFeature,
  deleteSession: DeleteSessionFeature,
  adminCreateUser: AdminCreateUserFeature,
  changePassword: ChangePasswordFeature,
}
