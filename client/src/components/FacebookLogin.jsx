import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

const FacebookLogins = () => {
  const [user, setUser] = useState(null);

  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    // handle the response, e.g., send it to your server
    // and update the state in your parent component
    setUser(response);
  };
  console.log("user", user);
  return (
    <FacebookLogin
      appId="2529470443897646"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
};

export default FacebookLogins;
