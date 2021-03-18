import React from "react";
import styled from "styled-components";

const StyledSearchable = styled.div`
  & > input {
    margin-top: 16px;
    border: none;
    height: 60px;
    padding: 0 16px;
    width: fill-available;

    :focus {
      outline: none;
    }
  }
`;

export const Searchable = () => {
  return (
    <StyledSearchable>
      <input />
    </StyledSearchable>
  );
};
