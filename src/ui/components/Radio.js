import React, { useRef, forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { theme, ifProp } from "styled-tools";

import { useFormState } from "utils/formState";

const StyledRadioWrapper = styled.div`
  margin-top: 16px;
  height: 60px;
  display: flex;
  align-items: center;
  cursor: text;
  position: relative;

  & > input {
    border: none;
    width: fill-available;

    :focus {
      outline: none;
    }
  }
`;

const StyledRadioButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & > div {
    border-radius: 50%;
    width: 14px;
    height: 14px;
    border: 6px solid white;
    background: ${ifProp("active", theme("colors.mid"), "white")};
    margin-left: 16px;
  }

  & + & {
    margin-left: 32px;
  }
`;

const StyledError = styled.div`
  color: red;
  font-size: 10px;
  font-style: italic;
  position: absolute;
  bottom: -2px;
  z-index: 1;

  ::before {
    content: "*";
    margin-right: 4px;
  }
`;

const Radio = ({ options, name }) => {
  const { values, update, validate, errors } = useFormState();

  return (
    <StyledRadioWrapper>
      {options.map(({ value, label }, index) => {
        const active = value === values[name];
        return (
          <StyledRadioButton key={`${index}__${value}`} active={active} onClick={() => update({ name, value })}>
            {label}
            <div />
          </StyledRadioButton>
        );
      })}
      {!!errors[name] && <StyledError>{errors[name]}</StyledError>}
    </StyledRadioWrapper>
  );
};

Radio.defaultProps = {
  options: [
    { value: "yes", label: "Ja" },
    { value: "no", label: "Nej" },
  ],
};

export { Radio };
