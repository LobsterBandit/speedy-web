import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../utils";

export function Import({ openOnMount = false, open, handleClose } = {}) {
  const [value, setValue] = useState("");

  const onClose = () => {
    setValue("");
    handleClose();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 300, true),
    []
  );

  useEffect(() => {
    if (value) {
      console.log("Parsing import", value);
    }
  }, [value]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
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
  );
}
