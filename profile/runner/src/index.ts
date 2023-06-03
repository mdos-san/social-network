import { DefaultProvider1 as Provider1Impl } from "provider1"
import { DefaultProvider2 as Provider2Impl } from "provider2"
import Core from "core";

export async function start() {
  // Ouput
  await Provider1Impl.init(); // Ex: Database

  const features = Core.init(Provider1Impl);

  // Input
  await Provider2Impl.init(features); // Ex: Api Rest
}

export async function stop() {
  await Provider1Impl.clean();
  await Provider2Impl.clean();
}

