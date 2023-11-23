import React, { useEffect } from "react";
import { useState } from "react";
import {
  getMarriageDetailss,
  putMarriageDetailss,
} from "../redux/marriageSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const BGNames = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventName = JSON.parse(localStorage.getItem("eventName"));
  const marriageDetails = useSelector(
    (state) => state.marriage.marriageDetails
  );

  const [marriage, setMarriage] = useState({
    Bride_Name: "",
    Groom_Name: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMarriage((prevMarriage) => ({ ...prevMarriage, [name]: value }));
  };

  // const handleMarriageSubmit = () => {
  //   const data = {
  //     bride_name: marriage.Bride_Name,
  //     groom_name: marriage.Groom_Name,
  //   };
  //   // console.log("Data to be sent to API: ", data);
  //   dispatch(putMarriageDetailss(data))
  //     .then(() => toast.success("Data Saved Successfully"))
  //     .catch(() => toast.error("Failed to save data"));
  // };
  const handleNext = async () => {
    try {
      const data = {
        bride_name: marriage.Bride_Name,
        groom_name: marriage.Groom_Name,
      };

      await dispatch(putMarriageDetailss(data));
      toast.success("Data Saved Successfully");
      navigate("/shiv_app/guests/template");
    } catch (error) {
      toast.error("Failed to save data");
    }
  };
  useEffect(() => {
    const getMarriageDetails = async () => {
      const response = await dispatch(getMarriageDetailss());

      if (response && response.payload.length > 0) {
        const { bride_name, groom_name } = response.payload[0];

        // Initialize marriage state with pre-filled values
        setMarriage({
          Bride_Name: bride_name || "",
          Groom_Name: groom_name || "",
        });
      }
    };

    getMarriageDetails();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="container card-b-1">
        <div className="row">
          <h6 className="col-md-12 welcome-text">
            <h4 className="heading">Couples name</h4>
            Please enter your name and your partner’s name to ensure your guests
            can view these details in the email e-invitation they receive.
          </h6>
        </div>
        <div className="groom-block card-home">
          <div className="row groom-rsvp">
            <div className="col-md-12">
              <Link
                className="flot-left-btn"
                to={
                  eventName === "Wedding"
                    ? "/shiv_app/sendInvitation"
                    : "/shiv_app/contacts"
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

              <button className="flot-tight-btn" onClick={handleNext}>
                Next{" "}
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
            </div>
          </div>
          <div className="row groom-rsvp">
            <div className="col-md-6">
              <label htmlFor={`Groom`}>Your Name</label>
              <input
                type="text"
                className="form-control"
                id="Groom Name"
                name={"Groom_Name"}
                onChange={handleInputChange}
                value={marriage.Groom_Name}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor={`Bride`}>Your Partner's Name</label>
              <input
                type="text"
                className="form-control"
                id="Bride Name"
                name={"Bride_Name"}
                onChange={handleInputChange}
                value={marriage.Bride_Name}
                required
              />
            </div>
            {/* <div className="col-md-12 s ave-btn-2">
            <button className="view-r-btn" onClick={handleMarriageSubmit}>
              Save
            </button>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BGNames;
