import pipe from "ramda/es/pipe"
import create from "zustand"
import { devtools, persist } from "zustand/middleware"

// Log every time state is changed
export const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log("  applying", args)
      set(args)
      console.log("  new state", get())
    },
    get,
    api
  )

export const withPersist = (name) => (config) => persist(config, { name })

export const createNamedStore = (name) =>
  pipe(log, devtools, withPersist(name), create)
