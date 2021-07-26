import { Box } from "@material-ui/core"
import { CharacterDataTree } from "./CharacterDataTree"
import { CharacterSelect } from "./CharacterSelect"
import { TimePlayedCumulative, TimePlayedPerLevel } from "./charts"

export function Dashboard() {
  return (
    <Box display="flex" flexDirection="column" flexGrow={1} gridGap={24}>
      <CharacterSelect />
      <TimePlayedCumulative />
      <TimePlayedPerLevel type="bar" />
      <CharacterDataTree />
    </Box>
  )
}
