import React, { useState, useEffect, useRef } from "react";
import "../../scss/Dashboard.css";
import Navbar from "../../components/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { getMehndiLists } from "../../redux/reportSlice";
import { GeneratePdf } from "../../Utils/GeneratePdf";
import { ExportToExcel } from "../../Utils/GenerateExcel";

const MehndiReport = () => {
  const dispatch = useDispatch();
  const { getMehndiList } = useSelector((state) => state.reports);
  const [guestListLoading, setGuestListLoading] = useState(true); // Initialize guestListLoading state

  // ?here enter filename for your excel file
  const fileName = "Mehndi Report";

  const excelData = [
    ["Guest Name", "Mobile_number", "No Of Hands", "Palm Details"],
  ];

  useEffect(() => {
    dispatch(getMehndiLists());
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
              Welcome to your mehndi reporting page. Here you will find a
              selection of reports that you can view and download into excel to
              help you work with your suppliers as well as plan and budget for
              every one of your events.
            </div>
          </div>

          <div className="row gust-box">
            <div class="col-sm-12">
              <ExportToExcel
                apiData={getMehndiList}
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
                      ) : getMehndiList.length > 0 ? ( // Check if guestList has data
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>S. No</th>
                                <th>Guest Name</th>
                                <th>Mobile Number</th>
                                <th>No of hands</th>
                                <th>Palm Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getMehndiList?.map((guest, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{guest.name}</td>
                                  <td>{guest.mobile_no}</td>
                                  <td>{guest.no_of_hands}</td>
                                  <td>{guest.palm_details}</td>
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

export default MehndiReport;
