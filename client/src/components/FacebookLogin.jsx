import React from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

const FacebookLogin = () => {
  return (
    <LoginSocialFacebook
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      onResolve={(response) => console.log(response)}
      onReject={(error) => console.log(error)}
    >
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
};

export default FacebookLogin;
