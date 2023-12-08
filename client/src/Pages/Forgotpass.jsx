import React, { useState } from "react";
import Logo from "../assets/img1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineGoogle } from "react-icons/ai";
import { LiaTwitter } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, otpUserLogin } from "../redux/authSlice";
import { ForgotPasswordSchema, SignInSchema } from "../schemas";
import { useFormik } from "formik";
import forgotPassword, { userForgotPassword } from "../redux/forgotPassword";
import { toast } from "react-toastify";
import logoShiv from "../assets/7.gif";

const initialValues = {
  email: "",
};

const ForgotPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { error, user } = useSelector((state) => state.auth);

  const handleForgotPassword = async (data) => {
    setLoading(true);
    try {
      const res = await dispatch(userForgotPassword(data));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Email sent successfully");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: ForgotPasswordSchema,
      onSubmit: (values) => {
        const data = {
          email: values.email,
        };
        handleForgotPassword(data);
        // navigate("/user/resetPassword");
      },
    });

  return (
    <div className="App">
      <section className="login-section overflow-hidden">
        <div className="row g-0 align-items-center justify-content-center">
          <div className="col-lg-7 position-relative">
            <div className="row justify-content-center align-items-center">
              <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-8 col-sm-10">
                <div className="login-box text-center">
                  <div className="login-content mb-4">
                    <div className="shivLogo">
                      <img
                        className="nav-con-1"
                        src={logoShiv}
                        alt="Dashboard"
                      />
                    </div>
                    <p>Please enter your details to sign in.</p>
                  </div>

                  <div className="main-form login-m-1">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12 mb-4">
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
                        {error}
                        <div className="col-12 mb-3">
                          <button type="submit" className="btn text-uppercase">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPass;
