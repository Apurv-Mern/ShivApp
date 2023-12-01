import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ResetPasswordSchema } from "../schemas";
import logoShiv from "../assets/7.gif";
import { useFormik } from "formik";
import {
  setResetPasswordToken,
  userResetPassword,
} from "../redux/forgotPassword";

const initialValues = {
  password: "",
  confirm_password: "",
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  //   console.log(token);
  const [loading, setLoading] = useState(true);

  const { error, user } = useSelector((state) => state.auth);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: ResetPasswordSchema,
      onSubmit: (values) => {
        const data = {
          token,
          password: values.password,
        };
        dispatch(userResetPassword(data));
        navigate("/login");
      },
    });

  useEffect(() => {
    dispatch(setResetPasswordToken(token));
  }, [token]);
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
                            <p>{errors.password}</p>
                          ) : null}
                        </div>
                        <div className="col-12 mb-4">
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
                            <p>{errors.confirm_password}</p>
                          ) : null}
                        </div>
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

export default ResetPassword;
