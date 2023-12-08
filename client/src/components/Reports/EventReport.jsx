import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../scss/Dashboard.css";
import Navbar from "../../components/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import mehndi2 from "../../assets/mehndi-2.png";
import eye from "../../assets/eye_159078.png";
import { toast } from "react-toastify";

import {
  getTotalFilterCeremony,
  selectCeremonyId,
} from "../../redux/dashboardSlice";

import { getAllGuestForAUser } from "../../redux/guestSlice";
import { getFilterCeremony } from "../../redux/Api";
import { getAllCeremoniesByEventId } from "../../redux/ceremony";
import { selectedDrinksForAUser } from "../../redux/foodSlice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { GeneratePdf } from "../../Utils/GeneratePdf";
import { ExportToExcelForEvent } from "../../Utils/GenerateExcel";
const EventReport = () => {
  const dispatch = useDispatch();
  const [selectedCeremonies, setSelectedCeremonies] = useState([]);
  const [guestList, setGuestList] = useState([]);
  const [guestListLoading, setGuestListLoading] = useState(true);

  // ?here enter filename for your excel file
  const fileName = "Event_Report";

  const handleTabClick = async (ceremonyId) => {
    dispatch(selectCeremonyId(ceremonyId));
    try {
      setGuestListLoading(true); // *Set guestListLoading state to true before the API call
      const response = await dispatch(getTotalFilterCeremony(ceremonyId));
      const guestData = response?.payload?.Groups || [];
      console.log("guestData", guestData);
      if (guestData) {
        setGuestList(guestData);
        toast.success("Data fetch successfully");
      } else {
        setGuestListLoading(false);
        toast.error("Guest data not found in the response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setGuestListLoading(false);
    }
  };
  useEffect(() => {
    const handleCeremonies = async () => {
      const res = await dispatch(getAllCeremoniesByEventId());
      const selectedCeremonyNames = res.payload
        ?.filter((item) => item.selected === true)
        ?.map((item) => ({
          name: item.ceremony_name,
          id: item.id,
          icon: item.icon_link,
        }));
      setSelectedCeremonies(selectedCeremonyNames);
    };

    handleCeremonies();
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
              Welcome to your event reporting page. Here you will find a
              selection of reports that you can view and download into excel to
              help you work with your suppliers as well as plan and budget for
              every one of your events.
            </div>
          </div>

          <div className="row gust-box">
            <div class="col-sm-12">
              <ExportToExcelForEvent apiData={guestList} fileName={fileName} />
            </div>
            <div className="col-12">
              <div className="tabs-home">
                <Tabs>
                  <TabList>
                    {selectedCeremonies?.map((item) => (
                      <Tab>
                        <div
                          className=""
                          onClick={() => handleTabClick(item.id)}
                        >
                          <img src={item.icon} alt="" />
                          <span>{item.name}</span>
                        </div>
                      </Tab>
                    ))}
                  </TabList>

                  <div
                    className="gray-box mt-3  menu-tabing"
                    // ref={pdfContentRef}
                  >
                    <div className="gray-box-inv">
                      Attendance{" "}
                      <div className="sky-circle d-inline-block">
                        {guestList.length}
                      </div>
                    </div>

                    <TabList>
                      {guestListLoading ? (
                        <h5>Loading guest list...</h5>
                      ) : guestList.length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>S. No</th>
                                <th>Name</th>
                                <th>Group</th>
                                <th>Mobile Number</th>
                                <th>Guest of Guests</th>
                                <th>RSVP Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {guestList?.map((group, index) => {
                                console.log(group);
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    {group.guests.map((item) => (
                                      <td>{item.guest_name}</td>
                                    ))}
                                    <td>{group.groupname}</td>
                                    <td>{/* Add mobile number here */}</td>
                                    {group.guests.map((item) => (
                                      <td>{item.guests_of_guest}</td>
                                    ))}

                                    <td className="text-center">
                                      <img
                                        className="action-icon"
                                        width={20}
                                        src={eye}
                                        alt="ima"
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <h4 className="not-found">No Data Found</h4>
                      )}
                    </TabList>
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

export default EventReport;
