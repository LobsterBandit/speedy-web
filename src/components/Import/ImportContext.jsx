import { createContext, useContext, useState } from "react";
import { Import } from "./Import";
import { useImport } from "./useImport";

const noop = () => {};
const initialValue = {
  handleClose: noop,
  handleOpen: noop,
  open: false,
  openOnMount: false,
  setOpenOnMount: noop,
  Import: () => <></>,
  importProps: {
    handleClose: noop,
    handleOpen: noop,
    open: false,
  },
};

const ImportContext = createContext(initialValue);
ImportContext.displayName = "ImportContext";

export function ImportProvider({ children, defaultOpen = false }) {
  const [openOnMount, setOpenOnMount] = useState(defaultOpen);
  const useImportResult = useImport({ openOnMount });

  const value = {
    ...useImportResult,
    setOpenOnMount,
  };

  return (
    <ImportContext.Provider value={value}>
      <Import {...useImportResult.importProps} />
      {children}
    </ImportContext.Provider>
  );
}

export const useImportContext = () => useContext(ImportContext);
