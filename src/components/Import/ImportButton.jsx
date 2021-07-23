import { Button, Typography } from "@material-ui/core"
import { useImportContext } from "./ImportContext"

export function ImportButton() {
  const { handleOpen } = useImportContext()
  return (
    <Button color="secondary" onClick={handleOpen} variant="contained">
      <Typography>Import</Typography>
    </Button>
  )
}
