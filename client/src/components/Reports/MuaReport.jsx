import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../scss/Dashboard.css";
import Navbar from "../../components/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import mehndi2 from "../../assets/mehndi-2.png";
import eye from "../../assets/eye_159078.png";

import { getAllGuestForAUser } from "../../redux/guestSlice";
import {
  getFilterCeremony,
  getTotalPersonalAssistanceCombined,
} from "../../redux/Api";
import { getAllCeremoniesByEventId } from "../../redux/ceremony";
import { selectedDrinksForAUser } from "../../redux/foodSlice";
import {
  getFlightListReports,
  getFoodListReports,
  getPersonalAssistanceCombined,
  getTotalEthinicWearlists,
  getTotalMUALists,
} from "../../redux/reportSlice";

const MuaReport = () => {
  const dispatch = useDispatch();
  const ceremony_id = useSelector((state) => state.userDashboard.ceremony_id);
  const { getTotalMUAList } = useSelector((state) => state.reports);

  const [guestListLoading, setGuestListLoading] = useState(true); // Initialize guestListLoading state

  useEffect(() => {
    dispatch(getTotalMUALists());
    setGuestListLoading(false);
  }, []);

  console.log("TotalEthinicWearlist", getTotalMUAList);

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
              Welcome to your mua reporting page. Here you will find a selection
              of reports that you can view and download into excel to help you
              work with your suppliers as well as plan and budget for every one
              of your events.
            </div>
          </div>

          <div className="row gust-box">
            <div className="col-12">
              <div className="tabs-home">
                <Tabs>
                  <div className="gray-box mt-5  menu-tabing">
                    <div className="gray-box-inv">
                      Attendance{" "}
                      <div className="sky-circle d-inline-block">105</div>
                    </div>
                    <TabPanel>
                      {guestListLoading ? ( // Check if guestList is loading
                        <h5>Loading guest list...</h5> // Display loading message
                      ) : getTotalMUAList.length > 0 ? ( // Check if guestList has data
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>S. No</th>
                                <th>Guest Name</th>
                                <th>Primary Guest</th>
                                <th>Mobile Primary </th>
                                <th>Mobile Number</th>
                                <th>Response</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getTotalMUAList?.map((guest, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{guest.gog_name}</td>
                                  <td>{guest.p_name}</td>
                                  <td>{guest.gog_mob}</td>
                                  <td>{guest.pri_mob_no}</td>
                                  <td>{guest.response}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        // Display "No Data Found" message when guestList is empty
                        <h4 className="not-found">No Data Found</h4>
                      )}
                    </TabPanel>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuaReport;
