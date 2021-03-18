import React, { useRef, forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import NumberFormat from "react-number-format";

export const useFocus = (name) => {
  const [elem, setElem] = useState();
  const ref = useRef();

  useEffect(() => {
    setElem(ref.current.querySelector(`input[name="${name}"]`));
  }, []);

  return { elem, focus: { ref, onClick: () => elem.focus() } };
};
