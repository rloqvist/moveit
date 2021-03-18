import React from "react";
import styled from "styled-components";
import { theme } from "styled-tools";

import header from "res/img/moveit-header-desktop.png";
import { Textable } from "ui/components/input/Textable";
//import { Searchable } from "ui/components/input/Searchable";
import { Separable } from "ui/components/input/Separable";
import { Radio } from "ui/components/Radio";
import { WrappedFormState } from "utils/formState";
import { schema, initialValues } from "utils/validation";
import { useFormState } from "utils/formState";

const StyledOfferForm = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  img {
    max-width: 100%;
  }

  & > div {
    margin: 0 144px;
  }
`;

const StyledFormSection = styled.div`
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

  & > form:last-child {
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

const SubmitButton = () => {
  const { validateAll, errors } = useFormState();

  const disabled = Object.values(errors).filter(Boolean).length;

  const handleSubmit = () => {
    validateAll();
  };

  return (
    <StyledSubmitButton disabled={disabled} onClick={handleSubmit}>
      Skicka in offertförfrågan
    </StyledSubmitButton>
  );
};

const OfferForm = () => {
  return (
    <WrappedFormState initialValues={initialValues} schema={schema}>
      <StyledOfferForm>
        <img src={header} alt="header" />
        <div>
          <h1>Offertförfrågan för bohagsflytt</h1>
          <StyledFormSection>
            <div>1</div>
            <h2>Kontaktuppgifter</h2>
            <form>
              <div>
                <div>förnamn</div>
                <Textable name="given_name" />
              </div>
              <div>
                <div>efternamn</div>
                <Textable name="family_name" />
              </div>
              <div>
                <div>e-post</div>
                <Textable name="email" />
              </div>
              <div>
                <div>mobilnummer</div>
                <Textable name="phone" mask="phone" />
              </div>
            </form>
          </StyledFormSection>
          <StyledFormSection>
            <div>2</div>
            <h2>Adressuppgifter</h2>
            <form>
              <div>
                <div>från vilken adress ska du flytta?</div>
                <input placeholder="adress, postnummer, stad" />
              </div>
              <div>
                <div>till vilken adress ska du flytta?</div>
                <input placeholder="adress, postnummer, stad" />
              </div>
            </form>
          </StyledFormSection>
          <StyledFormSection>
            <div>3</div>
            <h2>Flyttuppgifter</h2>
            <form>
              <div>
                <div>bostadens yta i kvm</div>
                <Textable name="area" mask="area" />
              </div>
              <div>
                <div>eventuell biyta, vind, förråd etc i kvm</div>
                <Textable name="co_area" mask="area" />
              </div>
              <div>
                <div>eventuella skrymmande saker så som piano etc?</div>
                <Separable name="heavy_objects" />
              </div>
              <div>
                <div>behövs packhjälp?</div>
                <Radio name="packaging_help" />
              </div>
            </form>
          </StyledFormSection>
          <SubmitButton />
        </div>
      </StyledOfferForm>
    </WrappedFormState>
  );
};

export default OfferForm;
