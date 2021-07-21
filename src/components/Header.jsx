import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  brand: {
    marginRight: theme.spacing(4),
  },
}));

export function Header({ brand, contentLeft, contentRight }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} component="header" position="static">
      <Toolbar>
        <Typography className={classes.brand} variant="h6">
          {brand}
        </Typography>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          flexGrow={1}
        >
          {contentLeft}
        </Box>
        <Box alignItems="center" display="flex" flexDirection="row">
          {contentRight}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
