import React, { useState, useEffect } from "react";
import "../../scss/Dashboard.css";
import Navbar from "../../components/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { getPersonalAssistanceCombined } from "../../redux/reportSlice";
import { useRef } from "react";
import { GeneratePdf } from "../../Utils/GeneratePdf";
import { ExportToExcel } from "../../Utils/GenerateExcel";

const PersonalAssistance = () => {
  const dispatch = useDispatch();
  const { getTotalPersonalAssistanceCombined } = useSelector(
    (state) => state.reports
  );
  const [guestListLoading, setGuestListLoading] = useState(true); // Initialize guestListLoading state

  // ?here enter filename for your excel file
  const fileName = "Special Assistance Report";

  const excelData = [
    [
      "Guest Name",
      "Primary Name",
      "Guest Mobile",
      "Primary Mobile",
      "Response",
      "Assistance",
      "Answered By",
    ],
  ];
  useEffect(() => {
    dispatch(getPersonalAssistanceCombined());
    setGuestListLoading(false);
  }, []);
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
              Welcome to your special assistance reporting page. Here you will
              find a selection of reports that you can view and download into
              excel to help you work with your suppliers as well as plan and
              budget for every one of your events.
            </div>
          </div>

          <div className="row gust-box">
            <div className="col-12">
              <ExportToExcel
                apiData={getTotalPersonalAssistanceCombined}
                fileName={fileName}
                excelData={excelData}
              />
              <div className="tabs-home">
                <Tabs>
                  <div className="gray-box mt-5  menu-tabing">
                    <div className="gray-box-inv">Attendance </div>
                    <TabPanel>
                      {guestListLoading ? (
                        <h5>Loading guest list...</h5>
                      ) : getTotalPersonalAssistanceCombined.length > 0 ? (
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
                                <th>Assistance</th>
                                <th>Answered By</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getTotalPersonalAssistanceCombined?.map(
                                (guest, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{guest.gog_name}</td>
                                    <td>{guest.p_name}</td>
                                    <td>{guest.gog_mob}</td>
                                    <td>{guest.pri_mob_no}</td>
                                    <td>{guest.response}</td>
                                    <td>{guest.assistance}</td>
                                    <td>{guest.answered_by}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
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

export default PersonalAssistance;
