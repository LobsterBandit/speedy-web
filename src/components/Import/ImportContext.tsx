import {
  Dispatch,
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react"
import { Import, ImportProps } from "./Import"
import { useImport } from "./useImport"

interface ImportContextValue {
  handleClose: () => void
  handleOpen: () => void
  open: boolean
  openOnMount: boolean
  setOpenOnMount: Dispatch<SetStateAction<boolean>>
  Import: typeof Import
  importProps: ImportProps
}

const noop = () => void 0
const nullComp = () => null
const initialValue: ImportContextValue = {
  handleClose: noop,
  handleOpen: noop,
  open: false,
  openOnMount: false,
  setOpenOnMount: noop,
  Import: nullComp,
  importProps: {
    handleClose: noop,
    open: false,
  },
}

const ImportContext = createContext(initialValue)
ImportContext.displayName = "ImportContext"

export function ImportProvider({ children, defaultOpen = false }) {
  const [openOnMount, setOpenOnMount] = useState(defaultOpen)
  const useImportResult = useImport({ openOnMount })

  const value = {
    ...useImportResult,
    setOpenOnMount,
  }

  return (
    <ImportContext.Provider value={value}>
      <Import {...useImportResult.importProps} />
      {children}
    </ImportContext.Provider>
  )
}

export const useImportContext = () => useContext(ImportContext)
