import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import EventIcon1 from "../assets/icon/event.png";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";
import {
  createUserCeremony,
  getAllCeremoniesByEventId,
  updateCeremonyNames,
} from "../redux/ceremony";
import "../scss/Dashboard.css";
import { getPaymentStatus } from "../redux/paymentSlice";

const EventsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const event_id = useSelector((state) => state.event.event_id);
  const event_id = JSON.parse(localStorage.getItem("eventId"));
  const eventName = useSelector((state) => state.event.eventState);
  const getAllCeremonies = useSelector(
    (state) => state.ceremony.getAllCeremonies
  );
  const paymentStatus = useSelector((state) => state.payment.paymentStatus);
  // Inside the useEffect that fetches and updates ceremonyData
  const [ceremonyDates, setCeremonyDates] = useState([]);
  const [ceremonyVenues, setCeremonyVenues] = useState([]);
  const [selectedCeremonies, setSelectedCeremonies] = useState([]);

  const [editMode, setEditMode] = useState(false); // Edit mode for ceremony names
  const [editedCeremonyNames, setEditedCeremonyNames] = useState([]);
  const toggleEditMode = () => {
    setEditMode(!editMode);
    // console.log("hello");
  };

  const handleEditCeremonyName = (index, newName) => {
    // Update the edited name in the state
    const updatedNames = [...editedCeremonyNames];
    // console.log("update", updatedNames);
    updatedNames[index] = newName;
    setEditedCeremonyNames(updatedNames);
  };

  const handleSaveCeremonyNames = async () => {
    // Create an array of ceremonies in the desired format
    const updatedCeremonies = selectedCeremonies.map((ceremony, index) => ({
      ceremony_name: editedCeremonyNames[index] || ceremony.ceremony_name,
      ceremony_id: ceremony.id,
    }));

    // Update the state with the edited names and exit edit mode
    setSelectedCeremonies(updatedCeremonies);
    toggleEditMode();

    // Create a copy of getAllCeremonies with the modified names
    const updatedAllCeremonies = getAllCeremonies.map((ceremony, index) => ({
      ...ceremony,
      ceremony_name: updatedCeremonies[index].ceremony_name,
    }));

    // Update the Redux state for getAllCeremonies
    // You may need to dispatch an action to update the Redux state here
    // dispatch(updateAllCeremonies(updatedAllCeremonies)); // Example dispatch action

    // Prepare the data to send to the API
    const dataToSend = {
      ceremonies: updatedCeremonies,
      event_id,
    };

    console.log(dataToSend);
    // Send the data to your API using fetch or your preferred method
    dispatch(updateCeremonyNames(dataToSend));
    // Update the state with the edited names and exit edit mode
    setSelectedCeremonies(selectedCeremonies);
    toggleEditMode();
  };

  // Function to update the selected date for a specific ceremony
  const handleDateChange = (index, date) => {
    const updatedCeremonyDates = [...ceremonyDates];
    updatedCeremonyDates[index] = date;
    setCeremonyDates(updatedCeremonyDates);
  };

  const handleVenueChange = (index, venue) => {
    const updatedCeremonyVenues = [...ceremonyVenues];
    updatedCeremonyVenues[index] = venue;
    setCeremonyVenues(updatedCeremonyVenues);
    // console.log("venues", ceremonyVenues);
  };

  const handleCheckboxChange = (index) => {
    const updatedCeremonies = [...selectedCeremonies];
    updatedCeremonies[index] = {
      ...selectedCeremonies[index],
      selected: !selectedCeremonies[index].selected,
    };
    setSelectedCeremonies(updatedCeremonies);
  };

  const handleCreateCeremonies = async () => {
    const ceremoniesToCreate = [];
    for (let index = 0; index < getAllCeremonies.length; index++) {
      const ceremony = getAllCeremonies[index];
      if (selectedCeremonies[index]?.selected) {
        const ceremonyToCreate = {
          ceremony_id: ceremony.id,
          ceremony_time: ceremonyDates[index], // Use the selected date for this ceremony
          ceremony_venue: ceremonyVenues[index], // Use the selected venue for this ceremony
          selected: true,
          event_id,
        };

        ceremoniesToCreate.push(ceremonyToCreate);
      }
    }
    const requestBody = {
      ceremonies: ceremoniesToCreate,
    };
    // console.log("requestBody", requestBody);
    dispatch(createUserCeremony(requestBody));
    navigate("/foodDrink");
  };

  useEffect(() => {
    const handleData = async () => {
      const res = await dispatch(getAllCeremoniesByEventId());
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Data Fetch Successfully");
        const initialDates = res?.payload?.map((ceremony, index) => {
          return ceremony.ceremony_time && new Date(ceremony.ceremony_time);
        });

        const initialVenues = res?.payload?.map(
          (ceremony) => ceremony.ceremony_venue || ""
        );
        const initialSelectedCeremonies = res?.payload?.map((ceremony) => ({
          id: ceremony.id,
          selected: false,
          date: ceremony.ceremony_time
            ? new Date(ceremony.ceremony_time)
            : null,
          venue: ceremony.ceremony_venue || "",
        }));

        setSelectedCeremonies(initialSelectedCeremonies);
        setCeremonyDates(initialDates);
        setCeremonyVenues(initialVenues);
      } else {
        toast.error("Data fetching error");
      }
    };

    handleData();
  }, [dispatch]);

  useEffect(() => {
    setEditedCeremonyNames(
      getAllCeremonies.map((ceremony) => ceremony.ceremony_name)
    );
  }, [getAllCeremonies]);

  useEffect(() => {
    dispatch(getPaymentStatus());
  }, []);

  const paymentId = paymentStatus["payment status: "]?.status;

  return (
    <div>
      <Navbar />
      <div className="crl"></div>

      <div className="container card-b-1">
        <div className="row">
          <h6 className="col-md-12 welcome-text">
            <h4 className="heading">Ceremonies List </h4>
            Click the Edit button and then tick the ceremony you wish to host,
            either keep the name as per below or click on the box to re-name
            your ceremony to your culture and traditions.
            <br></br> <br></br>
            Fill in the dates, times along with the venue details to move onto
            selection of food and drinks options for your guests. Please ensure
            you select the Ceremonies you require and click the Save button
            before moving on to the next section.
            <br></br> <br></br>
            Please note you have four pre-wedding ceremonies. You may choose to
            have two for yourself and two for your partner. Please ensure you
            set up your groups accordingly, so the correct partners guests
            receive the correct pre-wedding ceremony invitations.
            <br></br> <br></br>
            <div className="refer ">
              Please refer to our downloadable Welcome Pack and Guide in the
              Dashboard to ensure that you set up your Ceremonies and guest
              contacts correctly to send out your invitations.
            </div>
            <br></br>
          </h6>
        </div>
        <div className="crl"></div>
      </div>
      <div className="crl"></div>

      <div className="main-container">
        <div className="container bg-w">
          <div className="row">
            <div className="col-md-12">
              <div className="top-btn-link">
                <Link
                  className="flot-left-btn"
                  // to={`/packages/${eventName}`}
                  to={
                    paymentId === "Success"
                      ? "/myEvents"
                      : `/packages/${eventName}`
                  }
                >
                  <svg
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                    />
                  </svg>{" "}
                  Back
                </Link>

                <button
                  className="flot-tight-btn"
                  onClick={handleCreateCeremonies}
                >
                  Next
                  <svg
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </button>

                {editMode ? (
                  <button
                    className="flot-tight-btn"
                    onClick={handleSaveCeremonyNames}
                  >
                    Save
                  </button>
                ) : (
                  <button className="flot-tight-btn" onClick={toggleEditMode}>
                    Edit
                  </button>
                )}
              </div>

              <div className="crl"></div>

              <div className="main-checkbox row row-px-2">
                <div className="col-md-12">
                  <div className="row row-title event-list-box">
                    <div className="col-md-4 ">
                      <h3>Select Ceremonies</h3>
                    </div>
                    <div className="col-md-4 ">
                      <h3>Date & Time</h3>
                    </div>
                    <div className="col-md-4 ">
                      <h3>Venue</h3>
                    </div>
                  </div>

                  <div className="flex flex-col event-list-block">
                    {getAllCeremonies.map((ceremony, index) => {
                      // console.log(ceremony.icon_link);
                      return (
                        <div
                          className="row items-center event-list-box align-items-center"
                          key={index}
                        >
                          <div className="checkbox-main col-md-4 checkbox-normal">
                            <div className="eve-img">
                              <img
                                className="eve-icon"
                                src={ceremony.icon_link}
                                alt="ima"
                              />
                            </div>
                            <div className="checkbox-main-event-box">
                              {editMode ? (
                                <label
                                  htmlFor={`event${ceremony.ceremony_name}`}
                                >
                                  <input
                                    type="text"
                                    className={`normal-input normal-2 `}
                                    value={editedCeremonyNames[index] || ""}
                                    onChange={(e) =>
                                      handleEditCeremonyName(
                                        index,
                                        e.target.value
                                      )
                                    }
                                  />
                                </label>
                              ) : (
                                <label
                                  htmlFor={`event${ceremony.ceremony_name}`}
                                  // style={{ color: ceremony.colors }}
                                >
                                  {editedCeremonyNames[index] ||
                                    ceremony.ceremony_name}
                                </label>
                              )}

                              <input
                                type="checkbox"
                                id={`event${ceremony.ceremony_name}`}
                                name={`event${ceremony.ceremony_name}`}
                                className="mr-2 form-control nonedited-input"
                                checked={
                                  selectedCeremonies[index]?.selected || false
                                }
                                onChange={() => handleCheckboxChange(index)}
                              />
                              <span className="checkmark"></span>
                            </div>{" "}
                          </div>

                          <div className="col-md-4">
                            {/* handleDateChange */}
                            <DatePicker
                              selected={ceremonyDates[index] || null}
                              onChange={(date) => handleDateChange(index, date)}
                              timeInputLabel="Time:"
                              dateFormat="dd/MM/yyyy h:mm aa"
                              showTimeInput
                              placeholderText="Please Select the date and time"
                              className="form-control"
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              value={ceremonyVenues[index] || ""}
                              onChange={(e) =>
                                handleVenueChange(index, e.target.value)
                              }
                              className="form-control"
                              placeholder=" Enter your venue"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="crl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsList;
