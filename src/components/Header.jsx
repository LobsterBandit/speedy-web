import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"
import { ImportButton } from "../components"

const Brand = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(4),
}))

export function Header() {
  return (
    <AppBar component="header" position="static">
      <Toolbar>
        <Brand variant="h6">Speedy</Brand>
        <ImportButton />
      </Toolbar>
    </AppBar>
  )
}
