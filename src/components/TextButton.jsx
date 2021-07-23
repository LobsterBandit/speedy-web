import { Button, Typography } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"

const TextButtonBase = styled(Button)({
  textTransform: "none",
})

export function TextButton({ children, typographyProps, ...props }) {
  return (
    <TextButtonBase {...props}>
      <Typography {...typographyProps}>{children}</Typography>
    </TextButtonBase>
  )
}
