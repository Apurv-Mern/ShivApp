import React, { useState, useEffect } from "react";
import "../../scss/Dashboard.css";
import Navbar from "../../components/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { getTotalEthinicWearlists } from "../../redux/reportSlice";
import { ExportToExcel } from "../../Utils/GenerateExcel";

const EthinicWearReport = () => {
  const dispatch = useDispatch();
  const { TotalEthinicWearlist } = useSelector((state) => state.reports);
  const [guestListLoading, setGuestListLoading] = useState(true); // Initialize guestListLoading state

  // ?here enter filename for your excel file
  const fileName = "Ethinic Wear Report";

  const excelData = [
    ["Guest Name", "Group Name", "Mobile_number", "Saree", "Turban", "Dhoti"],
  ];

  useEffect(() => {
    dispatch(getTotalEthinicWearlists());
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
              Welcome to your ethinic wear reporting page. Here you will find a
              selection of reports that you can view and download into excel to
              help you work with your suppliers as well as plan and budget for
              every one of your events.
            </div>
          </div>

          <div className="row gust-box">
            <div className="col-12">
              <ExportToExcel
                apiData={TotalEthinicWearlist}
                fileName={fileName}
                excelData={excelData}
              />
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
                      ) : TotalEthinicWearlist.length > 0 ? ( // Check if guestList has data
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>S. No</th>
                                <th>Guest Name</th>
                                <th>Group Name</th>
                                <th>Mobile Number</th>

                                <th>Saree</th>
                                <th>Turban</th>
                                <th>Dhoti</th>
                              </tr>
                            </thead>
                            <tbody>
                              {TotalEthinicWearlist?.map((guest, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{guest.guest_name}</td>
                                  <td>{guest.group_name}</td>
                                  <td>{guest.mobile_number}</td>
                                  <td>{guest.saree}</td>
                                  <td>{guest.turban}</td>
                                  <td>{guest.dhoti}</td>
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

export default EthinicWearReport;
