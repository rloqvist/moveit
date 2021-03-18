import { createGlobalStyle } from "styled-components";
import { theme } from "styled-tools";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  * {
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
  }

  h1, h2, h3, button {
    text-transform: none;
    font-family: 'Roboto', sans-serif;
  }

  h1 {
    padding: 0 16px 28px;
    margin: 0;
    color: ${theme("colors.darkest")};
  }

  h2 {
    margin: 0;
    color: ${theme("colors.charcoal")};
  }
`;
