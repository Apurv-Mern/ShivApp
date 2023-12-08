import React, { useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom/dist";

const EventsDetails = () => {
  const eventName = useSelector((state) => state.event.eventState);
  const [scheduledTimes, setScheduledTimes] = useState("");
  const schedularEventTime = JSON.parse(localStorage.getItem("templateTime"));

  const formattedScheduledTime = scheduledTimes
    ? format(new Date(scheduledTimes), "mm:HH dd-MM-eeee")
    : "";

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

  return (
    <div>
      <Navbar />

      <div className="container card-b-1">
        <div className="card-home">
          <div className="row">
            <div className="col-md-12 e-cart-block">
              <div className="e-cart-block2">
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
              </div>
              <div className="crl"></div>

              <div className="event-name">
                Your {eventName} E-card is send at{" "}
                {formattedDate ? formattedDate : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsDetails;
