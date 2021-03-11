import React from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "./GlobalStyle";
import { theme } from "./theme";

export const ThemeWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
