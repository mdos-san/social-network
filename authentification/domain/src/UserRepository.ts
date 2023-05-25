// TODO: move
export interface UserModel {
  id: string;
  login: string;
  password: string;
}

export interface UserRepository {
  findUserByLogin: (login: string) => Promise<UserModel | null>,
  createUser: (user: UserModel) => Promise<boolean> // TODO: Error management ?
}

