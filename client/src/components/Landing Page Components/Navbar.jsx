import React from "react";
import { useLocation } from "react-router-dom";
import "../../scss/LandingPage Css/style.css";
import img1 from "../../assets/images/7.gif";
import { NavLink, Link, input } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../scss/Dashboard.css";

const Navbar = () => {
  const location = useLocation(); // Get the current location

  const [activeLink, setActiveLink] = useState(""); // Initialize activeLink state

  useEffect(() => {
    // Update activeLink based on the current URL path
    const path = location.pathname;
    // console.log("path", path);
    setActiveLink(path);
  }, [location.pathname]); // Re-run this effect when the pathname changes

  return (
    <header className="web-header header-new">
      <div className="container nav-panel-w1">
        <div className="container-in">
          <div className="row web-logo-con">
            <div className="col-md-4 top-left-panel"></div>

            <div className="col-md-4 top-logo">
              <a className="home-head" href="/shiv_app">
                {" "}
                <img src={img1} className="logo" alt="icon" />{" "}
              </a>
            </div>

            <div className="col-md-4 top-right-panel">
              <Link className="right-btn" to="/shiv_app/login">
                {" "}
                LOGIN
              </Link>
              <Link className="right-btn" to="/shiv_app/signup">
                REGISTER
              </Link>
              <Link className="right-btn demo-re" to="/shiv_app/contactus">
                DEMO REQUEST
              </Link>
            </div>

            <div className="crl"></div>
          </div>

          <div className="crl"></div>
        </div>

        <div className="crl"></div>
        <div className="row ">
          <div className="nav-panel top-nav">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <div className="navbar-toggler-icon-1"></div>
                  <div className="navbar-toggler-icon-1"></div>
                  <div className="navbar-toggler-icon-1"></div>
                </button>
                <div
                  className=" collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav ms-auto ">
                    <li className="nav-item">
                      <Link
                        aria-current="page"
                        className={
                          activeLink === `/shiv_app`
                            ? "nav-link mx-2 active"
                            : "nav-link mx-2 "
                        }
                        to={"/shiv_app"}
                      >
                        HOME{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          activeLink === `/shiv_app/aboutus`
                            ? "nav-link mx-2 active"
                            : "nav-link mx-2"
                        }
                        to={"/shiv_app/aboutus"}
                      >
                        ABOUT US{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          activeLink === `/shiv_app/packages`
                            ? "nav-link mx-2 active"
                            : "nav-link mx-2"
                        }
                        to={"/shiv_app/packages"}
                      >
                        PACKAGES
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          activeLink === `/shiv_app/invitations%20templates`
                            ? "nav-link mx-2 active"
                            : "nav-link mx-2"
                        }
                        to={"/shiv_app/invitations templates"}
                      >
                        INVITATION DESIGNS
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          activeLink === `/shiv_app/contactus`
                            ? "nav-link mx-2 active"
                            : "nav-link mx-2"
                        }
                        to={"/shiv_app/contactus"}
                      >
                        {" "}
                        CONTACT US
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="crl"></div>
          </div>
        </div>
        <div className="crl"></div>
      </div>
    </header>
  );
};

export default Navbar;
