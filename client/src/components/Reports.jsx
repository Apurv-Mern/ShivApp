import React from "react";
import Navbar from "./Navbar";
import report from "../assets/report-icon.png";
import { Helmet } from "react-helmet-async";

const Reports = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Select and download all RSVP reports with your Guest RSVP details to share with all your suppliers to help you with planning and budgeting for all your Wedding Ceremonies."
        />
        <link
          rel="canonical"
          href="https://shiv-worldwide.com/guest/reports"
        ></link>
        <title>SHIV Dashboard Reports – Asian Wedding Specialist |SHIV</title>
      </Helmet>
      <div>
        <Navbar />
        <div className="container card-b-1">
          <div className="row">
            <h6 className="col-md-12 welcome-text">
              <h4 className="heading">Report</h4>
              Welcome to your reporting page. Here you will find a selection of
              reports that you can view and download into excel to help you work
              with your suppliers as well as plan and budget for every one of
              your events.
              <br></br> <br></br>
              Please refer to our downloadable Welcome Pack and Guide in the
              Dashboard for further details.
              <br></br> <br></br>
            </h6>
          </div>
          <div className="container bg-w">
            <div className="row report-main-box">
              <div className="col-sm-12 col-md-4 col-lg-3 ">
                <div className="report-box-in">
                  <div className="report-text">
                    <a href="/guest/all-events-attendance-report">
                      {" "}
                      All Events Attendance Report{" "}
                    </a>{" "}
                  </div>
                  <div className="report-icon">
                    <a href="#">
                      {" "}
                      <img
                        className="report-icon-1"
                        src={report}
                        alt="report"
                      />
                    </a>{" "}
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-3 ">
                <div className="report-box-in">
                  <div className="report-text">
                    <a href="/guest/all-food-and-drink-attendance-report">
                      {" "}
                      All Guest Food and Drink Report{" "}
                    </a>{" "}
                  </div>
                  <div className="report-icon">
                    <a href="#">
                      {" "}
                      <img
                        className="report-icon-1"
                        src={report}
                        alt="report"
                      />
                    </a>{" "}
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-3 ">
                <div className="report-box-in">
                  <div className="report-text">
                    <a href="/guest/personal-assistance-report">
                      {" "}
                      All Special Assistance Report{" "}
                    </a>{" "}
                  </div>
                  <div className="report-icon">
                    <a href="#">
                      {" "}
                      <img
                        className="report-icon-1"
                        src={report}
                        alt="report"
                      />
                    </a>{" "}
                  </div>
                </div>
              </div>
              {/* <div className="col-sm-12 col-md-4 col-lg-3 ">
              <div className="report-box-in">
                <div className="report-text">
                  <a href="/guest/mua report"> All MUA Report </a>{" "}
                </div>
                <div className="report-icon">
                  <a href="#">
                    {" "}
                    <img className="report-icon-1" src={report} alt="report" />
                  </a>{" "}
                </div>
              </div>
            </div> */}
              <div className="col-sm-12 col-md-4 col-lg-3 ">
                <div className="report-box-in">
                  <div className="report-text">
                    <a href="/guest/guests-styling-report">
                      {" "}
                      Guests Styling request Report{" "}
                    </a>{" "}
                  </div>
                  <div className="report-icon">
                    <a href="#">
                      {" "}
                      <img
                        className="report-icon-1"
                        src={report}
                        alt="report"
                      />
                    </a>{" "}
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-3 ">
                <div className="report-box-in">
                  <div className="report-text">
                    <a href="/guest/travel-report"> All Travel Report </a>{" "}
                  </div>
                  <div className="report-icon">
                    <a href="#">
                      {" "}
                      <img
                        className="report-icon-1"
                        src={report}
                        alt="report"
                      />
                    </a>{" "}
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-3 ">
                <div className="report-box-in">
                  <div className="report-text">
                    <a href="/guest/mehndi-report"> All Mehndi report </a>{" "}
                  </div>
                  <div className="report-icon">
                    <a href="#">
                      {" "}
                      <img
                        className="report-icon-1"
                        src={report}
                        alt="report"
                      />
                    </a>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
