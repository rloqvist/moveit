import React, { useRef } from "react";
import styled from "styled-components";
import { theme, ifProp } from "styled-tools";

import { useFormState } from "utils/formState";

import { StyledRadioWrapper, StyledRadioButton, StyledError } from "./style";

const StaticRadio = ({ value, options, name }) => (
  <StyledRadioWrapper>
    {options.map((option, index) => {
      const active = value === option.value;
      return (
        <StyledRadioButton key={`${index}__${option.value}`} id={`${name}__${option.value}`} active={active} static>
          {option.label}
          <div />
        </StyledRadioButton>
      );
    })}
  </StyledRadioWrapper>
);

StaticRadio.defaultProps = {
  options: [
    { value: "yes", label: "Ja" },
    { value: "no", label: "Nej" },
  ],
};

export { StaticRadio };
