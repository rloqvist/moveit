import React, { useState, useRef, useEffect } from "react";

import { useFormState } from "utils/formState";

import { StyledInputWrapper, StyledError, StyledTag, StyledOptionsList } from "./style";
import { InputComponent } from "./InputComponent";
import { useFocus } from "./useFocus";

const Searchable = ({ name, labelKey, onSearch, ...props }) => {
  const [timer, setTimer] = useState(null);
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState();
  const { focus, elem } = useFocus(name);
  const { update, validate, errors, values } = useFormState();

  const asyncChange = (value) => {
    clearTimeout(timer);
    if (value.length < 3) return;
    setTimer(
      setTimeout(() => {
        onSearch(value).then(setOptions);
      }, 400),
    );
  };

  const handleFocus = (focused) => () => {
    setTimeout(() => {
      setOpen(focused);
    }, 200);
  };

  useEffect(() => {
    focus.ref.current.addEventListener("focusin", handleFocus(true));
    focus.ref.current.addEventListener("focusout", handleFocus(false));
    return () => {
      focus.ref.current.removeEventListener("focusin", handleFocus(true));
      focus.ref.current.removeEventListener("focusout", handleFocus(false));
    };
  }, []);

  //console.log("active???", document.activeElement, elem, document.activeElement === elem);

  const value = values[name];

  const label = values[name]?.[labelKey];
  console.log("value", value, label);
  //const open = document.activeElement === elem;

  return (
    <StyledInputWrapper {...focus}>
      {label ? (
        <StyledTag onClick={() => update({ name, value: null })}>{label}</StyledTag>
      ) : (
        <InputComponent onBlur={() => validate(name)} onChange={asyncChange} name={name} {...props} />
      )}
      {!!errors[name] && <StyledError>{errors[name]}</StyledError>}
      {open && (
        <StyledOptionsList>
          {options.length ? (
            options.map((option) => {
              return <div onClick={() => update({ name, ...option })}>{option.label}</div>;
            })
          ) : (
            <div>Skriv minst tre tecken för att söka</div>
          )}
        </StyledOptionsList>
      )}
    </StyledInputWrapper>
  );
};

Searchable.defaultProps = {
  labelKey: "formatted",
};

export { Searchable };
