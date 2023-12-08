import React, { useEffect, useState } from "react";
import Sidebar from "./Header";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Dashboard.css";
import user from "../assets/user.jpg";
import Navbar from "./Navbar";

import { useDispatch, useSelector } from "react-redux";
import { getSelectedFoods } from "../redux/foodSlice";
import { toast } from "react-toastify";
import { weddingList } from "../redux/guestSlice";
import { format } from "date-fns";
import { startCronJob } from "../redux/paymentSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const MyInv2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const weddingLists = useSelector((state) => state.guest.weddingLists);
  const [scheduledTimes, setScheduledTimes] = useState("");
  const [sendData, setSendData] = useState([]);
  const eventName = useSelector((state) => state.event.eventState);
  const [model, setModel] = useState(false);

  const schedularEventTime = JSON.parse(localStorage.getItem("templateTime"));
  const time = useSelector((state) => state.event.schedularEventTime);

  // Format the input date
  const formattedScheduledTime = scheduledTimes
    ? format(new Date(scheduledTimes), "mm:HH dd-MM-eeee")
    : "";

  const handleCheckboxChange = (user) => {
    if (sendData.some((data) => data.id === user.guest_id)) {
      // ?If the user is already in the list, remove them
      setSendData((prevData) =>
        prevData.filter((data) => data.id !== user.guest_id)
      );
    } else {
      // ?If the user is not in the list, add them
      setSendData((prevData) => [
        ...prevData,
        { email: user.guest_email, id: user.guest_id },
      ]);
    }
  };

  const getAllEmails = (data) => {
    const emailsOfNoResponseReceive = data
      ?.filter((user) => user.guest_submitted_response === false)
      ?.map((user) => ({ email: user.guest_email, id: user.guest_id }));

    setSendData(emailsOfNoResponseReceive);
  };

  const handleSubmit = () => {
    const dataToSend = {
      data: sendData,
    };

    dispatch(startCronJob(dataToSend))
      .then(() => {
        toast.success("Email send successfully");
        setModel(false);
        navigate("/myEvents");
      })
      .catch(() => toast.error("Failed to send email"));
  };

  const date = new Date(schedularEventTime);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  useEffect(() => {
    const handleData = async () => {
      const res = await dispatch(weddingList());
      if (res.payload) {
        // *Data has been fetched, call getAllEmails
        getAllEmails(res.payload.Data);
      }
    };

    handleData();
  }, [dispatch]);

  const handelModel = () => {
    setModel(!model);
  };

  const handleNavigate = () => {
    navigate("/contacts");
  };

  return (
    <div>
      <Navbar />
      <div className="crl"></div>
      <div className="container card-b-1">
        <div className="row">
          <h6 className="col-md-12 welcome-text">
            <h4 className="heading">Reminder</h4>
            All your guests and their contact details will appear here.
            <br></br> <br></br>
            Now that you have sent out all your guest invitations you will be
            able to see if they have submitted their RSVP here and send any
            reminders from here.
            <br></br> <br></br>
            Please note currently you may only send out one reminder which will
            go out to all your guests. We are currently improving our reminders
            feature which will be available early next year.
            <br></br> <br></br>
            <div className="refer">
              Please refer to our downloadable Welcome Pack and Guide in the
              Dashboard to ensure that you set up your Ceremonies and guest
              contacts correctly to send out your invitations.
            </div>
          </h6>
        </div>
        <div className="crl"></div>
      </div>
      <div className="crl"></div>

      <div className="main-container">
        <div className="container bg-w">
          <Link className="flot-left-btn " to={"/myEvents"}>
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

          <div className="crl"></div>

          <div className="main-checkbox my-Invitations2">
            <div className="row">
              <div className="col-md-12">
                <h5>
                  Event : {eventName} <br />
                  Invitation send at {formattedDate ? formattedDate : ""}{" "}
                </h5>{" "}
              </div>
            </div>
            <div className="row event-block top-head">
              <div className="col-md-6">
                Wedding : {weddingLists?.Data?.length} Members
              </div>
            </div>
            <div className="row event-block">
              <div className="col-md-12 user-details">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Full name</th>
                      <th scope="col">Email address</th>
                      <th scope="col">RSVP Response</th>
                      <th scope="col">Responses Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weddingLists &&
                      weddingLists?.Data?.map((user, index) => {
                        return (
                          <tr>
                            <td scope="row" width="7%">
                              {index + 1}
                            </td>
                            <td width="33%">{user.guest_name}</td>
                            <td width="30%">{user.guest_email}</td>
                            <td width="10%">
                              {user.guest_submitted_response === true
                                ? "Yes"
                                : "No"}
                            </td>
                            <td width="20%">
                              {user.guest_submitted_response === true ? (
                                <button className="reminder">Submitted</button>
                              ) : (
                                <div>
                                  <label className="reminder">
                                    Not Submitted
                                  </label>
                                  <input
                                    className="checkbox-a2"
                                    type="checkbox"
                                    checked={sendData.some(
                                      (data) => data.id === user.guest_id
                                    )}
                                    onChange={() => handleCheckboxChange(user)}
                                    id={`checkbox-${index}`}
                                  />
                                </div>
                              )}
                            </td>
                            {/* <td>Add</td> */}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                <button className="reminder btn" onClick={handelModel}>
                  Reminder
                </button>
                <button
                  className="reminder btn send-btn-2"
                  onClick={handleNavigate}
                >
                  Send More
                </button>
              </div>
            </div>

            <div className="crl"></div>
          </div>

          {model ? (
            <>
              <div>
                <Dialog
                  open={model}
                  keepMounted
                  onClose={handelModel}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"Send Invitations"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Are you sure you want to send a reminder?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleSubmit}>Yes </Button>
                    <Button onClick={() => setModel(false)}>No</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          ) : (
            " "
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInv2;
