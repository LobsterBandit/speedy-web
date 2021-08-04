import { createNamedStore } from "./middleware"

type CharacterKey = string

interface Character {
  Key: CharacterKey
  Name: string
  Realm: string
}

type CharacterSelection = Pick<Character, "Key" | "Name" | "Realm">

interface CharacterStore {
  characterData: Record<CharacterKey, CharacterSelection>
  characters: CharacterSelection[]
  selected: CharacterSelection
  realms: string[]
}

export const SELECTED_ALL: CharacterSelection = {
  Key: "All",
  Name: "All",
  Realm: "All",
}

const initialState: CharacterStore = {
  characterData: {},
  characters: [],
  selected: SELECTED_ALL,
  realms: [],
}

// const createCharacterStore = createNamedStore("character-store")
export const useCharacterStore = createNamedStore(
  "character-store"
)<CharacterStore>((set) => ({
  ...initialState,
  selectCharacter: (selected: Character) => set({ selected }),
  setCharacterData: (data: Record<CharacterKey, CharacterSelection>) => {
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
        }, [] as string[])
        .sort(),
    })
  },
  reset: () => set(initialState),
}))
