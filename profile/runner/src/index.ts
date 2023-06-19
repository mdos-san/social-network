import { MongoDbDatabaseProvider as DatabaseProvider } from "database"
import { ExpressApiProvider as ApiProvider } from "api"
import { DefaultAuthentificationProvider as AuthentificationProvider } from "authentification"
import Core from "core";

export async function start() {
  // Ouput
  await DatabaseProvider.init();
  await AuthentificationProvider.init();

  // Business Logic
  const features = Core.init(DatabaseProvider, AuthentificationProvider);

  // Input
  await ApiProvider.init(features);
}

export async function stop() {
  await DatabaseProvider.close();
  await ApiProvider.clean();
}

