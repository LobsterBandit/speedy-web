import { createNamedStore } from "./middleware"

const initialState = {
  characters: [],
  selected: "ALL",
}

export const useCharacterStore = createNamedStore("character-store")((set) => ({
  ...initialState,
  selectCharacter: (selected) => set({ selected }),
  setCharacterData: (data) =>
    set({
      characters: Array.from(Object.entries(data), ([k, v]) => ({ [k]: v })),
    }),
  reset: () => set(initialState),
}))
