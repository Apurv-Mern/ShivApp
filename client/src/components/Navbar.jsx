import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import user from "../assets/adminLogo.jpg";
import logo from "../assets/7.gif";
import Header from "./Header";
import {
  getUploadProfiles,
  logout,
  uploadProfilePicture,
} from "../redux/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setPhoto] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const userName = localStorage.getItem("userName");
  const profile = useSelector((state) => state.auth.profile);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/shiv_app");
    window.location.reload();
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profilePhoto", new Blob([selectedFile]));
      try {
        const res = await dispatch(uploadProfilePicture(formData));
        setPhoto(res?.payload?.photoURL);
        toast.success("Image Upload successfully");
      } catch (error) {
        toast.error("Failed to upload image");
        console.error("Error uploading image:", error);
      }
    }
    setPopupOpen(false);
  };

  useEffect(() => {
    dispatch(getUploadProfiles());
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="row top-menu-row">
          <div className="col-md-4 col-sm-12"></div>
          <div className="col-md-4 col-sm-12">
            <div className="logo admin-logo">
              <Link to={"/shiv_app/dashboard"}>
                <img src={logo} alt="Sunset in the mountains" />
              </Link>
            </div>
          </div>

          <div className="col-md-4 col-sm-12">
            <div className="right-user">
              <div className="right-user-3" onClick={togglePopup}>
                <img
                  src={profile.photoURL || photo}
                  className="rounded-circle profile-img"
                  height="30px"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
                <div className="userName-btn">{userName.replace(/"/g, "")}</div>
              </div>

              <div className="logput-btn">
                <a onClick={handleLogout}> Logout </a>
              </div>
            </div>
            {isPopupOpen && (
              <div className="popup">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleSubmit}>Save</button>
              </div>
            )}
          </div>
          <div className="crl"></div>
        </div>
        <div className="top-nav-bar">
          {" "}
          <Header />
        </div>
        <div className="crl"></div>
      </div>
      <div className="crl"></div>
    </header>
  );
};

export default Navbar;
