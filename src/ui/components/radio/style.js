import styled from "styled-components";
import { theme, ifProp } from "styled-tools";

export const StyledRadioWrapper = styled.div`
  margin-top: 16px;
  height: 60px;
  display: flex;
  align-items: center;
  cursor: text;
  position: relative;
`;

export const StyledRadioButton = styled.div`
  display: flex;
  align-items: center;
  cursor: ${ifProp("static", "text", "pointer")};
  padding: 4px;
  margin: -4px;

  & > div {
    border-radius: 50%;
    width: 14px;
    height: 14px;
    border: 6px solid white;
    background: ${ifProp("active", theme("colors.mid"), "white")};
    margin-left: 16px;
  }

  :focus {
    outline: 2px solid ${theme("colors.mid")};
  }

  & + & {
    margin-left: 32px;
  }
`;

export const StyledError = styled.div`
  color: red;
  font-size: 10px;
  font-style: italic;
  position: absolute;
  bottom: -2px;
  z-index: 1;

  ::before {
    content: "*";
    margin-right: 4px;
  }
`;
