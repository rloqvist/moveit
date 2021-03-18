import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import { useParams } from "react-router-dom";

import header from "res/img/moveit-header-desktop.png";
import { Textable } from "ui/components/input/Textable";
import { Searchable } from "ui/components/input/Searchable";
import { Separable } from "ui/components/input/Separable";
import { WrappedFormState } from "utils/formState";
import { schema, initialValues } from "utils/validation";
import { useFormState } from "utils/formState";
import { request } from "utils/request";
import { Section } from "ui/components/Section";

const StyledLayout = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  img {
    max-width: 100%;
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
