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

const Events = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const eventName1 = JSON.parse(localStorage.getItem("eventName"));
  const eventName = useSelector((state) => state.event.eventState);
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
        // console.log("res", res);
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
        navigate("/shiv_app/invitation/schedulers");
      } else if (name === "Wedding") {
        navigate("/shiv_app/eventList");
      } else if (
        (emailSent && name === "We're Engaged") ||
        (emailSent && name === "Save The Date") ||
        (emailSent && name === "Thank You")
      ) {
        navigate("/shiv_app/event/details");
      } else if (
        name === "We're Engaged" ||
        name === "Save The Date" ||
        name === "Thank You"
      ) {
        navigate("/shiv_app/template");
      }
    } else {
      navigate(`/shiv_app/packages/${name}`);
    }
  };

  const HandleData = (id, name) => {
    const isEmailSent = data?.find((item) => item.id === id);
    const emailSent = isEmailSent?.is_email_sent;
    const time = isEmailSent?.email_sent_timestamp;
    dispatch(setSchedularEventTime(time));
    setMail(emailSent);
    console.log("data", isEmailSent?.is_email_sent);

    dispatch(setEventId(id));
    localStorage.setItem("eventName", JSON.stringify(name));
    dispatch(setEventName(name));

    determineRoute(name, emailSent);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="crl"></div>
        <div className="container mid-title">
          <div className="gap-4">
            <h6 className="mb-3">
              Your wedding events are broken down into Events and Ceremonies.
            </h6>
            <h6 className="mb-3">
              Events are those occasions that you may send out an e-card for,
              the exception to this is your engagement. You may send out an
              invitation for an engagement party should you choose to have one.
            </h6>
            <h6 className="mb-3">
              Ceremonies are associated with all your wedding events. This
              includes, Mehndi nights, Haldi ceremonies, Civil Ceremony, Wedding
              Ceremony, and your Reception. Once you select Wedding you will be
              able to see all your ceremonies.
            </h6>
            <h6 className="mb-3">
              Click manage to be taken through to the packages to purchase now
              or later
            </h6>
          </div>
          <div className="mid-title-left">My Event </div>

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
                  // console.log(item);
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
                        {/* <Link to="#" className="view">
                        View
                      </Link>{" "} */}
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
