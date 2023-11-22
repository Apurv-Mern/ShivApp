import React, { useEffect } from "react";
import Sidebar from "./Header";

//photos
import silverImg from "../assets/Silver rings.png";
import goldImg from "../assets/Gold rings.png";
import platinumImg from "../assets/Platinum rings.png";
import diamondImg from "../assets/Diamond rings.png";
//photos
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../scss/Dashboard.css";
import Navbar from "./Navbar";
import user from "../assets/user.jpg";
import { setEventName } from "../redux/eventSlice";
import { stripePaymentSession } from "../redux/paymentSlice";

const Packages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventName } = useParams();
  const decodedEventName = decodeURIComponent(eventName);
  const userId = JSON.parse(localStorage.getItem("user"));
  // console.log("userId", userId);
  console.log(decodedEventName);
  const packages = [
    { id: 1, name: "BRONZE PACKAGE", price: "£300" },
    { id: 2, name: "SILVER PACKAGE", price: "£450" },
    { id: 3, name: "GOLD PACKAGE", price: "£575" },
    { id: 4, name: "PLATINUM PACKAGE", price: "£675" },
    { id: 5, name: "DIAMOND PACKAGE", price: "£775" },
  ];

  useEffect(() => {
    if (decodedEventName) {
      dispatch(setEventName(decodedEventName));
    }
  }, [decodedEventName]);

  const handlePayment = (id) => {
    // Open the child window with your payment URL
    window.location.href = `https://shivappdev.24livehost.com:3004/payment/createpaymentlink/user/${userId}/${id}/event/${eventName}`;
  };

  return (
    <div>
      <Navbar />

      <div className="container mid-title">
        <div className="gap-4">
          <h6 className="mb-3">
            Simply select the package that best suits your needs and move to the
            next section to plan your events.
          </h6>
          <h6 className="mb-3">
            If you are undecided at this stage, simply click buy later to move
            on to the next step in setting up your invitations and dashboard.
          </h6>
        </div>
        <div className="mid-title-left">Packages</div>

        <div className="crl"></div>
      </div>

      <div className="main-container">
        <div className="container bg-w">
          <Link className="flot-left-btn" to={"/shiv_app/myEvents"}>
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

          <div className="row row-px-2 packageItem-box">
            {packages.map((packageItem, index) => (
              <div className="col packageItem" key={index}>
                <div className="packageItemin">
                  <h4 className="packname"> {packageItem.name}</h4>

                  <div className="text-base text-center ">
                    {packageItem.price}
                  </div>
                  <div className="two-btn">
                    <button
                      className="btn btn-1"
                      onClick={() => handlePayment(packageItem.id)}
                    >
                      Buy Now
                    </button>
                    <Link
                      to={
                        eventName === "Wedding"
                          ? "/shiv_app/eventList"
                          : "/shiv_app/template"
                      }
                      className="btn btn-2 bg-dark text-white fs-6 "
                    >
                      Buy Later
                    </Link>
                  </div>
                  <div className="crl"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="btn-box">
            <div className="crl"></div>
          </div>
          <div className="crl"></div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
