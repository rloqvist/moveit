import { useRef, useEffect, useState } from "react";

export const useFocus = (name) => {
  const [elem, setElem] = useState();
  const ref = useRef();

  useEffect(() => {
    setElem(ref.current.querySelector(`input[name="${name}"]`));
    // eslint-disable-next-line
  }, []);

  return { elem, focus: { ref, onClick: () => elem?.focus() } };
};
