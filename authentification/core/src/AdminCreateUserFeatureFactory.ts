import { AdminCreateUserFeatureFactory, AdminCreateUserFeatureResult } from "./AdminCreateUserFeature";
import { v4 } from "uuid";
import bcrypt from 'bcrypt';

// TODO: No global var
const saltRounds = 10;

const adminCreateUserFeatureFactory: AdminCreateUserFeatureFactory =
  (features, database) =>
    async (sessionId, login, password) => {
      const result: AdminCreateUserFeatureResult = {
        success: true,
      }

      const { user } = await features.resolveUserFromSessionId(sessionId);

      if (!user.scopes.has("admin")) {
        throw new Error("Only admin is allowed to do this operation")
      }

      if (!login || login === "" || !password || password === "") {
        throw new Error("'login' and 'password' should be defined")
      }

      const userRepositories = database.getRepositories().userRepository;
      const newUser = await userRepositories.findUserByLogin(login);
      if (newUser) {
        throw new Error(`User '${login}' already exist`)
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const success = await userRepositories.createUser({
        id: v4(),
        login,
        password: hashedPassword,
        scopes: new Set(),
      });
      if (!success) {
        throw new Error(`Can't create user ${login}`)
      }

      return result;
    }

export default adminCreateUserFeatureFactory;
