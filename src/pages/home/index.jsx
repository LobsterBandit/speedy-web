import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Page } from "../../components";
import speedy from "../../speedy.svg";

const useStyles = makeStyles((theme) => ({
  message: {
    marginTop: theme.spacing(2),
  },
  image: {
    alignSelf: "center",
  },
}));

export function Home() {
  const classes = useStyles();

  return (
    <Page>
      <Typography align="center" component="h1" variant="h2">
        Welcome to Speedy
      </Typography>
      <img
        className={classes.image}
        height={200}
        width={200}
        src={speedy}
        alt="speedy"
      />
      <Typography align="center" className={classes.message} variant="body1">
        Import data from the{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.curseforge.com/wow/addons/speedy"
        >
          Speedy addon
        </a>{" "}
        to get started!
      </Typography>
    </Page>
  );
}
