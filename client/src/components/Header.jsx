import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

import des1 from "../assets/des1.png";
import des2 from "../assets/des2.png";
import des3 from "../assets/des3.png";
import des4 from "../assets/des4.png";
import des5 from "../assets/des5.png";
import des6 from "../assets/des6.png";
import des7 from "../assets/des7.png";
import des8 from "../assets/des8.png";
import admin from "../assets/admin.png";
import "../scss/Dashboard.css";
import gift from "../assets/gift-menu.png";
import des9 from "../assets/purchase.png";
import des10 from "../assets/rsvp.png";
import Coming from "../assets/coming.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/shiv_app");
    window.location.reload();
  };

  const handleRedirect = () => {
    // * FOR OPEN IN NEW TAB
    window.open("https://shivappdev.24livehost.com/shiv_app/wedding_website");
  };

  return (
    <nav className="navbar navbar-expand-lg top-menu top-menu-admin">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          {" "}
          Menu
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="crl"></div>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto text-center icon-nav">
            {/* <li className="nav-item">
              <NavLink
                activeClassName="nav-link active"
                className="nav-link"
                to={"/shiv_app/admin"}
              >
                <img className="nav-con-1" src={admin} alt="Dashboard" />
                <div className="link-text">Admin</div>
              </NavLink>
            </li> */}

            <li className="nav-item">
              <NavLink
                activeClassName="nav-link active"
                className="nav-link"
                to={"/shiv_app/dashboard"}
              >
                <img className="nav-con-1" src={des1} alt="Dashboard" />
                <div className="link-text">Dashboard</div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link active"
                className="nav-link"
                to={"/shiv_app/myEvents"}
              >
                <img className="nav-con-1" src={des5} alt="Dashboard" />
                <div className="link-text">Events</div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link active"
                className="nav-link"
                to={"/shiv_app/contacts"}
              >
                <img className="nav-con-1" src={des2} alt="Dashboard" />
                <div className="link-text">Contacts</div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link active"
                className="nav-link"
                to={"/shiv_app/add/group/ceremonies"}
              >
                <img className="nav-con-1" src={des4} alt="Dashboard" />
                <div className="link-text">Invitations</div>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                activeClassName="nav-link active"
                className="nav-link"
                to={"/shiv_app/guest/template"}
              >
                <img className="nav-con-1" src={des3} alt="Dashboard" />
                <div className="link-text">Design</div>
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={handleRedirect}>
                <img className="nav-con-1" src={Coming} alt="Dashboard" />
                <div className="link-text">Wedding Website</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/shiv_app/guest/reports"}>
                <img className="nav-con-1" src={des7} alt="Dashboard" />
                <div className="link-text"> Reports</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/shiv_app/package/purchase"}>
                <img className="nav-con-1" src={des9} alt="Dashboard" />
                <div className="link-text">Purchases</div>
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                target="__blank"
                href={"https://shivappdev.24livehost.com/shiv_app/new"}
              >
                <img className="nav-con-1" src={des10} alt="Dashboard" />
                <div className="link-text">RSVP</div>
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={"/shiv_app/guest/gifts"}>
                <img className="nav-con-1" src={gift} alt="Dashboard" />
                <div className="link-text">Gift Received</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
