import * as yup from "yup";

const required = "Fältet kan inte lämnas tomt";
const email = "Fältet matchar inte en e-postadress";
const phone = "Ex. +46 12 345 67 89";

const shape = {
  given_name: yup.string().required(required),
  family_name: yup.string().required(required),
  email: yup.string().email(email).required(required),
  phone: yup
    .string()
    .transform((value) => (value !== null ? value.replace(/ /g, "") : value))
    .min(8, phone)
    .max(14, phone)
    .required(required),
  move_from: yup.object().nullable().required(required),
  move_to: yup.object().nullable().required(required),
  area: yup.string().required(required),
  co_area: yup.string(),
  heavy_objects: yup.array().of(yup.string()),
  packaging_help: yup
    .string()
    .matches(/(yes|no)/, required)
    .required(required),
};

export const initialValues = Object.keys(shape).reduce((acc, curr) => ({ ...acc, [curr]: "" }), {});
export const schema = yup.object().shape(shape);
