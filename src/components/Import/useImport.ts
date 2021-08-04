import { useCallback, useState } from "react"
import { Import } from "./Import"

interface UseImportOptions {
  openOnMount?: boolean
}

export function useImport({ openOnMount = false }: UseImportOptions = {}) {
  const [open, setOpen] = useState(openOnMount)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const importProps = {
    handleClose,
    open,
  }

  return {
    handleClose,
    handleOpen,
    open,
    openOnMount,
    Import,
    importProps,
  }
}
