import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { theme, ifProp } from "styled-tools";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/sv";

import { request } from "utils/request";
import { Section } from "ui/components/Section";
import { Layout } from "ui/components/Layout";

dayjs.locale("sv");
dayjs.extend(relativeTime);

const StyledOffer = styled.div`
  background: ${theme("colors.lightest")};

  & > div {
    padding: 16px;

    & > div {
      margin-top: 8px;
    }

    & > div:first-child {
      margin-bottom: 32px;
      font-size: 20px;
    }

    & > div:nth-child(4) {
      font-size: 12px;
      color: ${theme("colors.mid")};
    }

    ${ifProp(
      "accepted",
      css`
        & > div:last-child {
          font-weight: 700;
          color: ${theme("colors.dark")};
        }
      `,
    )}
  }

  button {
    display: flex;
    border: none;
    padding: 16px 0;
    font-size: 18px;
    background: ${theme("colors.mid")};
    color: white;
    cursor: pointer;
    justify-content: center;
    margin-top: auto;

    :focus {
      outline: 4px solid ${theme("colors.light")};
    }
  }
`;

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${window.location.host}/.netlify/functions`
    : "http://localhost:3001";

const Admin = () => {
  const [offers, setOffers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const url = `${baseUrl}/offers/list`;
    request({ url }).then((result) => {
      setOffers(result.offers);
    });
  }, []);

  return (
    <Layout title="Admin">
      <Section title="Här kan du se alla offerter">
        {offers.map((offer, index) => {
          const offerId = offer.ref["@ref"].id;
          return (
            <StyledOffer accepted={offer.data.accepted}>
              <div>
                <div>
                  {offer.data.given_name} {offer.data.family_name}
                </div>
                <div>{offer.data.email}</div>
                <div>{offer.data.phone}</div>
                <div>{dayjs().to(offer.ts / 1000)}</div>
                {offer.data.accepted && <div>Offert accepterad!</div>}
              </div>
              <button onClick={() => history.push(`/review/${offerId}`)}>Granska</button>
            </StyledOffer>
          );
        })}
      </Section>
    </Layout>
  );
};

export default Admin;
