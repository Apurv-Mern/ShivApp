import React, { useState, useEffect } from "react";
import "../../scss/Dashboard.css";
import Navbar from "../../components/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { getFlightListReports } from "../../redux/reportSlice";
import { GeneratePdf } from "../../Utils/GeneratePdf";
import { useRef } from "react";
import { ExportToExcel } from "../../Utils/GenerateExcel";

const FlightReport = () => {
  const dispatch = useDispatch();
  const { getFlightListReport } = useSelector((state) => state.reports);
  const [guestListLoading, setGuestListLoading] = useState(true); // Initialize guestListLoading state

  // ?here enter filename for your excel file
  const fileName = "Flight Report";

  const excelData = [
    [
      "Guest Name",
      "Guest Mob",
      "Guest Email",
      "Flight Arrival Date",
      "Flight Departure Date",
      "Couple Hotel Stay",
      "How Many Room Required",
      "Self Hotel Stay",
    ],
  ];

  useEffect(() => {
    dispatch(getFlightListReports());
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
              Welcome to your travel reporting page. Here you will find a
              selection of reports that you can view and download into excel to
              help you work with your suppliers as well as plan and budget for
              every one of your events.
            </div>
          </div>

          <div className="row gust-box">
            <div class="col-sm-12">
              <ExportToExcel
                apiData={getFlightListReport}
                fileName={fileName}
                excelData={excelData}
              />
            </div>
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
                      ) : getFlightListReport.length > 0 ? ( // Check if guestList has data
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>S. No</th>
                                <th>Guest Name</th>
                                <th>Mobile Number</th>
                                <th>Email</th>
                                <th>Arrival</th>
                                <th>Departure</th>
                                <th>Hotel Stay</th>
                                <th>Room Req</th>
                                <th>self Hotel</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getFlightListReport?.map((guest, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{guest.guest_name}</td>
                                  <td>{guest.guest_mob}</td>
                                  <td>{guest.guest_email}</td>
                                  <td>{guest.flight_arrival_date}</td>
                                  <td>{guest.flight_departure_date}</td>
                                  <td>{guest.couple_hotel_stay}</td>
                                  <td>{guest.how_many_room_required}</td>
                                  <td>{guest.self_hotel_stay}</td>
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

export default FlightReport;
