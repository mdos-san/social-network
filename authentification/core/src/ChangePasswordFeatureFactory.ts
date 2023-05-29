import { ChangePasswordFeatureFactory, ChangePasswordFeatureResult } from "./ChangePasswordFeature";
import bcrypt from 'bcrypt';

// TODO: No global var
const saltRounds = 10;

const changePasswordFeatureFactory: ChangePasswordFeatureFactory =
  (database) =>
    async (sessionId, userId, newPassword) => {
      const result: ChangePasswordFeatureResult = {
        success: true,
      }

      const sessionRepository = database.getRepositories().sessionRepository;
      const session = await sessionRepository.findSessionById(sessionId)
      if (!session) {
        throw new Error("Can't find session")
      }

      if (session.userId !== userId) { // TODO: Role admin
        throw new Error("UserId mismatch")
      }

      if (!newPassword || newPassword === "") {
        throw new Error("'newPassword' should be defined")
      }

      const userRepositories = database.getRepositories().userRepository;
      const user = await userRepositories.findUserByUserId(session.userId);
      if (!user) {
        throw new Error(`User '${session.userId}' does not exist`)
      }

      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      const success = await userRepositories.changePasswordForUserId(session.userId, hashedPassword);
      if (!success) {
        throw new Error(`Can't change password for user ${user.login}`)
      }

      return result;
    }

export default changePasswordFeatureFactory;
