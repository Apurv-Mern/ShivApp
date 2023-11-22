import React from "react";
import Navbar from "./Navbar";
import report from "../assets/report-icon.png";

const Reports = () => {
  return (
    <div>
      <Navbar />
      <div class="container mid-title">
        <div class="mid-title-left">Reports </div>
        <div class="crl"></div>
      </div>
      <div class="main-container">
        <div class="container bg-w">
          <div class="row">
            <div class="col-sm-12 r-text">
              Welcome to your reporting page. Here you will find a selection of
              reports that you can view and download into excel to help you work
              with your suppliers as well as plan and budget for every one of
              your events.
            </div>
          </div>

          <div class="row report-main-box">
            <div class="col-sm-12 col-md-4 col-lg-3 ">
              <div class="report-box-in">
                <div class="report-text">
                  <a href="/shiv_app/guest/all events attendance report">
                    {" "}
                    All Events Attendance Report{" "}
                  </a>{" "}
                </div>
                <div class="report-icon">
                  <a href="#">
                    {" "}
                    <img className="report-icon-1" src={report} alt="report" />
                  </a>{" "}
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-3 ">
              <div class="report-box-in">
                <div class="report-text">
                  <a href="/shiv_app/guest/all food and drink attendance report">
                    {" "}
                    All Guest Food and Drink Report{" "}
                  </a>{" "}
                </div>
                <div class="report-icon">
                  <a href="#">
                    {" "}
                    <img className="report-icon-1" src={report} alt="report" />
                  </a>{" "}
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-3 ">
              <div class="report-box-in">
                <div class="report-text">
                  <a href="/shiv_app/guest/personal assistance report">
                    {" "}
                    All Special Assistance Report{" "}
                  </a>{" "}
                </div>
                <div class="report-icon">
                  <a href="#">
                    {" "}
                    <img className="report-icon-1" src={report} alt="report" />
                  </a>{" "}
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-3 ">
              <div class="report-box-in">
                <div class="report-text">
                  <a href="/shiv_app/guest/mua report"> All MUA Report </a>{" "}
                </div>
                <div class="report-icon">
                  <a href="#">
                    {" "}
                    <img className="report-icon-1" src={report} alt="report" />
                  </a>{" "}
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-3 ">
              <div class="report-box-in">
                <div class="report-text">
                  <a href="/shiv_app/guest/ethinic wear report">
                    {" "}
                    All Traditional Wear Report{" "}
                  </a>{" "}
                </div>
                <div class="report-icon">
                  <a href="#">
                    {" "}
                    <img className="report-icon-1" src={report} alt="report" />
                  </a>{" "}
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-3 ">
              <div class="report-box-in">
                <div class="report-text">
                  <a href="/shiv_app/guest/flight report">
                    {" "}
                    All Flight report{" "}
                  </a>{" "}
                </div>
                <div class="report-icon">
                  <a href="#">
                    {" "}
                    <img className="report-icon-1" src={report} alt="report" />
                  </a>{" "}
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-3 ">
              <div class="report-box-in">
                <div class="report-text">
                  <a href="/shiv_app/guest/mehndi report">
                    {" "}
                    All Mehndi report{" "}
                  </a>{" "}
                </div>
                <div class="report-icon">
                  <a href="#">
                    {" "}
                    <img className="report-icon-1" src={report} alt="report" />
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
