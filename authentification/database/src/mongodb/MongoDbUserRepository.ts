import { Db } from "mongodb";
import { UserModel, UserRepository } from "../UserRepository";

const COLLECTION = "user";

const MongoDbUserRepository = (db: Db): UserRepository => {
  const collection = db.collection(COLLECTION);

  return {
    findUserByLogin: async (login) => {
      return collection.findOne<UserModel>({ login });
    },
    createUser: async (user) => {
      try {
        const result = await collection.insertOne(user);
        return result.acknowledged;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
}

export default MongoDbUserRepository;