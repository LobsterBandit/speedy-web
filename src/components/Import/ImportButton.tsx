import { ButtonProps } from "@material-ui/core"
import { useImportContext } from "./ImportContext"
import { TextButton } from "../TextButton"

type ImportButtonProps = Pick<ButtonProps, "children" | "color" | "variant"> &
  ButtonProps

export function ImportButton({
  children = "Import",
  color = "secondary",
  variant = "contained",
  ...props
}: ImportButtonProps) {
  const { handleOpen } = useImportContext()
  return (
    <TextButton color={color} onClick={handleOpen} variant={variant} {...props}>
      {children}
    </TextButton>
  )
}
