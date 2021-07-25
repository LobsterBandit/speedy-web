import { Box } from "@material-ui/core"
import { CharacterDataTable } from "./CharacterDataTable"
import { CharacterSelect } from "./CharacterSelect"
import { TimePlayedPerLevel } from "./charts"
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
    <Box display="flex" flexDirection="column" flexGrow={1} gridGap={24}>
      <CharacterSelect
        characters={characters}
        onCharacterClick={selectCharacter}
        selected={selected}
      />
      <TimePlayedPerLevel />
      <Box flexGrow={1}>
        <CharacterDataTable />
      </Box>
    </Box>
  )
}
