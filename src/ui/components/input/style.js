import styled from "styled-components";
import { theme } from "styled-tools";

export const StyledInputWrapper = styled.div`
  margin-top: 16px;
  height: 60px;
  background: white;
  padding: 0 16px;
  display: flex;
  align-items: center;
  cursor: text;
  position: relative;

  & > input {
    border: none;
    width: fill-available;

    :focus {
      outline: none;
    }
  }
`;

export const StyledError = styled.div`
  color: red;
  font-size: 10px;
  font-style: italic;
  position: absolute;
  bottom: 2px;
  z-index: 1;

  ::before {
    content: "*";
    margin-right: 4px;
  }
`;

export const StyledTag = styled.span`
  background: ${theme("colors.light")};
  font-size: 12px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 2px 4px;
  line-height: 1.2;
  margin-right: 4px;
  cursor: pointer;
  user-select: none;

  ::before {
    content: "×";
    color: ${theme("colors.dark")};
    margin-right: 4px;
    font-size: 14px;
  }
`;

export const StyledOptionsList = styled.div`
  position: absolute;
  background: ${theme("colors.base")};
  top: 60px;
  left: 0;
  right: 0;
  z-index: 99;
  background: white;

  & > div {
    padding: 16px;
    cursor: pointer;

    :hover {
      background: rgba(0, 0, 0, 0.04);
    }
  }

  & > div + div {
    border-top: 1px solid #e0e0e0;
  }
`;
