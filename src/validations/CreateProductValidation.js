import * as yup from "yup";

// function to validate createProduct form using yup

export const schema = yup.object().shape({
  SKU: yup.string().required("You must write the product's SKU"),
  Name: yup.string().required("You must write the product's Name"),
  Price: yup.number().typeError("You must write a valid Price").positive().required("You must write the product's Price"),
  Type: yup.string().required("You must choose the product's Type"),
  Size: yup.number().typeError("You must write a valid Size").positive().required("You must write the DVD's Size").optional(),
  Weight: yup.number().typeError("You must write a valid Weight").positive().required("You must write the book's Weight").optional(),
  Height: yup.number().typeError("You must write a valid Height").positive().required("You must write the furniture's Height").optional(),
  Width: yup.number().typeError("You must write a valid Width").positive().required("You must write the furniture's Width").optional(),
  Length: yup.number().typeError("You must write a valid Length").positive().required("You must write the furniture's Length").optional(),
});
