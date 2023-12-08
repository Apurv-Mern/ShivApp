import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../scss/Dashboard.css";
import events from "../assets/icon/event.png";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventById,
  getEventUserById,
  getUserEventById,
  setEventId,
  setEventName,
  setSchedularEventTime,
} from "../redux/eventSlice";
import { getPaymentStatus } from "../redux/paymentSlice";
import { Helmet } from "react-helmet-async";

const Events = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const paymentStatus = useSelector((state) => state.payment.paymentStatus);
  const [mail, setMail] = useState();

  useEffect(() => {
    dispatch(getPaymentStatus());
  }, []);

  const paymentId = paymentStatus["payment status: "]?.status;

  useEffect(() => {
    const handleData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getEventUserById());
        setData(res.payload?.map((item) => item));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    handleData();
  }, []);

  const determineRoute = (name, emailSent) => {
    if (paymentId === "Success") {
      if (emailSent && name === "Wedding") {
        navigate("/invitation/schedulers");
      } else if (name === "Wedding") {
        navigate("/eventList");
      } else if (
        (emailSent && name === "We're Engaged") ||
        (emailSent && name === "Save The Date") ||
        (emailSent && name === "Thank You")
      ) {
        navigate("/event/details");
      } else if (
        name === "We're Engaged" ||
        name === "Save The Date" ||
        name === "Thank You"
      ) {
        navigate("/template");
      }
    } else {
      navigate(`/packages/${name}`);
    }
  };

  const HandleData = (id, name) => {
    const isEmailSent = data?.find((item) => item.id === id);
    const emailSent = isEmailSent?.is_email_sent;
    const time = isEmailSent?.email_sent_timestamp;
    dispatch(setSchedularEventTime(time));
    setMail(emailSent);

    dispatch(setEventId(id));
    localStorage.setItem("eventName", JSON.stringify(name));
    dispatch(setEventName(name));

    determineRoute(name, emailSent);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="SHIV Events. Plan all your wedding events and ceremonies and send out We’re Engaged, Save The Date and Thank you e-cards along with Wedding Ceremony e-invitations."
        />
        <link rel="canonical" href="https://shiv-worldwide.com/myEvents"></link>
        <title>SHIV Platform Events – Asian Wedding Specialist |SHIV</title>
      </Helmet>
      <div>
        <Navbar />
        <div className="crl"></div>
        <div className="container card-b-1">
          <div className="row">
            <h6 className="col-md-12 welcome-text">
              <h4 className="mid-title-left heading">Event </h4>
              Your wedding events are broken down into Events and Ceremonies.
              <br></br> <br></br>
              We have broken down each element of your wedding invitations and
              cards into Events. Each event will allow you to send out e-cards
              to your guests. Once you click on manage for We’re Engaged, Save
              The Date and Thank You, you will be able to send out E-cards to
              all your guests.
              <br></br> <br></br>
              When you click on manage for Wedding, you will see the Ceremonies
              associated with your wedding events. In this section you will be
              able to set up your own Ceremonies such as Mehndi nights, Haldi
              Ceremonies, Civil Ceremony, Wedding Ceremony, and your Reception.
              Once you select Wedding you will be able to see all your
              ceremonies.
            </h6>
            <br></br> <br></br>
            <div className="refer">
              Please refer to our downloadable Welcome Pack and Guide in the
              Dashboard to ensure that you set up your Ceremonies and guest
              contacts correctly to send out your invitations.
            </div>
            <br></br> <br></br>
          </div>

          <div className="crl"></div>
        </div>
        <div className="crl"></div>
        <div className="main-container">
          <div className="container bg-w">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th width="50%" scope="col">
                    Event Name
                  </th>
                  <th width="20%" scope="col"></th>
                  <th width="30%" className="action" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <img
                          className="events-icon-01"
                          src={item.icon_link}
                          alt="Dashboard"
                        />
                        {item.event_name}
                      </td>
                      <td>{item.date}</td>
                      <td>
                        <button
                          className="view view2"
                          onClick={() => HandleData(item.id, item.event_name)}
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Events;
