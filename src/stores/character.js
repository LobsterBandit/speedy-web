import { createNamedStore } from "./middleware"

export const allSelected = { Key: "All", Name: "All", Realm: "All" }

const initialState = {
  characterData: {},
  characters: [],
  selected: allSelected,
  realms: [],
}

export const useCharacterStore = createNamedStore("character-store")((set) => ({
  ...initialState,
  selectCharacter: (selected) => set({ selected }),
  setCharacterData: (data) => {
    const values = Object.values(data)
    return set({
      // list of unique characters in data
      characters: values.map(({ Key, Name, Realm }) => ({
        Key,
        Name,
        Realm,
      })),
      characterData: data,
      // list of unique realms in data
      realms: values
        .reduce((acc, { Realm }) => {
          if (!acc.includes(Realm)) {
            acc.push(Realm)
          }
          return acc
        }, [])
        .sort(),
    })
  },
  reset: () => set(initialState),
}))
