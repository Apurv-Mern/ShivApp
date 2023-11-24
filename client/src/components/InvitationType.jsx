import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Dashboard.css";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsByUserId } from "../redux/GroupSlice";
import {
  selectInvitation,
  selectedInvitationTypeForGroup,
} from "../redux/InvitationSlice";
import { updateTempText1WithInvitationType } from "../redux/templateSlice";
import { getUserGroupsByUserId } from "../redux/templateCreationSlice";
import {
  handleData,
  handleInvitationType,
  prepareDataForApi,
} from "../Utils/HandleInvitationType";

const InvitationType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groups = useSelector((state) => state.groups.groups);
  const groupedData = useSelector((state) => state.template.groupedData);
  const newSelectedGroupNames = useSelector(
    (state) => state.template.newSelectedGroupNames
  );
  const [options, setOptions] = useState();
  const InvitationType = useSelector(
    (state) => state.invitation.invitationType
  );
  // console.log("invitationType line 23", InvitationType);

  const invitationTypes = [
    "Select Invitation Type",
    "You and your Family ",
    "You and your Partner",
    "You",
  ];

  const [selectedInvitationTypes, setSelectedInvitationTypes] = useState({});

  useEffect(() => {
    const handleData = async () => {
      const res = await dispatch(getUserGroupsByUserId());
      // console.log(res);
      dispatch(getGroupsByUserId());
    };

    handleData();
  }, [dispatch]);

  const handleCheckboxChange = (event, groupName) => {
    setOptions({
      ...options,
      [groupName]: event.target.checked,
    });
  };

  const handleSelectChange = (event, groupName) => {
    const selectedValue = event.target.value;

    // * Update the state variable with the selected invitation type for the group
    setSelectedInvitationTypes((prevTypes) => ({
      ...prevTypes,
      [groupName]: selectedValue,
    }));

    // * Dispatch with the updated state
    dispatch(
      selectedInvitationTypeForGroup({
        ...selectedInvitationTypes,
        [groupName]: selectedValue,
      })
    );
  };

  return (
    <div>
      <Navbar />
      <div className="crl"></div>
      <div className="container card-b-1">
        <div className="row">
          <h6 className="col-md-12 welcome-text">
            <h4 className="heading">Invitation Type </h4>
            Here you can select what type of invite your groups are sent. If you
            are only inviting a guest and their partner, select You and Your
            partner. We will then generate an invite specifically inviting your
            guest and their partner.
            <br></br> <br></br>
            The same will apply if you select you. Only the individual guest
            will be invited to your Ceremony. Invitation type You and your
            family, will allow you to invite an entire family to your Ceremony.
            <br></br> <br></br>
            Once you have selected your Invitation Types you may review the
            invite before sending out to your guests ensuring you are happy with
            it. Please ensure you check all details.
            <br></br> <br></br>
            <div className="refer">
              Please refer to our downloadable Welcome Pack and Guide in the
              Dashboard to ensure that you set up your Ceremonies and guest
              contacts correctly to send out your invitations.
            </div>
            <br></br> <br></br>
          </h6>
        </div>

        <div className="crl"></div>
      </div>
      <div className="crl"></div>
      <div className="main-container">
        <div className="container bg-w">
          <Link className="flot-left-btn" to={"/shiv_app/guest/questions"}>
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

          <Link className="flot-tight-btn" to={"/shiv_app/guests/template"}>
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
          </Link>

          <div className="crl"></div>

          <div className="main-checkbox my-Invitations">
            {newSelectedGroupNames?.map((item, index) => (
              <div className="row invitation" key={index}>
                <div className="col-md-3">
                  <div className="checkbox-main">
                    <label className="label-3">{item}</label>

                    <input
                      type="checkbox"
                      className="mr-2 form-control"
                      onChange={(e) => handleCheckboxChange(e, item)}
                      value={invitationTypes[item] || ""}
                    />
                    {/* <span className="checkmark"></span> */}
                  </div>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => handleSelectChange(e, item)}
                  >
                    {invitationTypes.map((opt, index) => (
                      <option value={opt} key={index}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            <div className="crl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationType;
