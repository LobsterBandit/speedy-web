import { Box, BoxProps, ButtonProps } from "@material-ui/core"
import { useCharacterStore } from "../stores/character"
import { TextButton } from "./TextButton"

type ResetButtonProps = Pick<ButtonProps, "variant"> & BoxProps

export function ResetButton({ variant, ...props }: ResetButtonProps) {
  const reset = useCharacterStore((state) => state.reset)
  return (
    <Box color="error.main" {...props}>
      <TextButton color="inherit" onClick={reset} variant={variant}>
        Reset Data
      </TextButton>
    </Box>
  )
}
