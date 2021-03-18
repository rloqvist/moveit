import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import { useHistory } from "react-router-dom";

import header from "res/img/moveit-header-desktop.png";
import { Textable } from "ui/components/input/Textable";
import { Searchable } from "ui/components/input/Searchable";
import { Separable } from "ui/components/input/Separable";
import { WrappedFormState } from "utils/formState";
import { schema, initialValues } from "utils/validation";
import { useFormState } from "utils/formState";
import { request } from "utils/request";
import { Section } from "ui/components/Section";

const StyledSubmitButton = styled.button`
  margin-left: auto;
  display: flex;
  border: none;
  padding: 20px 54px;
  font-size: 24px;
  background: ${theme("colors.mid")};
  color: white;
  cursor: pointer;

  :focus {
    outline: 4px solid ${theme("colors.light")};
  }

  :disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
`;

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${window.location.host}/.netlify/functions`
    : "http://localhost:3001";

export const SubmitButton = () => {
  const [loading, setLoading] = useState();
  const history = useHistory();
  const { validateAll, errors, values } = useFormState();

  const disabled = Object.values(errors).filter(Boolean).length || loading;

  const handleSubmit = () => {
    setLoading(true);
    validateAll();
    setTimeout(() => {
      if (disabled) return;
      const url = baseUrl + "/offers/create";
      const data = { offer: values };
      request({ url, data, method: "POST" })
        .then((result) => {
          const offerId = result.ref["@ref"].id;
          history.push(`/review/${offerId}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 250);
  };

  return (
    <StyledSubmitButton disabled={disabled} onClick={handleSubmit}>
      Skicka in offertförfrågan
    </StyledSubmitButton>
  );
};
