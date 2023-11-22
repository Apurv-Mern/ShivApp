import * as yup from "yup";
import { validateDateOfBirth } from "../Pages/Signup";

export const SignUpSchema = yup.object({
  name: yup.string().min(4).max(50).required("Please Fill name"),
  email: yup.string().email().max(100).required("Please Fill email"),
  number: yup
    .string() // Change type to string to accommodate both 18-digit and formatted phone numbers
    .required("Phone number is required")
    .test("phone", "Invalid phone number", (value) => {
      // Perform custom validation logic
      const phoneRegex = /^(?:\+\d{2}\s?)?\d{10,18}$/; // Updated regex to accommodate both formats

      return phoneRegex.test(value);
    }),
  password: yup.string().min(6).max(50).required("Password required"),
  confirm_password: yup
    .string()
    .min(6)
    .max(50)
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  dateOfBirth: yup
    .date()
    .nullable()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth can't be in the future")
    .test("is-adult", "You must be at least 18 years old", (value) => {
      if (!value) return false; // Return false if the value is not provided
      const currentYear = new Date().getFullYear();
      const birthYear = new Date(value).getFullYear();
      return currentYear - birthYear >= 18;
    }),
  permission: yup
    .boolean()
    .oneOf([true], "Please check this checkbox to signup")
    .required("Please check this checkbox to signup"),
});

export const SignInSchema = yup.object({
  email: yup.string().email().max(100).required("Please Fill email"),
  password: yup.string().min(6).max(50).required("password required"),
});

export const OTPSchema = yup.object({
  otp: yup.string().required("Please enter the OTP"),
  number: yup
    .string()
    .matches(/^\+[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .required("Please enter the phone number"),
});

export const ForgotPasswordSchema = yup.object({
  email: yup.string().email().max(100).required("Please Fill email"),
});

export const ResetPasswordSchema = yup.object({
  password: yup.string().min(6).max(50).required("password required"),
  confirm_password: yup
    .string()
    .min(6)
    .max(50)
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
