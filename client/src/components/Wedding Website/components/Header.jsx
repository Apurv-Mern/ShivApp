import React from "react";
import { Link } from "react-scroll";
import img1 from "../../../assets/wedding/images/love2.png";
import { useParams } from "react-router-dom";

const Header = () => {
  const { bride, groom } = useParams();
  return (
    <div>
      <header className="web-header">
        <div className="container-fluid nav-panel-w1">
          <div className="container-in row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="web-logo-con">
                <div className="web-logo">
                  <img src={img1} className="d-love" alt="icon" /> {bride} &{" "}
                  {groom}
                  <img src={img1} className="d-love" alt="icon" />
                </div>
              </div>
              <div className="web-date"> Our Wedding Website</div>
            </div>
            <div className="col-md-3">
              <div className="coming-s">Coming Soon</div>
            </div>
            {/* <h1
              style={{
                cursor: "pointer",
                textAlign: "center",
                fontSize: "24px",
                color: "#5ce1e6",
              }}
              onClick={handleNavigate}
            >
              Main site
            </h1> */}

            <div className="crl"></div>
          </div>

          <div className="nav-panel wedding-card-nav">
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
                    <li className="nav-item" style={{ cursor: "pointer" }}>
                      <Link
                        className="nav-link mx-2 active"
                        activeClass="active"
                        aria-current="page"
                        to="home"
                        spy={true}
                        smooth={true}
                        offset={-200}
                        duration={500}
                      >
                        HOME
                      </Link>
                    </li>
                    <li className="nav-item" style={{ cursor: "pointer" }}>
                      <Link
                        className="nav-link mx-2"
                        // activeClass="active"
                        to="calendar"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={500}
                      >
                        WEDDING CALENDAR
                      </Link>
                    </li>
                    <li className="nav-item" style={{ cursor: "pointer" }}>
                      <Link
                        className="nav-link mx-2"
                        activeClass="active"
                        to="our-story"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={500}
                      >
                        OUR STORY
                      </Link>
                    </li>
                    <li className="nav-item" style={{ cursor: "pointer" }}>
                      <Link
                        className="nav-link mx-2"
                        activeClass="active"
                        to="gallery"
                        spy={true}
                        smooth={true}
                        offset={50}
                        duration={500}
                      >
                        PHOTO ALBUM
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="crl"></div>
          </div>
          <div className="crl"></div>
        </div>
      </header>
    </div>
  );
};

export default Header;
