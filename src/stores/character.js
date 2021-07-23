import { createNamedStore } from "./middleware"

const initialState = {
  characterData: {},
  characters: [],
  selected: "All",
  realms: [],
}

export const useCharacterStore = createNamedStore("character-store")((set) => ({
  ...initialState,
  selectCharacter: (selected) => set({ selected }),
  setCharacterData: (data) =>
    set({
      // list of unique characters in data
      characters: Object.values(data).map(({ Key, Name, Realm }) => ({
        Key,
        Name,
        Realm,
      })),
      characterData: data,
      // list of unique realms in data
      realms: Object.values(data)
        .reduce((acc, { Realm }) => {
          if (!acc.includes(Realm)) {
            acc.push(Realm)
          }
          return acc
        }, [])
        .sort(),
    }),
  reset: () => set(initialState),
}))
