import { createNamedStore } from "./middleware"

const initialState = {
  characterData: [],
  characters: [],
  selected: "ALL",
}

export const useCharacterStore = createNamedStore("character-store")((set) => ({
  ...initialState,
  selectCharacter: (selected) => set({ selected }),
  setCharacterData: (data) =>
    set({
      characters: Object.values(data).map(({ Key }) => Key),
      characterData: Array.from(Object.entries(data), ([k, v]) => ({ [k]: v })),
    }),
  reset: () => set(initialState),
}))
