import { Box, Chip } from "@material-ui/core"
import shallow from "zustand/shallow"
import { allSelected, useCharacterStore } from "../stores/character"

export function CharacterSelect() {
  const { characters, selected, selectCharacter } = useCharacterStore(
    (state) => ({
      characters: state.characters,
      selected: state.selected,
      selectCharacter: state.selectCharacter,
    }),
    shallow
  )

  return (
    <Box display="flex" component="ul" flexWrap="wrap" gridGap={12} m={0} p={0}>
      <Chip
        color={selected.Key === allSelected.Key ? "primary" : "default"}
        component="li"
        key={allSelected.Key}
        label={allSelected.Name}
        onClick={() => selectCharacter(allSelected)}
      />
      {characters
        .sort((a, b) => (a.Name < b.Name ? -1 : 1))
        .map((c) => (
          <Chip
            color={c.Key === selected.Key ? "primary" : "default"}
            component="li"
            key={c.Key}
            label={`${c.Name} - ${c.Realm}`}
            onClick={() => selectCharacter(c)}
          />
        ))}
    </Box>
  )
}
