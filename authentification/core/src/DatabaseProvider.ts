import { SessionRepository } from "./SessionRepository"
import { UserRepository } from "./UserRepository"

export interface DatabaseProvider {
  init: () => Promise<void>;
  close: () => Promise<void>;
  getRepositories: () => {
    sessionRepository: SessionRepository,
    userRepository: UserRepository,
  }
}
