import { MongoDbDatabaseProvider as Database } from "database"
import { ExpressApiProvider as Api } from "api"
import Core from "core";

export async function start() {
  await Database.init();
  const features = Core.init(Database);
  await Api.setup(features);
}

export async function stop() {
  await Api.clean();
  await Database.close();
}

