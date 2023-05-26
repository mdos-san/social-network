import Features from "./Features"

export interface ApiProvider {
  setup: (feature: Features) => Promise<void>
  clean: () => Promise<void>
}

