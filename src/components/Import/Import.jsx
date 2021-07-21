import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useCallback, useMemo, useState } from "react";

export function Import({ openOnMount = false, open, handleClose } = {}) {
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
          placeholder="Copy data from the Speedy AddOn and paste here"
          rows={15}
          variant="outlined"
        />
      </DialogContent>
    </Dialog>
  );
}
