import { Features } from "Features";

export interface Provider2 {
  init: (features: Features) => Promise<void>;
  clean: () => Promise<void>;
}
