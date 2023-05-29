import { AdminCreateUserFeatureFactory, AdminCreateUserFeatureResult } from "./AdminCreateUserFeature";
import { v4 } from "uuid";
import bcrypt from 'bcrypt';

// TODO: No global var
const saltRounds = 10;

const adminCreateUserFeatureFactory: AdminCreateUserFeatureFactory =
  (database) =>
    async (sessionId, login, password) => {
      const result: AdminCreateUserFeatureResult = {
        success: true,
      }

      const sessionRepository = database.getRepositories().sessionRepository;
      const session = await sessionRepository.findSessionById(sessionId)
      if (!session) {
        throw new Error("Can't find session")
      }

      // TODO: session.permission
      if (session.userId !== "admin") {
        throw new Error("Only admin is allowed to do this operation")
      }

      if (!login || login === "" || !password || password === "") {
        throw new Error("'login' and 'password' should be defined")
      }

      const userRepositories = database.getRepositories().userRepository;
      const user = await userRepositories.findUserByLogin(login);
      if (user) {
        throw new Error(`User '${login}' already exist`)
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const success = await userRepositories.createUser({
        id: v4(),
        login,
        password: hashedPassword,
      });
      if (!success) {
        throw new Error(`Can't create user ${login}`)
      }

      return result;
    }

export default adminCreateUserFeatureFactory;
