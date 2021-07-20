import { Box } from "@material-ui/core";
import { Header } from "./Header";

export function Page({ children, contentProps }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header brand="Speedy" />
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        flex="1 0 auto"
        {...contentProps}
      >
        {children}
      </Box>
    </Box>
  );
}
