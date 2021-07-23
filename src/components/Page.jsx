import { Box } from "@material-ui/core"
import { Header } from "./Header"

export function Page({ children, header = <Header /> }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {header}
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        flexGrow={99}
        padding={2}
      >
        {children}
      </Box>
    </Box>
  )
}
