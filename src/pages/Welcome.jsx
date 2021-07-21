import { Box, Button, Grid, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Header, Page, useImport, useImportContext } from "../components";
import speedy from "../speedy.svg";

const useStyles = makeStyles((theme) => ({
  import: {
    textTransform: "none",
  },
  message: {
    marginTop: theme.spacing(2),
  },
  image: {
    alignSelf: "center",
  },
}));

export function Welcome() {
  const classes = useStyles();
  // const { handleOpen, Import, importProps } = useImport();
  const { handleOpen } = useImportContext();

  return (
    <Page
      header={
        <Header
          brand="Speedy"
          contentLeft={
            <Button
              className={classes.import}
              color="inherit"
              onClick={handleOpen}
            >
              <Typography>Import</Typography>
            </Button>
          }
        />
      }
    >
      {/* <Import {...importProps} /> */}
      <Typography align="center" component="h1" variant="h2" gutterBottom>
        Welcome to Speedy
      </Typography>
      <img
        className={classes.image}
        height={200}
        width={200}
        src={speedy}
        alt="speedy"
      />
      <Typography
        align="center"
        className={classes.message}
        component="p"
        variant="h5"
      >
        <Button
          className={classes.import}
          color="primary"
          onClick={handleOpen}
          // size="large"
          variant="outlined"
        >
          <Typography>Import</Typography>
        </Button>
        {" data from the "}
        <Link
          color="secondary"
          href="https://www.curseforge.com/wow/addons/speedy"
          rel="noopener noreferrer"
          target="_blank"
        >
          Speedy AddOn
        </Link>
        {" to get started!"}
      </Typography>
    </Page>
  );
}
