import { ProfileRepository } from "core";
import { Db } from "mongodb";

const COLLECTION = "profile";

const MongoDbProfileRepository = (db: Db): ProfileRepository => {
  const collection = db.collection(COLLECTION);

  return {
    createProfile: async (profile) => {
      await collection.insertOne(profile);
      return profile.id;
    },
  }
}

export default MongoDbProfileRepository;
