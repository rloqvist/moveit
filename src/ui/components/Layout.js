import React from "react";
import styled from "styled-components";

import header from "res/img/moveit-header-desktop.png";

const StyledLayout = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  img {
    max-width: 100%;
  }

  & > div > h1 {
    word-break: break-all;
  }

  @media only screen and (min-width: 640px) {
    & > div {
      margin: 0 144px;
    }
  }

  @media only screen and (max-width: 640px) {
    & > div {
      margin: 0 12px;
    }
  }
`;

export const Layout = ({ title, children }) => {
  return (
    <StyledLayout>
      <img src={header} alt="header" />
      <div>
        <h1>{title}</h1>
        {children}
      </div>
    </StyledLayout>
  );
};
