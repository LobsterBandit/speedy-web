import { useImportContext } from "./ImportContext"
import { TextButton } from "../TextButton"

export function ImportButton({
  children = "Import",
  color = "secondary",
  variant = "contained",
  ...props
} = {}) {
  const { handleOpen } = useImportContext()
  return (
    <TextButton color={color} onClick={handleOpen} variant={variant} {...props}>
      {children}
    </TextButton>
  )
}
