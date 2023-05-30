import { UserModel } from "./UserRepository";

export default interface UserInfo {
  userId: UserModel['id'],
  scopes: UserModel['scopes'],
}
