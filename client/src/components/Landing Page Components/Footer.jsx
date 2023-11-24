import React from "react";

import img1 from "../../assets/images/shiv-logo-footer.png";

import img2 from "../../assets/facebook_w.png";
import img3 from "../../assets/insta_w.png";
import img4 from "../../assets/printest_w.png";
import tiktok from "../../assets/tiktok_w.png";

import img5 from "../../assets/images/shiv-logo-footer.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {" "}
      <section className="bottom-part">
        <div className="container">
          <div className="new-footer">
            <div className="row">
              <div className="col-md-3 footer-logo-block">
                <Link className="footer-logo3" to={"/shiv_app"}>
                  <img src={img1} className="footer-img" alt="footer-logo" />
                </Link>
              </div>
              <div className="col-md-3">
                <div className="footer-nav">
                  <ul>
                    <li>
                      <Link to={"/shiv_app"}>HOME</Link>
                    </li>
                    <li>
                      <Link to={"/shiv_app/aboutus"}>ABOUT US</Link>
                    </li>
                    <li>
                      <Link to={"/shiv_app/packages"}>PACKAGES</Link>
                    </li>
                    <li>
                      <Link to={"/shiv_app/invitations templates"}>
                        INVITATION DESIGNS
                      </Link>
                    </li>
                    <li>
                      <Link to={"/shiv_app/contactus"}> CONTACT US</Link>
                    </li>
                    <li>
                      <Link to={"/shiv_app/faq"}>FAQ'S</Link>
                    </li>
                    <li>
                      <Link to={"/shiv_app/term&condition"}>TERMS OF USE</Link>
                    </li>
                    <li>
                      <Link to={"/shiv_app/privacy policy"}>
                        PRIVACY POLICY
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 follow-box">
                <h3>FOLLOW US ON</h3>
                <div className="follow-nav">
                  <ul>
                    <li>
                      <Link
                        target="_blank"
                        to="https://www.facebook.com/SHIVWorldwide/"
                      >
                        <img
                          src={img2}
                          className="footer-follow"
                          alt="footer-logo"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        to="https://www.instagram.com/shivworldwide_/"
                      >
                        <img
                          src={img3}
                          className="footer-follow"
                          alt="footer-logo"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        to="https://www.pinterest.co.uk/shivworldwide/"
                      >
                        <img
                          src={img4}
                          className="footer-follow"
                          alt="footer-logo"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link target="_blank" to="https://tiktok.com/@shiv.ww">
                        <img
                          src={tiktok}
                          className="footer-follow"
                          alt="footer-logo"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="add-new1">
                  <span> SHIV WORLDWIDE LIMITED</span> <br /> 3rd Floor,
                  <br /> 46 Albemarle Street, <br />
                  Mayfair,
                  <br /> W1S 4JL
                </div>
              </div>
              <div className="col-md-3 footer-logo-block">
                <Link className="footer-logo3" to="index.html">
                  <img
                    src={img5}
                    className="footer-img footer-im2"
                    alt="footer-logo"
                  />
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 footer-prv">
                &copy; Copyright 2023 | Shiv worldwide limited. All rights
                reserved
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
