import React, { useState, useEffect } from "react";
import "../../scss/Dashboard.css";
import Navbar from "../../components/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { getFoodListReports } from "../../redux/reportSlice";
import { GeneratePdf } from "../../Utils/GeneratePdf";
import { useRef } from "react";
import { ExportToExcel, ExportToExcelForFood } from "../../Utils/GenerateExcel";

const FoodListReport = () => {
  const dispatch = useDispatch();
  const { getFoodListReport } = useSelector((state) => state.reports);
  const [guestListLoading, setGuestListLoading] = useState(true); // Initialize guestListLoading state

  // ?here enter filename for your excel file
  const fileName = "Food List Report";

  useEffect(() => {
    dispatch(getFoodListReports());
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
              Welcome to your food and drink list reporting page. Here you will
              find a selection of reports that you can view and download into
              excel to help you work with your suppliers as well as plan and
              budget for every one of your events.
            </div>
          </div>

          <div className="row gust-box">
            <div class="col-sm-12">
              <ExportToExcelForFood
                apiData={getFoodListReport}
                fileName={fileName}
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
                      ) : getFoodListReport.length > 0 ? ( // Check if guestList has data
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>S. No</th>
                                <th>Guest Name</th>
                                <th>Mobile Number</th>
                                <th>Food</th>
                                <th>First Preference</th>
                                <th>Second Preference</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getFoodListReport?.map((guest, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{guest.guest_name}</td>
                                  <td>{guest.mobile_number}</td>
                                  <td>{guest.food.join(", ")}</td>
                                  <td>{guest.first_preference}</td>
                                  <td>{guest.second_preference}</td>
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

export default FoodListReport;
