import React from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import { useHistory } from "react-router-dom";

import { useFormState } from "utils/formState";
import { request } from "utils/request";

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
  const history = useHistory();
  const { validateAll, errors, values } = useFormState();

  const disabled = Object.values(errors).filter(Boolean).length;

  const handleSubmit = () => {
    if (validateAll()) return;
    setTimeout(() => {
      if (disabled) return;
      const url = baseUrl + "/offers/create";
      const data = { offer: values };
      request({ url, data, method: "POST" }).then((result) => {
        const offerId = result.ref["@ref"].id;
        history.push(`/review/${offerId}`);
      });
    }, 500);
  };

  return (
    <StyledSubmitButton disabled={disabled} onClick={handleSubmit}>
      Skicka in offertförfrågan
    </StyledSubmitButton>
  );
};
