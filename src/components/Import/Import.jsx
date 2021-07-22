import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core"
import { useCallback, useMemo } from "react"
import { useCharacterStore } from "../../stores/character"
import { debounce, parseAddonExportString } from "../../utils"

export function Import({ open, handleClose } = {}) {
  const setCharacterData = useCharacterStore((state) => state.setCharacterData)

  const handleChange = useCallback(
    (e) => {
      const importString = e.target.value
      if (!importString) {
        return
      }

      parseAddonExportString(importString)
        .then((data) => {
          setCharacterData(data)
          handleClose()
        })
        .catch((error) => console.error(error))
    },
    [handleClose, setCharacterData]
  )

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 300),
    [handleChange]
  )

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="import-dialog-title"
    >
      <DialogTitle id="import-dialog-title">Import Character Data</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          multiline
          onChange={debouncedHandleChange}
          placeholder="Copy data from the Speedy AddOn and paste here"
          rows={15}
          variant="outlined"
        />
      </DialogContent>
    </Dialog>
  )
}
