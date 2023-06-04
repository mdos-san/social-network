// TODO: init database connexion
import { MongoClient } from 'mongodb';
import MongoDbProfileRepository from './MongoDbProfileRepository';
import { DatabaseProvider, ProfileRepository } from 'core';

let client: MongoClient;
const DB = "profile";

let repositories = {} as {
  profileRepository: ProfileRepository,
};

const mongoDbDatabaseProvider: DatabaseProvider = {
  init: async () => {
    // TODO: Create indexes
    const connexionString = process.env.PROFILE_DATABASE_CONNEXION_STRING || "mongodb://127.0.0.1:27017";
    client = new MongoClient(connexionString);
    client.connect();
    const db = client.db(DB);

    repositories = {
      profileRepository: MongoDbProfileRepository(db),
    }
  },
  close: async () => {
    return client.close();
  },
  getRepositories: () => repositories
};

export default mongoDbDatabaseProvider;
