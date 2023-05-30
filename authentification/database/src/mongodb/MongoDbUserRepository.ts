import { UserModel, UserRepository } from "core";
import { Db } from "mongodb";

const COLLECTION = "user";

const MongoDbUserRepository = (db: Db): UserRepository => {
  const collection = db.collection(COLLECTION);

  return {
    findUserByLogin: async (login) => {
      const doc = await collection.findOne<UserModel>({ login });
      if (doc === null) {
        return null;
      }

      doc.scopes = new Set(doc.scopes);
      return doc;
    },
    findUserByUserId: async (userId) => {
      const doc = await collection.findOne<UserModel>({ id: userId });
      if (doc === null) {
        return null;
      }

      doc.scopes = new Set(doc.scopes);
      return doc;
    },
    changePasswordForUserId: async (userId, password) => {
      const result = await collection.updateOne({ id: userId }, { $set: { password } });
      return result.acknowledged;
    },
    createUser: async (user) => {
      try {
        const result = await collection.insertOne({ ...user, scopes: Array.from(user.scopes) });
        return result.acknowledged;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
}

export default MongoDbUserRepository;
