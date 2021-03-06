import React, { useEffect, useState } from "react";

import { useFormState } from "utils/formState";

import { StyledInputWrapper, StyledError, StyledTag } from "./style";
import { InputComponent } from "./InputComponent";
import { useFocus } from "./useFocus";

const Separable = ({ name, separable, ...props }) => {
  const { elem, focus } = useFocus(name);
  const { update, validate, errors } = useFormState();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    update({ name, value: tags });
    // eslint-disable-next-line
  }, [tags.length]);

  const removeTag = (index) => (event) => {
    if (event) event.stopPropagation();
    setTags((tags) => tags.filter((o, i) => i !== index));
  };

  const addTag = (tag) => {
    setTags((tags) => [...tags, tag]);
  };

  const handleKeyDown = (event) => {
    if (event?.key === props.separator) {
      const value = elem.value.replaceAll(props.separator, "");
      if (value) {
        addTag(value);
        elem.value = "";
      }
    } else if (event?.key === "Backspace" && !elem.value && tags.length) {
      removeTag(tags.length - 1)();
    }
  };

  const handleKeyUp = (event) => {
    if (event?.key === props.separator) {
      elem.value = elem.value.replaceAll(props.separator, "");
    }
  };

  const handleBlur = () => {
    const value = elem.value;
    elem.value = "";
    if (value) {
      addTag(value);
    }
    validate(name);
  };

  return (
    <StyledInputWrapper {...focus}>
      {tags.map((tag, index) => {
        return (
          <StyledTag onClick={removeTag(index)} key={`${index}__${tag}`}>
            {tag}
          </StyledTag>
        );
      })}
      <InputComponent onBlur={handleBlur} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} name={name} {...props} />
      {!!errors[name] && <StyledError>{errors[name]}</StyledError>}
    </StyledInputWrapper>
  );
};

Separable.defaultProps = {
  separator: ",",
};

export { Separable };
