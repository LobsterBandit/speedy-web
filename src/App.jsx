import { CssBaseline } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ImportProvider } from "./components";
import { CharacterSelect, Dashboard, Welcome } from "./pages";

const theme = createTheme({
  palette: {
    primary: {
      main: "#82bf4c",
    },
    secondary: yellow,
    type: "dark",
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <ImportProvider>
        <Router>
          <CssBaseline />
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/select">
              <CharacterSelect />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </ImportProvider>
    </ThemeProvider>
  );
}
