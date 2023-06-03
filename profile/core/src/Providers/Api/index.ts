import { Features } from "Features";

export interface ApiProvider {
  init: (feature: Features) => Promise<void>
  clean: () => Promise<void>
}

