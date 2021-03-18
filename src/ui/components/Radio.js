import React, { useRef } from "react";
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
`;

const StyledRadioButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
  margin: -4px;

  & > div {
    border-radius: 50%;
    width: 14px;
    height: 14px;
    border: 6px solid white;
    background: ${ifProp("active", theme("colors.mid"), "white")};
    margin-left: 16px;
  }

  :focus {
    outline: 2px solid ${theme("colors.mid")};
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
  const ref = useRef();
  const { values, update, errors } = useFormState();

  return (
    <StyledRadioWrapper ref={ref}>
      {options.map(({ value, label }, index) => {
        const active = value === values[name];

        const handleUpdate = () => update({ name, value });

        const handleKeyDown = (event) => [13, 32].includes(event?.keyCode) && handleUpdate();

        return (
          <StyledRadioButton
            key={`${index}__${value}`}
            id={`${name}__${value}`}
            active={active}
            onClick={handleUpdate}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
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
