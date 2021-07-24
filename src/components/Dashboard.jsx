import { Box } from "@material-ui/core"
import { CharacterDataTable } from "./CharacterDataTable"
import { CharacterSelect } from "./CharacterSelect"
import { TimePlayedPerLevel } from "./TimePlayedPerLevel"
import { useCharacterStore } from "../stores/character"

export function Dashboard() {
  const { characters, selected, selectCharacter } = useCharacterStore(
    (state) => ({
      characters: state.characters,
      selected: state.selected,
      selectCharacter: state.selectCharacter,
    })
  )

  return (
    <Box display="flex" flexDirection="column" gridGap={24}>
      <CharacterSelect
        characters={characters}
        onCharacterClick={selectCharacter}
        selected={selected}
      />
      <TimePlayedPerLevel selected={selected} />
      <CharacterDataTable selected={selected} />
    </Box>
  )
}
