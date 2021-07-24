import { Box, Chip } from "@material-ui/core"
import { allSelected } from "../stores/character"

export function CharacterSelect({ characters, onCharacterClick, selected }) {
  return (
    <Box display="flex" component="ul" flexWrap="wrap" gridGap={12} m={0} p={0}>
      <Chip
        color={selected.Key === allSelected.Key ? "primary" : "default"}
        component="li"
        key={allSelected.Key}
        label={allSelected.Name}
        onClick={() => onCharacterClick(allSelected)}
      />
      {characters
        .sort((a, b) => (a.Name < b.Name ? -1 : 1))
        .map((c) => (
          <Chip
            color={c.Key === selected.Key ? "primary" : "default"}
            component="li"
            key={c.Key}
            label={`${c.Name} - ${c.Realm}`}
            onClick={() => onCharacterClick(c)}
          />
        ))}
    </Box>
  )
}
