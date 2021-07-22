import { Button, Link, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import shallow from "zustand/shallow"
import { Header, Page, useImportContext } from "../components"
import speedy from "../speedy.svg"
import { useCharacterStore } from "../stores/character"

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
}))

export function Welcome() {
  const classes = useStyles()
  const { handleOpen } = useImportContext()
  const { characters, selected } = useCharacterStore(
    (state) => ({ characters: state.characters, selected: state.selected }),
    shallow
  )

  return (
    <Page
      header={
        <Header
          brand="Speedy"
          contentLeft={
            <Button
              className={classes.import}
              color="secondary"
              onClick={handleOpen}
              variant="contained"
            >
              <Typography>Import</Typography>
            </Button>
          }
          contentRight={
            <Button
              className={classes.import}
              color="secondary"
              onClick={() => {
                console.log(characters)
              }}
              variant="contained"
            >
              <Typography>{selected}</Typography>
            </Button>
          }
        />
      }
    >
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
  )
}
