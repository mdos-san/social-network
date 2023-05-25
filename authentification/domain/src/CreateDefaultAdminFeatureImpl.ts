import { CreateDefaultAdminFeature, CreateDefaultAdminFeatureResult } from "./CreateDefaultAdminFeature";
import bcrypt from 'bcrypt';

// TODO: No global var
const saltRounds = 10;

const createDefaultAdminFeature: CreateDefaultAdminFeature = async (database) => {
  const result: CreateDefaultAdminFeatureResult = {
   success: true,
  }

  const userRepositories = database.getRepositories().userRepository;
  const adminUser = await userRepositories.findUserByLogin("admin");
  if (adminUser) {
    result.success = false;
    return result;
  }

  const hashPassword = await bcrypt.hash("admin", saltRounds);

  await userRepositories.createUser({
    id: "admin",
    login: "admin",
    password: hashPassword,
  })

  return result;
}

export default createDefaultAdminFeature;
