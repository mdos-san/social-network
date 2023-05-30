// TODO: move
export interface UserModel {
  id: string;
  login: string;
  password: string;
  scopes: Set<string>;
}

export interface UserRepository {
  findUserByLogin: (login: UserModel['login']) => Promise<UserModel | null>,
  findUserByUserId: (userId: UserModel['id']) => Promise<UserModel | null>,
  changePasswordForUserId: (userId: UserModel['id'], password: UserModel['password']) => Promise<boolean>,
  createUser: (user: UserModel) => Promise<boolean> // TODO: Error management ?
}

