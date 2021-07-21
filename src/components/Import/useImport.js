import { useCallback, useState } from "react";
import { Import } from "./Import";

export function useImport({ openOnMount = false } = {}) {
  const [open, setOpen] = useState(openOnMount);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const importProps = {
    handleClose,
    handleOpen,
    open,
    openOnMount,
  };

  return {
    handleClose,
    handleOpen,
    open,
    openOnMount,
    Import,
    importProps,
  };
}
