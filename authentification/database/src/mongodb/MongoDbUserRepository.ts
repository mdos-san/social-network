import { UserModel, UserRepository } from "core";
import { Db } from "mongodb";

const COLLECTION = "user";

const MongoDbUserRepository = (db: Db): UserRepository => {
  const collection = db.collection(COLLECTION);

  const findUserBy = async <
    ModelKey extends keyof UserModel,
    ModelValue extends UserModel[ModelKey]
  > (modelKey: ModelKey, modelValue: ModelValue) => {
    const doc = await collection.findOne<UserModel>({ [modelKey]: modelValue });
    if (doc === null) {
      return null;
    }

    doc.scopes = new Set(doc.scopes);
    return doc;
  }

  return {
    findUserByLogin: async (login) => {
      return findUserBy("login", login);
    },
    findUserByUserId: async (id) => {
      return findUserBy("id", id);
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
