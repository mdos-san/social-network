import { CreateSessionFeatureFactory, CreateSessionFeatureResult } from "./CreateSessionFeature";
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';

function randomString(length: number) {
  return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

export const createSessionFeatureFactory: CreateSessionFeatureFactory = (database) => async (login, password) => {
  const result: CreateSessionFeatureResult = {
      success: true,
      sessionId: ""
  }

  const userRepository = database.getRepositories().userRepository;
  const user = await userRepository.findUserByLogin(login);
  if (!user) {
    throw new Error(`Can't find the user: "${login}"`);
  }

  const isCorrect = await bcrypt.compare(password, user.password)
  if (!isCorrect) {
    throw new Error(`Password is incorrect`);
  }

  const sessionRepository = database.getRepositories().sessionRepository;

  // Cookie session
  let sessionid = randomString(256);
  result.sessionId = sessionid;

  await sessionRepository.createSession({
    userId: user.id,
    sessionId: sessionid,
  })

  return result;
}

