import { useState, createContext, useContext } from "react";
import * as yup from "yup";

const FormState = createContext();
const useFormState = () => useContext(FormState);

const WrappedFormState = ({ initialValues, schema, children }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const update = ({ name, value }) => {
    console.log("updating", name, value);
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      validate(name, value);
    }
  };

  const validate = (name, value) => {
    try {
      yup.reach(schema, name).validateSync(value || values[name]);
      setErrors((errors) => ({ ...errors, [name]: undefined }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const message = error.params?.label || error.message;
        setErrors((errors) => ({ ...errors, [name]: message }));
      }
    }
  };

  const validateAll = () => {
    let messages = {};
    Object.entries(values).forEach(([name, value]) => {
      try {
        yup.reach(schema, name).validateSync(value);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          messages[name] = error.params?.label || error.message;
        }
      }
    });
    setErrors(messages);
    return Object.values(messages).filter(Boolean).length;
  };

  const formState = { values, errors, update, validate, validateAll };
  return <FormState.Provider value={formState} children={children} />;
};

export { useFormState, WrappedFormState };
