import { DefaultProvider1 as Provider1Impl } from "provider1"
import { DefaultProvider2 as Provider2Impl } from "provider2"
import { MongoDbDatabaseProvider as DatabaseProvider } from "database"
import { ExpressApiProvider as ApiProvider } from "api"
import { DefaultAuthentificationProvider as AuthentificationProvider } from "authentification"
import Core from "core";

export async function start() {
  // Ouput
  await Provider1Impl.init(); // Ex: Database
  await DatabaseProvider.init();
  await AuthentificationProvider.init();

  // Business Logic
  const features = Core.init(Provider1Impl, DatabaseProvider, AuthentificationProvider);

  // Input
  await Provider2Impl.init(features); // Ex: Api Rest
  await ApiProvider.init(features);
}

export async function stop() {
  await Provider1Impl.clean();
  await Provider2Impl.clean();
  await DatabaseProvider.close();
  await ApiProvider.clean();
}

