import { Box, Link, Typography } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"
import { ImportButton } from "./Import"
import speedy from "../speedy.svg"

const Logo = styled("img")({
  height: 200,
  width: 200,
  alignSelf: "center",
})

export function Welcome() {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gridGap={24}
      pt={5}
    >
      <Typography align="center" component="h1" variant="h2" gutterBottom>
        Welcome to Speedy
      </Typography>
      <Logo src={speedy} alt="speedy" />
      <Typography align="center" component="p" variant="h5">
        {"Import data from the "}
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
      <ImportButton color="primary" size="large" variant="contained">
        Import Data
      </ImportButton>
    </Box>
  )
}
