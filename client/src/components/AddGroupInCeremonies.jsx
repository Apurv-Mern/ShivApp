import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Dashboard.css";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsByUserId } from "../redux/GroupSlice";
import ceremony, { getCeremoniesByEventId } from "../redux/ceremony";
import { handleData, prepareDataForApi } from "../Utils/HandleInvitationType";
import { getAdditionalGuest, getGuestForAGroup } from "../redux/guestSlice";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const AddGroupInCeremonies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user"));

  const groupname = useSelector((state) => state.guest.groupname);
  const groupsWithId = useSelector((state) => state.groups.groupWithId);
  const [guestLimit, setGuestLimit] = useState(0);
  const [selectedGroups, setSelectedGroups] = useState([]);
  // console.log("groupname", groupname);
  const selectedCeremoniesName = useSelector(
    (state) => state.ceremony.getCeremonies
  );
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState(100); // Initial selected value
  const [cost, setCost] = useState(0); // Initial cost
  const additionalGuest = useSelector((state) => state.guest.additionalGuest);
  const [packageId, setPackageId] = useState(1);
  const [popupShown, setPopupShown] = useState(false);
  const [canUpdateList, setCanUpdateList] = useState(true);
  const totalGuest = 100;

  // const handlePayment = (id) => {
  //   // Open the child window with your payment URL
  //   const paymentUrl = `https://shivappdev.24livehost.com:3004/payment/additionalGuests/user/${userId}/${packageId}`;
  //   window.open(paymentUrl, "_blank");
  // };

  // console.log("selectedCeremoniesName", selectedCeremoniesName);
  const handleChange = (event, ceremonyId) => {
    const {
      target: { value },
    } = event;
    setSelectedGroups((prevSelectedGroups) => ({
      ...prevSelectedGroups,
      [ceremonyId]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // * Call prepareDataForApi to prepare the data
  const dataToSend = prepareDataForApi(
    selectedCeremoniesName,
    selectedGroups,
    groupsWithId
  );

  // * Call handleData to handle the data
  const handleDataWrapper = () => {
    handleData(dataToSend, dispatch, navigate);
  };

  const handleGroupData = async (groupName, isSelected) => {
    // console.log(groupName);
    try {
      if (!isSelected && canUpdateList) {
        const res = await dispatch(getGuestForAGroup(groupName));
        // console.log(res);
        // Get the length of the groups from the response
        const groupLength = parseInt(res.payload.length, 10);
        if (!isNaN(groupLength)) {
          setGuestLimit((prevTotal) => prevTotal + groupLength);
        }
      } else {
        let length;
        await dispatch(getGuestForAGroup(groupName));
        // Handle deselection
        length = groupname.length;
        const groupLength = parseInt(length, 10);
        if (!isNaN(groupLength)) {
          setGuestLimit((prevTotal) => prevTotal - groupLength);
        }
      }
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCanUpdateList(true);
  };

  useEffect(() => {
    dispatch(getGroupsByUserId());
    dispatch(getCeremoniesByEventId());
    // handleGroupData();
  }, [dispatch]);

  // useEffect(() => {
  //   if (guestLimit >= additionalGuest?.data?.additional_guests && !popupShown) {
  //     setOpen(true);
  //     setCanUpdateList(false);
  //     setPopupShown(true);
  //   }
  // }, [guestLimit, popupShown]);

  // useEffect(() => {
  //   dispatch(getAdditionalGuest());
  //   // Define the cost calculation logic based on the selected value
  //   let calculatedCost = 0;

  //   if (selectedValue === 100) {
  //     calculatedCost = 25;
  //     setPackageId(1);
  //   } else if (selectedValue === 200) {
  //     calculatedCost = 40;
  //     setPackageId(2);
  //   } else if (selectedValue === 300) {
  //     calculatedCost = 55;
  //     setPackageId(3);
  //   } else if (selectedValue === 400) {
  //     calculatedCost = 70;
  //     setPackageId(4);
  //   } else if (selectedValue === 500) {
  //     calculatedCost = 85;
  //     setPackageId(5);
  //   } else if (selectedValue === 600) {
  //     calculatedCost = 100;
  //     setPackageId(6);
  //   } else if (selectedValue === 700) {
  //     calculatedCost = 155;
  //     setPackageId(7);
  //   } else if (selectedValue === 800) {
  //     calculatedCost = 130;
  //     setPackageId(8);
  //   } else if (selectedValue === 900) {
  //     calculatedCost = 145;
  //     setPackageId(9);
  //   } else if (selectedValue === 1000) {
  //     calculatedCost = 160;
  //     setPackageId(10);
  //   }

  //   // Set the cost state with the calculated value
  //   setCost(calculatedCost);
  // }, [selectedValue]);

  // // console.log("selected", { guest: selectedValue, setPackageId: packageId });
  // console.log("additional guest info", additionalGuest);

  return (
    <div>
      <Navbar />
      <div className="crl"></div>
      <div className="container mid-title">
        <div className="gap-4">
          <h6 className="mb-3">
            Select the groups you wish to invite to each Ceremony and in the
            next step select whether you are inviting an individual, a guest
            plus a partner or a guest and their entire family.
          </h6>
          <h6 className="mb-3">
            Please ensure you select the correct groups for each Ceremony.
          </h6>
        </div>
        <div className="row ">
          <div className="col-md-12">
            <div className="mid-title">Add Groups In A Ceremonies</div>
          </div>
        </div>
      </div>
      <div className="crl"></div>
      <div className="main-container">
        <div className="container bg-w">
          <Link className="flot-left-btn" to={"/shiv_app/contacts"}>
            <svg
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

          {/* <div className="totle-guest">
            Total guest : {guestLimit}/
            {additionalGuest?.data?.additional_guests
              ? additionalGuest?.data?.additional_guests
              : 0}
          </div> */}

          {/* <button className="flot-tight-btn">
            Upgrade Package
            <svg
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
          </button> */}

          <button className="flot-tight-btn" onClick={handleDataWrapper}>
            Next{" "}
            <svg
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
          <div className="crl"></div>

          <div className="main-checkbox my-Invitations">
            <div className="row invitation justify-content-between  ign-items-center">
              <div className="col-md-12">
                <div className="row add-group-1 ps-0">
                  {selectedCeremoniesName?.map((ceremony) => {
                    // console.log(ceremony);
                    return (
                      <div
                        className="col-md-3 add-group-box-1"
                        key={ceremony.id}
                      >
                        <div className="add-group-box">
                          <h3>{ceremony.ceremony_name}</h3>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel
                              id={`select-groups-label-${ceremony.id}`}
                            >
                              Select Groups
                            </InputLabel>
                            <Select
                              labelId={`select-groups-label-${ceremony.id}`}
                              id={`select-groups-${ceremony.id}`}
                              multiple
                              value={selectedGroups[ceremony.id] || []}
                              onChange={(event) =>
                                handleChange(event, ceremony.id)
                              }
                              input={<OutlinedInput label="Tag" />}
                              renderValue={(selected) => selected.join(", ")}
                              MenuProps={MenuProps}
                            >
                              {groupsWithId
                                .filter(
                                  (group) => group.groupname !== "Unassigned"
                                )
                                .map((group) => {
                                  const isSelected =
                                    (selectedGroups[ceremony.id] || []).indexOf(
                                      group.groupname
                                    ) > -1;

                                  // console.log("isSelected", isSelected);
                                  return (
                                    <MenuItem
                                      key={group.id}
                                      onClick={() =>
                                        handleGroupData(
                                          group.groupname,
                                          isSelected
                                        )
                                      }
                                      value={group.groupname}
                                    >
                                      <Checkbox checked={isSelected} />
                                      <ListItemText primary={group.groupname} />
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* <div className="popup-content">
                <Dialog
                  className="popup-content-in"
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle className="pack" id="alert-dialog-title">
                    {"Packages"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <div className="row popup-width">
                        <div className="col-md-6 popup-pakname">
                          {additionalGuest?.data?.package_name}
                        </div>
                        <div className="col-md-6 popup-option">
                          <select
                            name="cars"
                            className="form-select"
                            id="cars"
                            value={selectedValue}
                            onChange={(e) =>
                              setSelectedValue(Number(e.target.value))
                            }
                          >
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="400">400</option>
                            <option value="500">500</option>
                            <option value="600">600</option>
                            <option value="700">700</option>
                            <option value="800">800</option>
                            <option value="900">900</option>
                            <option value="1000">1000</option>
                          </select>
                        </div>

                        <div className="col-md-6 cost-popup">Cost</div>
                        <div className="col-md-6 popup-eur">
                          £ {cost.toFixed(2)}
                        </div>
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <div className="cost-btn">
                      <Button className="btn" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button className="btn" onClick={handlePayment} autoFocus>
                        Upgrade
                      </Button>
                    </div>
                  </DialogActions>
                </Dialog>
              </div> */}

              <div className="crl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGroupInCeremonies;
