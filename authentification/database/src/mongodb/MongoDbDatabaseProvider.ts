// TODO: init database connexion
import { MongoClient } from 'mongodb';
import MongoDbSessionRepository from './MongoDbSessionRepository';
import MongoDbUserRepository from './MongoDbUserRepository';

import { DatabaseProvider, SessionRepository, UserRepository } from 'core';

let client: MongoClient;
const DB = "authentification";

let repositories = {} as {
  sessionRepository: SessionRepository,
  userRepository: UserRepository,
};

const mongoDbDatabaseProvider: DatabaseProvider = {
  init: async () => {
    // TODO: Create indexes
    client = new MongoClient("mongodb://127.0.0.1:27017");
    client.connect();
    const db = client.db(DB);

    repositories = {
      sessionRepository: MongoDbSessionRepository(db),
      userRepository: MongoDbUserRepository(db),
    }
  },
  close: async () => {
    return client.close();
  },
  getRepositories: () => repositories
};

export default mongoDbDatabaseProvider;
