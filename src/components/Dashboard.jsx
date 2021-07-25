import { Box } from "@material-ui/core"
import { CharacterDataTable } from "./CharacterDataTable"
import { CharacterSelect } from "./CharacterSelect"
import { TimePlayedCumulative, TimePlayedPerLevel } from "./charts"

export function Dashboard() {
  return (
    <Box display="flex" flexDirection="column" flexGrow={1} gridGap={24}>
      <CharacterSelect />
      <TimePlayedCumulative />
      <TimePlayedPerLevel type="bar" />
      <Box flexGrow={1}>
        <CharacterDataTable />
      </Box>
    </Box>
  )
}
