import { UserModel, UserRepository } from "core";
import { Db } from "mongodb";

const COLLECTION = "user";

const MongoDbUserRepository = (db: Db): UserRepository => {
  const collection = db.collection(COLLECTION);

  return {
    findUserByLogin: async (login) => {
      return collection.findOne<UserModel>({ login });
    },
    findUserByUserId: async (userId) => {
      return collection.findOne<UserModel>({ id: userId });
    },
    changePasswordForUserId: async (userId, password) => {
      const result = await collection.updateOne({ id: userId }, { $set: { password } });
      return result.acknowledged;
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
