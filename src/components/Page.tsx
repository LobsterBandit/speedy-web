import { Box } from "@material-ui/core"
import { Header } from "./Header"

interface PageProps {
  children: React.ReactNode
}

export function Page({ children }: PageProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        flexGrow={99}
        padding={3}
      >
        {children}
      </Box>
    </Box>
  )
}
