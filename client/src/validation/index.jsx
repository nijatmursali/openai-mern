import * as yup from "yup";

export const postSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name is too small")
    .max(255, "Name is too big.")
    .required("Name is required"),
  email: yup.string().email().required("Email is required"),
  prompt: yup
    .string()
    .min(8, "Text should be more than 8 characters.")
    .max(255, "Text is too big.")
    .required("Text is required."),
  acceptTerms: yup.bool().oneOf([true], "Accept Terms is required"),
});
