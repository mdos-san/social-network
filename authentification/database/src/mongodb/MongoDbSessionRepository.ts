import { SessionModel, SessionRepository } from "core";
import { Db } from "mongodb";

const COLLECTION = "session";

const MongoDbSessionRepository = (db: Db): SessionRepository => {
  const collection = db.collection(COLLECTION);

  return {
    findSessionById: async (sessionId) => {
      return collection.findOne<SessionModel>({ sessionId });
    },
    createSession: async (session) => {
      try {
        const result = await collection.insertOne(session);
        return result.acknowledged;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
}

export default MongoDbSessionRepository;
