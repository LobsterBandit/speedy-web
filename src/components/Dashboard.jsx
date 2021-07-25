import { Box } from "@material-ui/core"
import { CharacterDataTable } from "./CharacterDataTable"
import { CharacterSelect } from "./CharacterSelect"
import { TimePlayedCumulative, TimePlayedPerLevel } from "./charts"
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
      <TimePlayedCumulative />
      <TimePlayedPerLevel type="bar" />
      <Box flexGrow={1}>
        <CharacterDataTable />
      </Box>
    </Box>
  )
}
