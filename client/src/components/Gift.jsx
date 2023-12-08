import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalFilterCeremony,
  selectCeremonyId,
} from "../redux/dashboardSlice";
import { useEffect } from "react";
import { getAllCeremoniesByEventId } from "../redux/ceremony";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { toast } from "react-toastify";
import eye from "../assets/eye_159078.png";
import { getGuestForGiftsReceived, postGiftsDataa } from "../redux/guestSlice";
import { ExportToExcelForGift } from "../Utils/GenerateExcel";
import { Helmet } from "react-helmet-async";

const Gift = () => {
  const dispatch = useDispatch();
  const guestGifts = useSelector((state) => state.guest.giftGuest);
  const [selectedCeremonies, setSelectedCeremonies] = useState([]);
  const [guestList, setGuestList] = useState([]);
  const [guestListLoading, setGuestListLoading] = useState(false); // Initialize guestListLoading state
  const [giftType, setGiftType] = useState("");
  const [giftNotes, setGiftNotes] = useState("");
  const [guestData, setGuestData] = useState([]);
  const [showText, setShowText] = useState(true);
  const [inputData, setInputData] = useState();

  const handleInputChange = (guestId, field, value) => {
    // Check if the guest exists in the guestData array
    const updatedGuestData = guestData.map((guest) => {
      if (guest.guest_id === guestId) {
        // Update the specific field for the guest
        return { ...guest, [field]: value };
      }
      return guest;
    });

    // If the guest doesn't exist, create a new guest object and add it to the array
    if (!updatedGuestData.some((guest) => guest.guest_id === guestId)) {
      updatedGuestData.push({ guest_id: guestId, [field]: value });
    }

    // Update the state with the modified guest data
    setGuestData(updatedGuestData);
  };

  const handleDataToSend = () => {
    const formattedGuestData = guestGifts.map((guestGift) => {
      // ?Find the corresponding guest data from guestData based on guest_id
      const correspondingGuestData = guestData.find(
        (guestData) => guestData.guest_id === guestGift.guest_id
      );

      // ? Merge the data from guestGift and guestData
      if (correspondingGuestData) {
        return {
          id: guestGift.id,
          user_id: guestGift.user_id,
          guest_id: guestGift.guest_id,
          guest_name: guestGift.guest_name,
          guest_of: guestGift.guest_of,
          email: guestGift.email,
          number: guestGift.number,
          group: guestGift.group,
          gift_received_data: {
            gift_received: correspondingGuestData.gift_received || null,
            gift_type: correspondingGuestData.gift_type || null,
            gift_value: correspondingGuestData.giftType || null,
            notes: correspondingGuestData.giftNotes || null,
          },
        };
      } else {
        // If no corresponding guestData is found, use defaults
        return {
          id: guestGift.id,
          user_id: guestGift.user_id,
          guest_id: guestGift.guest_id,
          guest_name: guestGift.guest_name,
          guest_of: guestGift.guest_of,
          email: guestGift.email,
          number: guestGift.number,
          group: guestGift.group,
          gift_received_data: {
            gift_received: guestGift.gift_received || null,
            gift_type: guestGift.gift_type || null,
            gift_value: guestGift.giftType || null,
            notes: guestGift.giftNotes || null,
          },
        };
      }
    });

    const data = {
      giftData: formattedGuestData,
    };

    dispatch(postGiftsDataa(data))
      .then(() => toast.success("Data Saved"))
      .catch(() => toast.error("Please try again"));

    console.log(data);
  };

  const handleTabClick = async (ceremonyId) => {
    dispatch(selectCeremonyId(ceremonyId));
    setShowText(false);

    try {
      setGuestListLoading(true);
      const response = await dispatch(getGuestForGiftsReceived(ceremonyId));

      if (response?.payload) {
        const guestData = response.payload;
        setGuestList(guestData);

        // Update the guestData state with the received data
        const initialGuestData = guestData.map((guest) => ({
          guest_id: guest.guest_id,
          gift_received:
            guest.gift_received === true
              ? "Yes"
              : guest.gift_received === false
              ? "No"
              : "",
          gift_type: guest.gift_type || "",
          giftType: guest.gift_value || "",
          giftNotes: guest.notes || "",
        }));
        setGuestData(initialGuestData);
        console.log(initialGuestData);

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
      // console.log(res);
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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Log all the Gifts you received from your guests from all your Wedding Ceremonies. Have a clear account of every gift and download into an excel file for ease."
        />
        <link
          rel="canonical"
          href="https://shiv-worldwide.com/guest/gifts"
        ></link>
        <title>
          SHIV Platform Gifts Received – Asian Wedding Specialist |SHIV
        </title>
      </Helmet>
      <div>
        <Navbar />
        <div className="container card-b-1">
          <div className="row">
            <h6 className="col-md-12 welcome-text">
              <h4 className="heading">Gift Received</h4>
              Log all the gifts received from your family and friends in this
              section
              <br></br> <br></br>
              Click on the Ceremony you would like to view the guest attendance
              for and add in the gifts received from your guests.
              <br></br> <br></br>
              Please note that you can add details in the following columns:
              Gift received, Gift type, Gift Value and Notes. Once you have made
              your entries you may export the details for your personal use.
              <br></br> <br></br>
              <div class="refer">
                {" "}
                Please refer to our downloadable Welcome Pack and Guide in the
                Dashboard for further details.{" "}
              </div>
              <br></br>
            </h6>
          </div>

          <div className="row ">
            <div className="col-md-12">
              <div className=" gift-block gift-category">
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
                </Tabs>
                <div className="crl"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 guest-inv">
              Total guests invited to events
            </div>
            <ExportToExcelForGift
              fileName={"Gift Received Excel"}
              apiData={guestList}
            />
            {/* <div className="col-md-12 gift-title">
              {" "}
              <div className="evn-v1">EVENT 1 - WE’RE ENGAGED</div>
            </div> */}
            <div className="col-md-6">
              <div className="evn-totle">
                {" "}
                GUESTS INVITED: {guestGifts.length}{" "}
              </div>
            </div>

            <div className="col-md-12 gift-table">
              <table class="gift-table">
                <thead>
                  <tr>
                    <th width="5%" scope="col">
                      Guest No.
                    </th>
                    <th width="10%" scope="col">
                      Guest Name
                    </th>
                    <th width="8%" scope="col">
                      Guest Of
                    </th>
                    <th width="13%" scope="col">
                      Email
                    </th>
                    <th width="8%" scope="col">
                      Number
                    </th>
                    <th width="8%" scope="col">
                      Group
                    </th>
                    <th width="10%" className="gift-bg" scope="col">
                      Gift Received
                    </th>
                    <th width="15%" className="gift-bg" scope="col">
                      Gift Type
                    </th>
                    <th width="10%" className="gift-bg" scope="col">
                      Gift Value
                    </th>
                    <th width="10%" className="gift-bg" scope="col">
                      Notes
                    </th>
                  </tr>
                </thead>
                {guestListLoading ? (
                  <h5>Loading Guest List</h5>
                ) : guestList.length > 0 ? (
                  guestList?.map((guest, index) => {
                    const uniqueGiftTypeName = `giftType-${index}`;
                    const uniqueGiftNotesName = `giftNotes-${index}`;
                    // console.log(guest);
                    return (
                      <tbody>
                        <tr>
                          <td width="5%">{index + 1}</td>
                          <td width="10%">{guest.guest_name}</td>
                          <td width="8%">Bride</td>
                          <td width="13%">{guest.email}</td>
                          <td width="8%">{guest.number}</td>
                          <td width="8%">{guest.group}</td>
                          <td width="10%" className="gift-bg">
                            <select
                              class="form-select"
                              aria-label="Select"
                              value={
                                guestData.find(
                                  (data) => data.guest_id === guest.guest_id
                                )?.gift_received
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  guest.guest_id,
                                  "gift_received",
                                  e.target.value
                                )
                              }
                            >
                              <option selected>Select Menu</option>
                              <option value={"Yes"}>Yes</option>
                              <option value={"No"}>No </option>
                            </select>
                          </td>
                          <td width="10%" className="gift-bg">
                            <select
                              class="form-select"
                              aria-label="Select"
                              value={
                                guestData.find(
                                  (data) => data.guest_id === guest.guest_id
                                )?.gift_type || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  guest.guest_id,
                                  "gift_type",
                                  e.target.value
                                )
                              }
                            >
                              <option>Select Menu</option>
                              <option value={"CASH"}>CASH</option>
                              <option value={"CHEQUE"}>CHEQUE</option>
                              <option value={"BOXED GIFT - SILVER"}>
                                BOXED GIFT - SILVER
                              </option>
                              <option value={"BOXED GIFT - GOLD"}>
                                BOXED GIFT - GOLD
                              </option>
                              <option value={"VOUCHER"}>VOUCHER</option>
                              <option value={"WEDDING LIST"}>
                                WEDDING LIST
                              </option>
                              <option value={"BOXED GIFT - OTHER"}>
                                BOXED GIFT - OTHER
                              </option>
                            </select>
                          </td>
                          <td width="10%" className="gift-bg">
                            <input
                              type="number"
                              class="form-control gift-control"
                              id={uniqueGiftTypeName}
                              aria-describedby="emailHelp"
                              placeholder="Enter Gift Value"
                              name={uniqueGiftTypeName}
                              value={
                                guestData.find(
                                  (data) => data.guest_id === guest.guest_id
                                )?.giftType || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  guest.guest_id,
                                  "giftType",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td width="10%" className="gift-bg">
                            <input
                              type="Note"
                              class="form-control gift-control"
                              id={uniqueGiftNotesName}
                              aria-describedby="emailHelp"
                              placeholder="Enter Notes"
                              name={uniqueGiftNotesName}
                              value={
                                guestData.find(
                                  (data) => data.guest_id === guest.guest_id
                                )?.giftNotes || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  guest.guest_id,
                                  "giftNotes",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                ) : (
                  <h4 className="not-found"></h4>
                )}
              </table>

              <div className="col-md-12">
                {" "}
                <h4 className="not-found">
                  {showText
                    ? "Click On Ceremonies To Get The Guest List"
                    : guestList
                    ? ""
                    : "No Data Found"}
                </h4>
              </div>

              <div className="col-md-12">
                <button className="btn btn-a1" onClick={handleDataToSend}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gift;
