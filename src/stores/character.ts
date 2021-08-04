import { createNamedStore } from "./middleware"

type CharacterKey = string

export interface CharacterLevelTimes {
  [level: string]: {
    Played: number
    LastUpdated: number
  }
}

export interface Character {
  Key: CharacterKey
  Name: string
  Realm: string
  Class: string
  Race: string
  Gender: string
  Level: number
  XP: number
  PlayedTotal: number
  PlayedLevel: number
  LastSeen: number
  LevelTimes: CharacterLevelTimes
}

type CharacterSelection = Pick<Character, "Key" | "Name" | "Realm">

export type CharacterData = Record<CharacterKey, Character>

export interface CharacterStore {
  characterData: CharacterData
  characters: CharacterSelection[]
  selected: CharacterSelection
  realms: string[]
  selectCharacter: (selected: CharacterSelection) => void
  setCharacterData: (data: CharacterData) => void
  reset: () => void
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
  selectCharacter: () => void 0,
  setCharacterData: () => void 0,
  reset: () => void 0,
}

// const createCharacterStore = createNamedStore("character-store")
export const useCharacterStore = createNamedStore(
  "character-store"
)<CharacterStore>((set) => ({
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
        }, [] as string[])
        .sort(),
    })
  },
  reset: () => set(initialState),
}))
