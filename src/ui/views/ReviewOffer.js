import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import { useParams } from "react-router-dom";

import header from "res/img/moveit-header-desktop.png";
import { Textable } from "ui/components/input/Textable";
import { Searchable } from "ui/components/input/Searchable";
import { Separable } from "ui/components/input/Separable";
import { StaticRadio } from "ui/components/radio/StaticRadio";
import { WrappedFormState } from "utils/formState";
import { schema, initialValues } from "utils/validation";
import { useFormState } from "utils/formState";
import { request } from "utils/request";
import { Section } from "ui/components/Section";
import { Layout } from "ui/components/Layout";
import { calcTotal } from "utils/calculate";
import { spaceSeparate } from "utils/format";
import { AcceptButton } from "ui/components/AcceptButton";

const StyledStaticField = styled.div`
  & > div:last-child {
    margin-top: 16px;
    height: 60px;
    background: ${theme("colors.lightest")};
    padding: 0 16px;
    display: flex;
    align-items: center;
    cursor: text;
    position: relative;
  }
`;

const StyledSummary = styled.div`
  h2 {
    margin-top: 16px;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
  }

  a {
    color: ${theme("colors.mid")};
  }
`;

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${window.location.host}/.netlify/functions`
    : "http://localhost:3001";

const ReviewOffer = () => {
  const [offer, setOffer] = useState();
  const { offerId } = useParams();

  useEffect(() => {
    const url = `${baseUrl}/offers/view?offerId=${offerId}`;
    request({ url }).then((result) => {
      setOffer(result.offer);
    });
  }, []);

  return offer ? (
    <Layout title={`Offertförslag ${offerId} för bohagsflytt`}>
      <Section title="Kontaktuppgifter">
        <StyledStaticField>
          <div>förnamn</div>
          <div>{offer?.given_name}</div>
        </StyledStaticField>
        <StyledStaticField>
          <div>efternamn</div>
          <div>{offer?.family_name}</div>
        </StyledStaticField>
        <StyledStaticField>
          <div>e-post</div>
          <div>{offer?.email}</div>
        </StyledStaticField>
        <StyledStaticField>
          <div>mobilnummer</div>
          <div>{offer?.phone}</div>
        </StyledStaticField>
      </Section>
      <Section title="Adressuppgifter">
        <StyledStaticField>
          <div>från vilken adress ska du flytta?</div>
          <div>{offer?.move_from?.formatted}</div>
        </StyledStaticField>
        <StyledStaticField>
          <div>till vilken adress ska du flytta?</div>
          <div>{offer?.move_to?.formatted}</div>
        </StyledStaticField>
      </Section>
      <Section title="Flyttuppgifter">
        <StyledStaticField>
          <div>bostadens yta i kvm</div>
          <div>{offer?.area} KVM</div>
        </StyledStaticField>
        <StyledStaticField>
          <div>eventuell biyta, vind, förråd etc i kvm</div>
          <div>{offer?.co_area || 0} KVM</div>
        </StyledStaticField>
        <StyledStaticField>
          <div>eventuella skrymmande saker så som piano etc?</div>
          <div>{offer?.heavy_objects.length ? offer?.heavy_objects.join(", ") : "nej"}</div>
        </StyledStaticField>
        <div>
          <div>behövs packhjälp?</div>
          <StaticRadio value={offer?.packaging_help} />
        </div>
      </Section>
      <Section title="Prisuppgifter">
        <StyledSummary>
          <h2>Uppskattat pris: {spaceSeparate(calcTotal(offer).fee)} kr inkl moms</h2>
          <h2>Totalt avstånd mellan bostäder: {spaceSeparate(calcTotal(offer).distance)} km</h2>
          <p>
            Offerten gäller i 90 dagar utifrån vårt svar till dig. Vid frågor kontakta{" "}
            <a href="mailto:#">flytt@move-it.se</a>
          </p>
          <p>
            För att se offerten igen klicka här <a href={`/review/${offerId}`}>{window.location.href}</a>
          </p>
        </StyledSummary>
        <div>
          <AcceptButton offerId={offerId} />
        </div>
      </Section>
    </Layout>
  ) : null;
};

export default ReviewOffer;
