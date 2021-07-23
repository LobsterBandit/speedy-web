import { Box } from "@material-ui/core"
import { useCharacterStore } from "../stores/character"
import { TextButton } from "./TextButton"

export function ResetButton({ variant, ...props }) {
  const reset = useCharacterStore((state) => state.reset)
  return (
    <Box color="error.main" {...props}>
      <TextButton color="inherit" onClick={reset} variant={variant}>
        Reset Data
      </TextButton>
    </Box>
  )
}
