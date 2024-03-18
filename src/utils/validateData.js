import { isEmailValid, isNameValid } from "./commonFunctions";

export const validateData = (fieldName, value) => {
  switch (fieldName) {
    case "name":
      if (!value) {
        return "Name is required";
      }
      if (!isNameValid(value)) {
        return "Enter valid name";
      }
      break;
    case "email":
      if (!value) {
        return "Email is required";
      }
      if (!isEmailValid(value)) {
        return "Enter valid email";
      }
      break;
    default:
      return "";
  }
  return "";
};
