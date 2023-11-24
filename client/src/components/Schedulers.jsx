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

  console.log(weddingLists);
  const schedularEventTime = JSON.parse(localStorage.getItem("templateTime"));
  const time = useSelector((state) => state.event.schedularEventTime);
  console.log(time);

  // Format the input date
  const formattedScheduledTime = scheduledTimes
    ? format(new Date(scheduledTimes), "mm:HH dd-MM-eeee")
    : "";

  console.log(formattedScheduledTime);

  // const convertToCronFormat = (inputString) => {
  //   // Split the input string by space
  //   const parts = inputString.split(" ");

  //   if (parts.length !== 2) {
  //     // Handle invalid input
  //     return null;
  //   }

  //   const timePart = parts[0];
  //   const datePart = parts[1];

  //   // Split the time part into hours and minutes
  //   const [hours, minutes] = timePart.split(":");
  //   console.log(minutes, hours);

  //   // Split the date part into day and month
  //   const [day, monthAndDayOfWeek] = datePart.split("-");
  //   console.log(day, monthAndDayOfWeek);

  //   // Split the month and day of the week
  //   const [month, dayOfWeek] = monthAndDayOfWeek.split("-");
  //   console.log(month, dayOfWeek);
  //   // Create a Cron expression
  //   // const cronExpression = `${hours} ${minutes} ${day} ${month} *`;
  //   const cronExpression = "1 * * * * *";
  //   return cronExpression;
  // };

  // const cronExpression = convertToCronFormat(formattedScheduledTime);

  // if (cronExpression) {
  //   console.log(cronExpression); // Output: "12 72 5 11 0"
  // } else {
  //   console.log("Invalid input format.");
  // }

  const getAllEmails = (data) => {
    const emailsOfNoResponseReceive = data
      ?.filter((user) => user.guest_submitted_response === false)
      ?.map((user) => ({ email: user.guest_email, id: user.guest_id }));

    setSendData(emailsOfNoResponseReceive);
  };

  // console.log(sendData);
  // const cronExpression = "1 * * * * *";

  const handleSubmit = () => {
    const dataToSend = {
      data: sendData,
      // scheduledTime: cronExpression,
    };
    // console.log(dataToSend);

    dispatch(startCronJob(dataToSend))
      .then(() => {
        toast.success("Email send successfully");
        setModel(false);
        navigate("/shiv_app/myEvents");
      })
      .catch(() => toast.error("Failed to send email"));
  };

  // const handleScheduledTimeChange = (event) => {
  //   const selectedTime = event.target.value;
  //   setScheduledTimes(selectedTime); // Update the scheduledTime state when the input changes
  // };

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

  console.log(formattedDate);

  useEffect(() => {
    const handleData = async () => {
      const res = await dispatch(weddingList());
      if (res.payload) {
        // Data has been fetched, call getAllEmails
        getAllEmails(res.payload.Data);
      }
    };

    handleData();
  }, [dispatch]);

  const handelModel = () => {
    setModel(!model);
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
          <Link className="flot-left-btn " to={"/shiv_app/myEvents"}>
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
                      weddingLists?.Data?.map((user, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td>{user.guest_name}</td>
                          <td>{user.guest_email}</td>
                          <td>
                            {user.guest_submitted_response === true
                              ? "Yes"
                              : "No"}
                          </td>
                          <td>
                            {user.guest_submitted_response === true ? (
                              <button className="reminder">Submitted</button>
                            ) : (
                              <button className="reminder">
                                Not Submitted
                              </button>
                            )}
                          </td>
                          {/* <td>Add</td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>

                {/* <input
                  type="datetime-local"
                  className="reminder"
                  placeholder="Select Date"
                  value={scheduledTimes}
                  onChange={handleScheduledTimeChange}
                /> */}
                <button className="reminder btn" onClick={handelModel}>
                  Reminder
                </button>
                {/* <button className="reminder btn send-btn-2">Send More</button> */}
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
