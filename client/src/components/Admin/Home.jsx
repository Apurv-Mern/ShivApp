import React from "react";
import Navbar from "../Navbar";
import AdminNavbar from "./AdminNavbar";
import "../../scss/AdminPanel/style.css";
import { useSelector } from "react-redux";
import Header from "./Header";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.user);
  return (
    <div className="admin-block">
      <Header />
      <div class="container admin-inner">
        <div className="row">
          <AdminNavbar />
        </div>
      </div>
    </div>
  );
};

export default Home;
