import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrFacebook } from "react-icons/gr";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authSlice";
import { Field, useFormik } from "formik";
import { SignUpSchema } from "../schemas";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../scss/Login.css";
import logoShiv from "../assets/7.gif";

import img2 from "../assets/images/facebook.png";
import img3 from "../assets/images/insta.png";
import { boolean } from "yup";
import GoogleLogins from "../components/GoogleLogins";

const initialValues = {
  name: "",
  email: "",
  number: "",
  dateOfBirth: null,
  password: "",
  confirm_password: "",
  permission: false,
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { email, number } = useSelector((state) => state.auth);

  const handleSignup = async (data) => {
    setLoading(true);
    try {
      const res = await dispatch(signupUser(data));
      console.log({ res });
      if (res.meta.requestStatus === "fulfilled") {
        setLoading(false);
        toast.success("SignUp Successfully");
        navigate("/shiv_app/dashboard");
      } else {
        toast.error("SignUp Unsuccessfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        email: values.email,
        number: values.number,
        dob: values.dateOfBirth,
        password: values.password,
        permission: values.permission,
      };
      // console.log(data);
      handleSignup(data);
    },
  });

  return (
    <div className="App">
      <section className="login-section overflow-hidden">
        <div className="row g-0 align-items-center justify-content-center">
          <div className="col-lg-7 position-relative">
            <div className="login-box text-center">
              <div className="row justify-content-center align-items-center w-100">
                <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-8 col-sm-10">
                  <div className="login-content mb-3">
                    <div className="shivLogo">
                      <a className="home-head" href="/shiv_app">
                        {" "}
                        <img
                          className="nav-con-1"
                          src={logoShiv}
                          alt="Dashboard"
                        />
                      </a>
                    </div>
                  </div>
                  {/* <GoogleLogins /> */}
                  <div className="crl"></div>
                  <div className="or my-3">
                    <p>Please enter your details to sign up.</p>
                  </div>
                  <div className="main-form login-m-1">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <label htmlFor="name">Name</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter Your Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.name && touched.name ? (
                            <p className="text-danger">{errors.name}</p>
                          ) : null}
                        </div>
                        <div className="col-12 mb-3 dateofbirth">
                          <label htmlFor="dateOfBirth">Date of Birth</label>
                          <DatePicker
                            id="dateOfBirth"
                            name="dateOfBirth"
                            selected={
                              values.dateOfBirth
                                ? parseISO(values.dateOfBirth)
                                : null
                            }
                            onChange={(date) => {
                              const formattedDate = date
                                ? format(date, "yyyy-MM-dd")
                                : null; // Format the date to 'yyyy-MM-dd' format
                              setFieldValue("dateOfBirth", formattedDate);
                            }}
                            dateFormat="dd-MM-yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="Select Date of Birth"
                          />
                          {errors.dateOfBirth && touched.dateOfBirth && (
                            <p className="text-danger">{errors.dateOfBirth}</p>
                          )}
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="phone Number">Phone No</label>
                          <input
                            id="phone Number"
                            name="number"
                            type="text"
                            placeholder="Enter Your Phone Number"
                            value={values.number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.number && touched.number ? (
                            <p className="text-danger">{errors.number}</p>
                          ) : null}
                          {number}
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="email">Email</label>
                          <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="@gmail.com"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && touched.email ? (
                            <p className="text-danger">{errors.email}</p>
                          ) : null}
                          {email}
                        </div>
                        <div className="col-6 mb-3">
                          <label htmlFor="password">Password</label>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password && touched.password ? (
                            <p className="text-danger">{errors.password}</p>
                          ) : null}
                        </div>
                        <div className="col-6 mb-3">
                          <label htmlFor="confirm password">
                            Confirm Password
                          </label>
                          <input
                            id="confirm password"
                            name="confirm_password"
                            type="password"
                            placeholder="Confirm Password"
                            value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.confirm_password &&
                          touched.confirm_password ? (
                            <p className="text-danger">
                              {errors.confirm_password}
                            </p>
                          ) : null}
                        </div>
                        <div className="col-12 mb-3">
                          <button className="btn text-uppercase" type="submit">
                            Sign Up
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="m-0">
                            Do have an account?{" "}
                            <Link to="/shiv_app/login">Sign In</Link>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="permission-form">
                    <input
                      type="checkbox"
                      id="permission"
                      name="permission"
                      checked={values.permission}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="permission">
                      I agree to the terms of use of the SHIV platform
                    </label>
                    {errors.permission && touched.permission && (
                      <p className="text-danger">{errors.permission}</p>
                    )}
                  </div>

                  {/* <div className="or my-4">
                    <p>or do it via OTP</p>
                  </div>
                  <button className="btn text-uppercase btn-sec">
                    Login with OTP
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
