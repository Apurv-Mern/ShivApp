import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
// import { client } from "../client";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { sendGoogleLoginData } from "../redux/authSlice";

const GoogleLogins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResponse = async (response) => {
    console.log("token ", response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    const data = {
      name: userObject.name,
      email: userObject.email,
      photo: userObject.picture,
    };

    const res = await dispatch(sendGoogleLoginData(data));
    console.log("res", res);
    const userName = res?.payload?.userName;
    const userId = res?.payload?.userId;

    // Store name and sub (Google ID) in localStorage
    localStorage.setItem("userName", userName);
    localStorage.setItem("user", userId);
    // console.log(data);

    window.location.href = "/dashboard";
    // navigate("/dashboard");
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="">
      <div className="" id="signInDiv"></div>
    </div>
  );
};

export default GoogleLogins;
