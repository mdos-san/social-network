export interface UserInfo {
  userId: string,
  scopes: Set<string>,
}

export interface AuthentificationProvider {
  init: () => Promise<void>;
  close: () => Promise<void>;
  getUserInfo: (sessionId: string) => Promise<UserInfo>;
}

