import { CssBaseline } from "@material-ui/core"
import { yellow } from "@material-ui/core/colors"
import { createTheme, ThemeProvider } from "@material-ui/core/styles"
import { ImportProvider, Speedy } from "./components"

const theme = createTheme({
  palette: {
    primary: {
      main: "#82bf4c",
    },
    secondary: yellow,
    type: "dark",
  },
})

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <ImportProvider>
        <CssBaseline />
        <Speedy />
      </ImportProvider>
    </ThemeProvider>
  )
}
