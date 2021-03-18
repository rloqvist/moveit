import React, { useRef, forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import NumberFormat from "react-number-format";

import { useFormState } from "utils/formState";

import { StyledInputWrapper, StyledError, StyledTag } from "./style";
import { InputComponent } from "./InputComponent";
import { useFocus } from "./useFocus";

const Textable = ({ name, separable, ...props }) => {
  const { elem, focus } = useFocus(name);
  const { update, validate, errors } = useFormState();

  return (
    <StyledInputWrapper {...focus}>
      <InputComponent
        onBlur={() => validate(name)}
        onChange={(value) => update({ name, value })}
        name={name}
        {...props}
      />
      {!!errors[name] && <StyledError>{errors[name]}</StyledError>}
    </StyledInputWrapper>
  );
};

export { Textable };
