import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import { useHistory } from "react-router-dom";

import { request } from "utils/request";

const StyledAcceptButton = styled.button`
  margin-left: auto;
  display: flex;
  border: none;
  padding: 20px 54px;
  font-size: 24px;
  background: ${theme("colors.mid")};
  color: white;
  cursor: pointer;
  align-self: flex-end;
  margin-top: auto;
  width: fill-available;
  justify-content: center;

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

export const AcceptButton = ({ offerId }) => {
  const [loading, setLoading] = useState();
  const history = useHistory();

  const disabled = loading;

  const handleSubmit = () => {
    setLoading(true);
    const url = `${baseUrl}/offers/accept?offerId=${offerId}`;
    request({ url }).then((result) => {
      history.push(`/thank-you/${offerId}`);
    });
  };

  return (
    <StyledAcceptButton disabled={disabled} onClick={handleSubmit}>
      Godkänn offert
    </StyledAcceptButton>
  );
};
