import * as yup from "yup";
import dayjs from "dayjs";

export const recordSchema = yup.object({
  amount: yup
    .number()
    .min(1, "Amount must be equal to 1 or more")
    .typeError("Amount must be a number")
    .required("Amount is required"),
  category: yup
    .string()
    .min(2, "Category must be at least 2 characters")
    .max(55, "Category can't be longer than 55 characters")
    .required("Category is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description can't be longer than 200 characters")
    .required("Description is required"),
  color: yup
    .string()
    .test("", "Please enter a valid color not white or black", (value) => {
      if(value==="rgb(255, 255, 255)" || value==="rgb(0, 0, 0)"){
        return false
      }else{
        return true
      }
    })
    .required("Color is required"),
  date: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = dayjs(originalValue, "dd.MM.yyyy");
      return result;
    })
    .typeError("please enter a valid date")
    .required()
    .min("1969-11-13", "Date is too early")
})

