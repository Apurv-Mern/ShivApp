import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import user from "../../assets/adminLogo.jpg";
import logo from "../../assets/7.gif";
import { logout } from "../../redux/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  const userName = localStorage.getItem("userName");

  return (
    <header className="header">
      <div className="container">
        <div className="row top-menu-row">
          <div className="col-md-4 col-sm-12"></div>
          <div className="col-md-4 col-sm-12">
            <div className="logo admin-logo">
              <Link to={"/dashboard"}>
                <img src={logo} alt="Sunset in the mountains" />
              </Link>
            </div>
          </div>

          <div className="col-md-4 col-sm-12 user-a5">
            <div className="right-user">
              <div className="right-user-in">
                <a
                  className="right-user-3"
                  href="#"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user}
                    className="rounded-circle profile-img"
                    height="30px"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  />
                  <div className="userName-btn">
                    {userName.replace(/"/g, "")}
                  </div>
                </a>
              </div>
              <div className="logput-btn">
                <a onClick={handleLogout}> Logout </a>
              </div>
            </div>
          </div>
          <div className="crl"></div>
        </div>
        <div className="top-nav-bar"></div>
        <div className="crl"></div>
      </div>
      <div className="crl"></div>
    </header>
  );
};

export default Header;
