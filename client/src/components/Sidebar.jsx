import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Dashboard.css";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    // window.location.reload();
    navigate("/login");
  };
  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg top-menu">
        <div className="container-fluid">
          <a class="navbar-brand menu-name" href="#">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/dashboard"}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/myEvents"}>
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Invitations{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/contacts"}>
                  Contacts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Background
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Repots
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Purchases
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Sidebar;
