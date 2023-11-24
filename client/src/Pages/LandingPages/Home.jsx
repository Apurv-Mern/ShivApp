import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Landing Page Components/Navbar";
import Banner from "../../components/Landing Page Components/Banner";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies, setCookie] = useCookies(["cookieConsent"]);

  // Set expiry to 90 days from now
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 90);
  console.log(expiryDate);

  const giveCookieConsent = () => {
    setCookie("cookieConsent", true, { path: "/", expires: expiryDate });
  };
  const cancelCookieConsent = () => {
    setCookie("cookieConsent", false, { path: "/" });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="SHIV - your personal dashboard for Guest RSVP’s, planning and budgeting for all wedding ceremonies. Asian wedding specialists in all ceremony invitations and RSVP. "
        />
        <link
          rel="canonical"
          href="https://shivappdev.24livehost.com/shiv_app"
        ></link>
        <title>
          Asian Wedding Specialists for Digital Wedding Planning | SHIV
        </title>
      </Helmet>

      <div className="front-page-container">
        <Navbar />
        <Banner />
      </div>

      {!cookies.cookieConsent && (
        <div id="alertCookiePolicy" className="alert-cookie-policy">
          <div className="alert alert-secondary" role="alert">
            <span className="mr-auto">
              This website uses cookies to ensure you get the best experience on
              our website.{" "}
              <a href="#" className="alert-link">
                Learn more
              </a>
            </span>

            <div className="q-btn">
              <button
                id="btnDeclineCookiePolicy"
                className="btn btn-light mr-3 btn-pol"
                type="button"
                onClick={cancelCookieConsent}
              >
                Decline
              </button>
              <button
                id="btnAcceptCookiePolicy "
                className="btn btn-primary btn-pol"
                type="button"
                onClick={giveCookieConsent}
              >
                Accept
              </button>
            </div>
            <div className="crl"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
