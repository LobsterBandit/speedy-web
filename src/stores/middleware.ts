import pipe from "ramda/es/pipe"
import create, { State, StateCreator } from "zustand"
import { devtools, persist } from "zustand/middleware"

// Log every time state is changed
export const log =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (args) => {
        console.log("  applying", args)
        set(args)
        console.log("  new state", get())
      },
      get,
      api
    )

// Persist state to localStorage
export const withPersist =
  (name: string) =>
  <T extends State>(config: StateCreator<T>) =>
    persist(config, { name })

export const createNamedStore = (name: string) =>
  pipe(log, devtools, withPersist(name), create)
