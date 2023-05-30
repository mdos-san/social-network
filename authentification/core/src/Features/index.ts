import { AdminCreateUserFeature } from "./AdminCreateUser";
import { ChangePasswordFeature } from "./ChangePassword";
import { CreateDefaultAdminFeature } from "./CreateDefaultAdmin";
import { CreateSessionFeature } from "./CreateSession";
import { DeleteSessionFeature } from "./DeleteSession";
import { GetUserInfoFeature } from "./GetUserInfo";
import { ResolveUserFromSessionIdFeature } from "./ResolveUserFromSessionId";

export interface Features {
  createSession: CreateSessionFeature,
  createDefaultAdmin: CreateDefaultAdminFeature,
  deleteSession: DeleteSessionFeature,
  adminCreateUser: AdminCreateUserFeature,
  changePassword: ChangePasswordFeature,
  resolveUserFromSessionId: ResolveUserFromSessionIdFeature,
  getUserInfo: GetUserInfoFeature;
}

export * from "./AdminCreateUser";
export * from "./ChangePassword";
export * from "./CreateDefaultAdmin";
export * from "./CreateSession";
export * from "./DeleteSession";
export * from "./GetUserInfo";
export * from "./ResolveUserFromSessionId";

