import React, { useRef } from "react";
import styled from "styled-components";
import { theme, ifProp } from "styled-tools";

import { useFormState } from "utils/formState";

import { StyledRadioWrapper, StyledRadioButton, StyledError } from "./style";

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
