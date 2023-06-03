export interface Provider1 {
  init: () => Promise<void>
  clean: () => Promise<void>
}

