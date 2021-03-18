import React from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import { useParams } from "react-router-dom";

const StyledSection = styled.div`
  position: relative;
  margin-bottom: 40px;

  & > div:first-child {
    position: absolute;
    left: -60px;
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: ${theme("colors.mid")};
    font-family: "Roboto", sans-serif;
    font-size: 24px;
  }

  & > h2 {
    background: ${theme("colors.lightest")};
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 20px;
  }

  & > div:last-child {
    display: grid;
    background: ${theme("colors.light")};
    padding-bottom: 32px;

    grid-template-columns: 1fr 1fr;

    @media only screen and (max-width: 1000px) {
      grid-template-columns: 1fr;
    }

    & > div {
      margin: 16px 20px 0;
      display: flex;
      flex-grow: 1;
      flex-direction: column;

      & > div {
        font-size: 14px;
      }

      & > input {
        margin-top: 16px;
        border: none;
        height: 60px;
        padding: 0 16px;

        :focus {
          outline: none;
        }
      }
    }
  }
`;

export const Section = ({ title, index, children }) => {
  return (
    <StyledSection>
      {!!index && <div>{index}</div>}
      <h2>{title}</h2>
      <div>{children}</div>
    </StyledSection>
  );
};
