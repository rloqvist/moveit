import React from "react";
import NumberFormat from "react-number-format";

const noop = () => {};

const InputComponent = ({ mask, onChange = noop, ...props }) => {
  const nfProps = {
    ...props,
    onValueChange: ({ value }) => onChange(value),
    onChange: noop,
  };

  switch (mask) {
    case "area":
      return <NumberFormat {...nfProps} thousandSeparator=" " suffix=" KVM" spellCheck={false} />;
    case "phone":
      return <NumberFormat {...nfProps} allowLeadingZeros={true} format="+46 ### ### ## ##" />;
    default:
      return <input onChange={(e) => onChange(e.target.value)} {...props} />;
  }
};

InputComponent.defaultProps = {
  spellCheck: false,
};

export { InputComponent };
