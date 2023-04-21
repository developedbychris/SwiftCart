import * as yup from "yup"

export const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
}

const phoneRegEx =  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

export const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    country: yup.string().required("required"),
    street1: yup.string().required("required"),
    street2: yup.string(),
    city: yup.string().required("required"),
    state: yup.string().required("required"),
    zipCode:  yup.string().required("required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required")
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required")
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required")
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required")
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required")
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required")
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required")
      })
    })
  }),

  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().matches(phoneRegEx, "Phone number is not valid").required("required")
  })

]