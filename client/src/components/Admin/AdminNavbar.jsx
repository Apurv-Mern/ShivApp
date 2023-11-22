import React from "react";
import User from "../../assets/admin1/user.png";
import Invoice from "../../assets/admin1/invoice.png";
import Package from "../../assets/admin1/package.png";
import Quesens from "../../assets/admin1/quesens.png";
import Report from "../../assets/admin1/report.png";
import View from "../../assets/admin1/view.png";
import { Link, Outlet } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <>
      {" "}
      <div className="col-sm-4 col-md-4 col-lg-2"></div>
      <div className="col-sm-4 col-md-4 col-lg-2">
        <div className="admin-box">
          <Link to={"/shiv_app/admin"}>
            <div className="admin-box-img">
              {" "}
              <img className="admin-img-1" src={User} alt="admin" />
            </div>
            <div className="admin-box-title">USER DETAILS </div>
          </Link>
        </div>
      </div>
      <div className="col-sm-12 col-md-4 col-lg-2">
        <div className="admin-box">
          <Link to={"/shiv_app/admin/package_details"}>
            <div className="admin-box-img">
              {" "}
              <img className="admin-img-1" src={Package} alt="admin" />
            </div>
            <div className="admin-box-title">PACKAGE DETAILS</div>
          </Link>
        </div>
      </div>
      <div className="col-sm-12 col-md-4 col-lg-2">
        <div className="admin-box">
          <Link to={"/shiv_app/admin/invoice"}>
            <div className="admin-box-img">
              {" "}
              <img className="admin-img-1" src={Invoice} alt="admin" />
            </div>
            <div className="admin-box-title">INVOICES </div>
          </Link>
        </div>
      </div>
      <div className="col-sm-12 col-md-4 col-lg-2">
        <div className="admin-box">
          <div className="admin-box-img">
            {" "}
            <img className="admin-img-1" src={View} alt="admin" />
          </div>
          <div className="admin-box-title">VIEW</div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminNavbar;
