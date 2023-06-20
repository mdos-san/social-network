import { ProfileRepository } from "core";
import { Profile } from "core/dist/Features/CreateProfile";
import { Db } from "mongodb";

const COLLECTION = "profile";

const MongoDbProfileRepository = (db: Db): ProfileRepository => {
  const collection = db.collection(COLLECTION);

  return {
    createProfile: async (profile) => {
      await collection.insertOne(profile);
      return profile.id;
    },
    findProfileByUserId: async (userId) => {
      return await collection.findOne<Profile>({ userId });
    },
    saveProfile: async (profile) => {
      await collection.replaceOne({ id: profile.id }, profile);
    },
  }
}

export default MongoDbProfileRepository;
