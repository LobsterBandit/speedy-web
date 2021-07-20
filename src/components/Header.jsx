import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  brand: {
    marginRight: theme.spacing(4),
  },
}));

export function Header({ brand, showCharacter = false }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} component="header" position="static">
      <Toolbar>
        <Box
          display="flex"
          flexDirection="row"
          flexGrow={1}
          alignItems="center"
        >
          <Typography className={classes.brand} variant="h6">
            {brand}
          </Typography>
          <Typography>Import</Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          {showCharacter && <Typography>CharacterName</Typography>}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
