import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { SignInSchema } from "../schemas";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { getEventUserById } from "../redux/eventSlice";
import logoShiv from "../assets/7.gif";
import GoogleLogins from "../components/GoogleLogins";

import "../scss/Login.css";
import FacebookLogins from "../components/FacebookLogin";
import { Helmet } from "react-helmet-async";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [activeOtp, setActiveOtp] = useState(false);
  const [number, setNumber] = useState();
  const [otp, setotp] = useState();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const res = await dispatch(loginUser(data));
      // console.log({ res });
      if (res.meta.requestStatus === "fulfilled") {
        setLoading(false);
        localStorage.setItem(
          "userName",
          JSON.stringify(res?.payload?.userName)
        );
        toast.success("Login Successfully");
        {
          res?.payload?.isAdmin ? navigate("/admin") : navigate("/dashboard");
        }
      } else {
        toast.error("Login Unsuccessfully");
      }
      const ress = await dispatch(getEventUserById());
      const event_id = ress.payload[1]?.id;
      localStorage.setItem("dashboardId", JSON.stringify(event_id));
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignInSchema,
      onSubmit: (values) => {
        const data = {
          email: values.email,
          password: values.password,
        };
        handleLogin(data);
      },
    });

  const handleOtp = (e) => {
    e.preventDefault();
    // dispatch(otpUserLogin({ number, otp }));
    if (otp == 123456) {
      navigate("/");
      console.log(otp);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleActiveOtp = () => {
    setActiveOtp(!activeOtp);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Login to your SHIV dashboard account and send e-invitations for all your wedding events. View your RSVP details in your dashboard to start planning your wedding ceremonies."
        />
        <link
          rel="canonical"
          href="https://shivappdev.24livehost.com/login"
        ></link>
        <title>
          SHIV Platform Login Page – Asian Wedding Specialist | SHIV
        </title>
      </Helmet>
      <div className="App login-bg">
        <section className="login-section overflow-hidden">
          <div className="row g-0 align-items-center justify-content-center">
            <div className="col-lg-7 position-relative">
              <div className="row justify-content-center align-items-center">
                <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-8 col-sm-10">
                  <div className="login-box text-center">
                    <div className="login-content mb-3">
                      <div className="shivLogo">
                        <a className="home-head" href="/">
                          {" "}
                          <img
                            className="nav-con-1"
                            src={logoShiv}
                            alt="Dashboard"
                          />
                        </a>
                      </div>
                    </div>
                    {/* <FacebookLogins /> */}
                    <GoogleLogins />

                    <div className="or my-3">
                      <p>Please enter your details to sign in.</p>
                    </div>

                    <div className="main-form login-m-1">
                      <form onSubmit={handleSubmit}>
                        {activeOtp ? (
                          <div className="row">
                            <div className="col-12 mb-3">
                              <label>Phone No</label>
                              <input
                                type="number"
                                placeholder="Enter Your Number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label>OTP</label>
                              <input
                                type="number"
                                placeholder="Enter your Otp"
                                value={otp}
                                onChange={(e) => setotp(e.target.value)}
                              />
                            </div>

                            <div className="col-12 mb-3">
                              <button
                                className="btn text-uppercase"
                                onClick={handleOtp}
                              >
                                Submit
                              </button>
                            </div>
                            <div className="col-12">
                              <p className="m-0">
                                Do not have an account?
                                <Link to="/signup"> Sign Up</Link>
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="row">
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
                                <p>{errors.email}</p>
                              ) : null}
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="password">Password</label>
                              <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                // value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                              />
                              {errors.password && touched.password ? (
                                <p>{errors.password}</p>
                              ) : null}
                            </div>
                            <div className="col-12 error-1"> {error} </div>
                            <div className="col-12 mb-3">
                              <button
                                type="submit"
                                className="btn text-uppercase"
                              >
                                Sign in
                              </button>
                            </div>
                            <div className="col-12">
                              <p className="m-0">
                                Do not have an account?
                                <Link to="/signup"> Sign Up</Link>
                              </p>
                              <Link to={"/forgotPassword"}>
                                <button className="forgot-btn">
                                  Forgot password
                                </button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </form>
                    </div>
                    {activeOtp ? (
                      <>
                        <div className="or my-4">
                          <p>or do it via Email</p>
                        </div>
                        <button
                          className="btn text-uppercase btn-sec"
                          onClick={handleActiveOtp}
                        >
                          Login with Email
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="or my-2">
                          <p>or do it via OTP</p>
                        </div>
                        <button
                          className="btn text-uppercase btn-sec btn-login-2"
                          onClick={handleActiveOtp}
                        >
                          Login with OTP
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
