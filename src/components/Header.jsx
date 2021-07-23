import { AppBar, Box, Toolbar, Typography } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"
import { ImportButton, ResetButton } from "../components"
import { useCharacterStore } from "../stores/character"

const SpeedyToolbar = styled(Toolbar)(({ theme }) => ({
  gap: theme.spacing(2),
}))

const Brand = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
}))

export function Header() {
  const hasData = useCharacterStore((state) => state.characters.length > 0)
  return (
    <AppBar component="header" position="static">
      <SpeedyToolbar>
        <Brand variant="h6">Speedy</Brand>
        <Box flexGrow={1}>
          <ImportButton />
        </Box>
        {hasData && <ResetButton />}
      </SpeedyToolbar>
    </AppBar>
  )
}
