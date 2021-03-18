import React from "react";

import { useFormState } from "utils/formState";

import { StyledInputWrapper, StyledError } from "./style";
import { InputComponent } from "./InputComponent";
import { useFocus } from "./useFocus";

export const Textable = ({ name, ...props }) => {
  const { focus } = useFocus(name);
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
