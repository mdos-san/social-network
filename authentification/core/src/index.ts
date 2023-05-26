import createDefaultAdminFeatureFactory from "./CreateDefaultAdminFeatureFactory";
import { Database } from "database"
import Api from "api"
import Features from "./Features";
import createSessionFeatureFactory from "./CreateSessionFeatureFactory";

let features = {} as Features;

export async function start() {
  await Database.init();

  features.createDefaultAdmin = createDefaultAdminFeatureFactory(Database);
  features.createSession = createSessionFeatureFactory(Database);

  await Api.setup(features);
}

export async function stop() {
  await Database.close();
  await Api.clean();
}

// Database
export * from "./DatabaseProvider";
export * from "./UserRepository";
export * from "./SessionRepository";

// Api
export * from "./ApiProvider";
