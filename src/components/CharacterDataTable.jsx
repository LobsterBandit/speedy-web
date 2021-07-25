import { useCharacterStore } from "../stores/character"

export function CharacterDataTable() {
  const selected = useCharacterStore((state) => state.selected)
  return <div>{`${selected.Name} - Character Data Table`}</div>
}
