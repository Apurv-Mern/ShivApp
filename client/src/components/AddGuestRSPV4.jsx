import React, { useEffect, useState } from "react";
import "../scss/Dashboard.css";
import DatePicker from "react-datepicker";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import "react-datepicker/dist/react-datepicker.css";
import { getUserRspvForm, postUserRspvForm } from "../redux/rspvSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllCeremoniesByEventId,
  getCeremoniesByEventId,
} from "../redux/ceremony";
import {
  getDrinks,
  getFoods,
  selectedDrinksForAUser,
  selectedFoodForAUser,
} from "../redux/foodSlice";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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

const AddGuest = ({ guestNo }) => {
  const dispatch = useDispatch();
  const { group_name, id, user_id } = useParams();
  const [ceremonyData, setCeremonyData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [foodsData, setFoodsData] = useState([]);
  const [hasAllergies, setHasAllergies] = useState(false);

  const [requiresAssistance, setRequiresAssistance] = useState(false);

  const [extendStay, setExtendStay] = useState(false);

  const [songRequest, setSongRequest] = useState(false);
  const [stayAtVenue, setStayAtVenue] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showGuestDetails, setShowGuestDetails] = useState(true);

  const selectedDrinks = useSelector((state) => state.food.selectedDrinks);
  const selectedFoods = useSelector((state) => state.food.selectedFoods);

  const [formData, setFormData] = useState({
    firstName: { id: 1, value: "" },
    lastName: { id: 2, value: "" },
    email: { id: 3, value: "" },
    mobile: { id: 4, value: "" },
    guestOf: { id: 5, value: "" },
    ceremonies: { id: 6, value: [] },
    dietaryRequirements: { id: 7, value: [] },
    hasAllergies: {
      id: 8,
      value: "",
      extraData: "",
    },
    personalAssistance: { id: 9, value: "", extraData: "" },
    drinks: { id: 10, value: "" },
    drinks2: { id: 11, value: "" },
    mehndiFunction: { id: 12, value: "" },
    MUA: { id: 13, value: "" },
    ceremonyMUA: { id: 14, value: "" },
    sareeAssistance: { id: 15, value: "" },
    turbanAssistance: { id: 16, value: "" },
    dhotiAssistance: { id: 17, value: "" },
    songRequest: { id: 18, value: "", extraData: "" },
    flightArrival: { id: 19, value: "" },
    flightDeparture: { id: 20, value: "" },
    transfer: { id: 21, value: "" },
    stayAtVenue: { id: 22, value: "" },
    roomCount: { id: 23, value: "0" },
    extraBeds: { id: 24, value: "0" },
    whatHotel: { id: 25, value: "" },
    extendStay: { id: 26, value: "" },
    dateRange: { id: 27, value: "" },
    danceEntertainment: { id: 28, value: "" },
    guestCount: { id: 29, value: "" },
    mehndiHandsCount: { id: 30, value: "" },
    mehndiPlacement: { id: 31, value: "" },
  });
  const [personName, setPersonName] = React.useState([]);
  const [foodList, setFoodList] = React.useState([]);
  const [selectedCeremonies, setSelectedCeremonies] = useState([]);
  const [addGuest, setAddGuest] = useState(false);
  const handleCeremonie = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleFood = (event) => {
    const {
      target: { value },
    } = event;

    setFoodList(typeof value === "string" ? value.split(",") : value);
  };

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleExtraData = (e, fieldName) => {
    const updatedFormData = { ...formData };
    updatedFormData[fieldName].extraData = e.target.value; // Update the extraData property
    setFormData(updatedFormData);
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    if (name === "hasAllergies") {
      setFormData({
        ...formData,
        hasAllergies: { id: 8, value },
      });
    } else if (name === "sareeAssistance") {
      setFormData({
        ...formData,
        sareeAssistance: { id: 15, value },
      });
    } else if (name === "personalAssistance") {
      setFormData({
        ...formData,
        personalAssistance: { id: 9, value },
      });
    } else if (name === "mehndiFunction") {
      setFormData({
        ...formData,
        mehndiFunction: { id: 12, value },
      });
    } else if (name === "turbanAssistance") {
      setFormData({
        ...formData,
        turbanAssistance: { id: 16, value },
      });
    } else if (name === "dhotiAssistance") {
      setFormData({
        ...formData,
        dhotiAssistance: { id: 17, value },
      });
    } else if (name === "songRequest") {
      setFormData({
        ...formData,
        songRequest: { id: 18, value },
      });
    } else if (name === "transfer") {
      setFormData({
        ...formData,
        transfer: { id: 21, value },
      });
    } else if (name === "stayAtVenue") {
      setFormData({
        ...formData,
        stayAtVenue: { id: 22, value },
      });
    } else if (name === "danceEntertainment") {
      setFormData({
        ...formData,
        danceEntertainment: { id: 28, value },
      });
    } else if (name === "extendStay") {
      setFormData({
        ...formData,
        extendStay: { id: 26, value },
      });
    } else if (name === "MUA") {
      setFormData({
        ...formData,
        MUA: { id: 13, value },
      });
    }
  };

  const handleInputChange = (event, fieldName) => {
    const { name, value } = event.target;

    if (fieldName === "ceremonies") {
      setFormData({
        ...formData,
        ceremonies: { id: 6, value },
      });
    } else if (fieldName === "drinks") {
      setFormData({
        ...formData,
        drinks: { id: 10, value },
      });
    } else if (fieldName === "drinks2") {
      setFormData({
        ...formData,
        drinks2: { id: 11, value },
      });
    } else if (fieldName === "dietaryRequirements") {
      setFormData({
        ...formData,
        dietaryRequirements: { id: 7, value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: { ...formData[name], value },
      });
    }
  };

  const handleSubmit = (e) => {
    setShowGuestDetails(false);
    e.preventDefault();

    const questionIdsWithValues = Object.keys(formData)
      .filter(
        (key) => formData[key].value !== "" && formData[key].value !== null
      )
      .map((key) => formData[key].id);
    const response = Object.keys(formData)
      .filter(
        (key) => formData[key].value !== "" && formData[key].value !== null
      )
      .map((key) => formData[key].value);

    const extraData = Object.keys(formData).map((key) => {
      const extra = formData[key]?.extraData;
      return extra !== undefined ? extra : null;
    });

    // Add selectedCeremonies to the response
    // const responseData = [...response, ...selectedCeremonies];

    const data = {
      user_id,
      guest_id: id,
      question_id: questionIdsWithValues,
      extraData,
      response,
    };

    // dispatch(postUserRspvForm(data));
    console.log(selectedCeremonies);
    console.log(`guestData${guestNo}`, data);
  };

  useEffect(() => {
    const selectedFood = selectedFoods
      .filter((food) => selectedFoods.includes(food.food_name))
      .map((food) => food.food_name);
    // Update the 'dietaryRequirements' value in formData with the selectedFoods array
    setFormData({
      ...formData,
      dietaryRequirements: { id: 7, value: selectedFood },
    });

    console.log(selectedFood);
  }, [selectedFoods]);

  useEffect(() => {
    dispatch(selectedDrinksForAUser());
    dispatch(selectedFoodForAUser());
    const handleCeremonies = async () => {
      const res = await dispatch(getAllCeremoniesByEventId());
      const selectedCeremonyNames = res.payload
        ?.filter((item) => item.selected === true)
        ?.map((item) => item.ceremony_name);
      setSelectedCeremonies(selectedCeremonyNames);
      console.log(res);
    };

    handleCeremonies();
  }, []);

  return (
    <div className="rsvp-pack">
      {showGuestDetails ? (
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-12 rsvp-title">
            {" "}
            <h2>Guest {guestNo + 1} Details</h2>{" "}
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <input
              type="text"
              name="firstName"
              value={formData.firstName.value}
              onChange={handleInputChange}
              pattern="[A-Za-z]+"
              required
              className="form-control"
              placeholder="First name "
              aria-label="First name"
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <input
              type="text"
              name="lastName"
              value={formData.lastName.value}
              onChange={(e) => handleInputChange(e)}
              pattern="[A-Za-z]+"
              required
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <input
              type="email"
              name="email"
              value={formData.email.value}
              onChange={(e) => handleInputChange(e)}
              required
              className="form-control"
              placeholder="Email"
              aria-label="Email"
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <input
              type="tel"
              name="mobile"
              value={formData.mobile.value}
              onChange={(e) => handleInputChange(e)}
              pattern="[0-9]{10}"
              required
              className="form-control"
              placeholder="Mobile No."
              aria-label="Mobile No."
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Guest Of:
            </label>
            <input
              type="text"
              name="guestOf"
              value={formData.guestOf.value}
              onChange={(e) => handleInputChange(e)}
              required
              className="form-control"
              placeholder="Guest"
              aria-label="Guest"
            />
          </div>

          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                What events will you be attending?
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleCeremonie}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}>
                {selectedCeremonies?.map((item) => {
                  console.log(item);
                  return (
                    <MenuItem key={item.id} value={item}>
                      <Checkbox checked={personName.indexOf(item) > -1} />
                      <ListItemText primary={item} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Dietary Requirements:
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={foodList}
                onChange={handleFood} // Use the same handleChange function
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}>
                {selectedFoods?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item?.food_name}>
                      <Checkbox
                        checked={foodList.indexOf(item?.food_name) > -1}
                      />
                      <ListItemText primary={item?.food_name} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Allergies:
            </label>

            <label className="ml-2">
              <input
                type="radio"
                value={"yes"}
                name="hasAllergies"
                className="m-2"
                onClick={() => setHasAllergies(true)}
                onChange={handleRadioChange}
              />
              Yes
            </label>

            <label className="ml-2">
              <input
                type="radio"
                className="m-2"
                name="hasAllergies"
                value={"no"}
                onClick={() => setHasAllergies(false)}
                onChange={handleRadioChange}
              />
              No
            </label>
            {hasAllergies ? (
              <>
                <label className="ml-2">
                  <input
                    type="text"
                    placeholder="allergy"
                    onChange={(e) => handleExtraData(e, "hasAllergies")}
                    name="hasAllergies"
                    className="form-control"
                    aria-label="How many rooms?"
                  />
                </label>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <div className="mb-2">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Will you require any personal assistance (disability) :{" "}
              </label>
              <label className="ml-2">
                <input
                  type="radio"
                  value={"yes"}
                  className="m-2"
                  name="personalAssistance"
                  onChange={handleRadioChange}
                  onClick={() => setRequiresAssistance(true)}
                />
                Yes
              </label>

              <label className="ml-2">
                <input
                  type="radio"
                  className="m-2"
                  name="personalAssistance"
                  value={"no"}
                  onChange={handleRadioChange}
                  onClick={() => setRequiresAssistance(false)}
                />
                No
              </label>
              {requiresAssistance ? (
                <>
                  <input
                    type="text"
                    placeholder="what kind of assistance"
                    onChange={(e) => handleExtraData(e, "personalAssistance")}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Alcoholic Drinks First Preference:
            </label>

            <select
              id="exampleFormControlInput1"
              className="form-select"
              value={formData.drinks.value}
              onChange={(e) => handleInputChange(e, "drinks")}>
              <option value="">Select First Preference</option>
              {selectedDrinks?.map((item) => (
                <option value={item?.drink_name} key={item.id}>
                  {item?.drink_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Alcoholic Drinks Second Preference:
            </label>
            <select
              id="exampleFormControlInput1"
              className="form-select"
              value={formData.drinks2.value}
              onChange={(e) => handleInputChange(e, "drinks2")}>
              <option value="">Select Second Preference</option>
              {selectedDrinks?.map((item) => (
                <option value={item?.drink_name} key={item.id}>
                  {item?.drink_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Will you participate in mehndi application ?{" "}
            </label>
            <label className="ml-2">
              <input
                type="radio"
                value={"yes"}
                onChange={handleRadioChange}
                className="m-2"
                name="mehndiFunction"
              />
              Yes
            </label>

            <label className="ml-2">
              <input
                type="radio"
                className="m-2"
                name="mehndiFunction"
                value={"no"}
                onChange={handleRadioChange}
              />
              No
            </label>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              How many hands would you like mehndi on?
            </label>
            <br />
            <label className="ml-2">
              <select
                name="mehndiHandsCount"
                className="form-select"
                value={formData.mehndiHandsCount.value}
                onChange={handleInputChange}>
                <option value="">How many hands? </option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </label>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Where would you like your mehndi?
            </label>
            <br />
            <label className="ml-2">
              <select
                name="mehndiPlacement"
                className="form-select"
                value={formData.mehndiPlacement.value}
                onChange={handleInputChange}>
                <option value="">Select Mehndi Placement? </option>
                <option value="PALM OF HANDS">Palm of hands</option>
                <option value="BACK OF HANDS">Back of hands</option>
                <option value="BOTH HANDS">Both hands</option>
              </select>
            </label>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Will you require a MUA?{" "}
            </label>
            <label className="ml-2">
              <input
                type="radio"
                value={"yes"}
                className="m-2"
                name="MUA"
                onChange={handleRadioChange}
              />
              Yes
            </label>

            <label className="ml-2">
              <input
                type="radio"
                className="m-2"
                name="MUA"
                value={"no"}
                onChange={handleRadioChange}
              />
              No
            </label>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              For What ceremony would you require a MUA? <br />
            </label>
            <input
              type="text"
              name="ceremonyMUA"
              onChange={handleInputChange}
              value={formData.ceremonyMUA.value}
              placeholder="Which ceremony?"
              className="form-control"
              aria-label="Which ceremony?"
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Will you require saree dressing assistance?{" "}
            </label>

            <label className="ml-2">
              <input
                type="radio"
                value={"yes"}
                onChange={handleRadioChange}
                className="m-2"
                name="sareeAssistance"
              />
              Yes
            </label>

            <label className="ml-2">
              <input
                type="radio"
                className="m-2"
                name="sareeAssistance"
                value={"no"}
                onChange={handleRadioChange}
              />
              No
            </label>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Will you require turban dressing assistance?{" "}
            </label>

            <label className="ml-2">
              <input
                type="radio"
                value={"yes"}
                className="m-2"
                name="turbanAssistance"
                onChange={handleRadioChange}
              />
              Yes
            </label>

            <label className="ml-2">
              <input
                type="radio"
                onChange={handleRadioChange}
                className="m-2"
                name="turbanAssistance"
                value={"no"}
              />
              No
            </label>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Will you require dhoti dressing assistance?{" "}
            </label>
            <label className="ml-2">
              <input
                type="radio"
                value={"yes"}
                onChange={handleRadioChange}
                className="m-2"
                name="dhotiAssistance"
              />
              Yes
            </label>

            <label className="ml-2">
              <input
                type="radio"
                onChange={handleRadioChange}
                className="m-2"
                name="dhotiAssistance"
                value={"no"}
              />
              No
            </label>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <div className="mb-2">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Request a song (Please state artist and song name) :{" "}
              </label>
              <label className="ml-2">
                <input
                  type="radio"
                  onChange={handleRadioChange}
                  value={"yes"}
                  className="m-2"
                  name="songRequest"
                  onClick={() => setSongRequest(true)}
                />
                Yes
              </label>

              <label className="ml-2">
                <input
                  type="radio"
                  onChange={handleRadioChange}
                  className="m-2"
                  name="songRequest"
                  value={"no"}
                  onClick={() => setSongRequest(false)}
                />
                No
              </label>
              {songRequest ? (
                <input
                  type="text"
                  placeholder="which song"
                  onChange={(e) => handleExtraData(e, "songRequest")}
                  className="form-control"
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Flight Arrival Calendar :{" "}
            </label>

            <DatePicker
              selected={
                formData.flightArrival.value
                  ? new Date(formData.flightArrival.value)
                  : null
              }
              name="flightArrival"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy/MM/dd HH:mm"
              className="form-control"
              onChange={(responseDate) => {
                // Conversion
                const year = responseDate.getFullYear();
                const month = (responseDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0");
                const day = responseDate.getDate().toString().padStart(2, "0");
                const hours = responseDate
                  .getHours()
                  .toString()
                  .padStart(2, "0");
                const minutes = responseDate
                  .getMinutes()
                  .toString()
                  .padStart(2, "0");
                const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;

                setFormData((prevData) => ({
                  ...prevData,
                  flightArrival: {
                    ...prevData.flightArrival,
                    value: formattedDate,
                  },
                }));
              }}
            />
          </div>

          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Flight Departure Calendar :{" "}
            </label>
            <DatePicker
              selected={
                formData.flightDeparture.value
                  ? new Date(formData.flightDeparture.value)
                  : null
              }
              name="flightDeparture"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy/MM/dd HH:mm"
              className="form-control"
              onChange={(responseDate) => {
                // Conversion
                const year = responseDate.getFullYear();
                const month = (responseDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0");
                const day = responseDate.getDate().toString().padStart(2, "0");
                const hours = responseDate
                  .getHours()
                  .toString()
                  .padStart(2, "0");
                const minutes = responseDate
                  .getMinutes()
                  .toString()
                  .padStart(2, "0");
                const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;

                setFormData((prevData) => ({
                  ...prevData,
                  flightDeparture: {
                    ...prevData.flightDeparture,
                    value: formattedDate,
                  },
                }));
              }}
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Will you require transfers ?{" "}
            </label>
            <label className="ml-2">
              <input
                type="radio"
                onChange={handleRadioChange}
                value={"yes"}
                className="m-2"
                name="transfer"
              />
              Yes
            </label>

            <label className="ml-2">
              <input
                type="radio"
                onChange={handleRadioChange}
                className="m-2"
                name="transfer"
                value={"no"}
              />
              No
            </label>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <p>Will you be staying at the couple's event venue/hotel?</p>
            <label className="label-1">
              <input
                type="radio"
                onChange={handleRadioChange}
                name="stayAtVenue"
                value={"yes"}
                onClick={() => setStayAtVenue(true)}
              />
              Yes
            </label>
            <label className="label-2">
              <input
                type="radio"
                onChange={handleRadioChange}
                name="stayAtVenue"
                value={"no"}
                onClick={() => setStayAtVenue(false)}
              />
              No
            </label>
          </div>

          {stayAtVenue ? (
            <>
              <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
                <label>
                  <label>
                    How many rooms will you and your family require?
                  </label>
                  <br />
                  <label className="ml-2">
                    <input
                      type="text"
                      placeholder="How many rooms?"
                      name="roomCount"
                      onChange={handleInputChange}
                      value={formData.roomCount.value}
                      className="form-control"
                      aria-label="How many rooms?"
                    />
                  </label>
                </label>
              </div>

              <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
                <label>
                  <label>
                    How many extra beds will you require for any children
                    staying with you?
                  </label>
                  <br />
                  <label className="ml-2">
                    <input
                      type="text"
                      placeholder="which hotel?"
                      name="extraBeds"
                      onChange={handleInputChange}
                      value={formData.extraBeds.value}
                      className="form-control"
                      aria-label="which hotel?"
                    />
                  </label>
                </label>
              </div>
              {/* <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
                <label>
                  Would you like to extend your stay at the couple's
                  eventvenue/hotel ?
                </label>
                <br />
                <label className="ml-2">
                  <input
                    type="radio"
                    value={"yes"}
                    className="m-2"
                    onChange={handleRadioChange}
                    name="extendStay"
                    onClick={() => setExtendStay(true)}
                  />
                  Yes
                </label>

                <label className="ml-2">
                  <input
                    type="radio"
                    className="m-2"
                    onChange={handleRadioChange}
                    name="extendStay"
                    value={"no"}
                    onClick={() => setExtendStay(false)}
                  />
                  No
                </label>
              </div> */}

              {/* {extendStay ? (
                <div>
                  <h2>Date Range Selector</h2>
                  <DateRangePicker
                    ranges={dateRange}
                    onChange={handleDateChange}
                  />
                </div>
              ) : (
                ""
              )} */}
            </>
          ) : (
            <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
              <label>
                <label>What hotel will you be staying at?</label>
                <br />
                <label className="ml-2">
                  <input
                    type="text"
                    placeholder="which hotel?"
                    name="whatHotel"
                    onChange={handleInputChange}
                    value={formData.whatHotel.value}
                    className="form-control"
                    aria-label="which hotel?"
                  />
                </label>
              </label>
            </div>
          )}

          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <p>
              Would you like to take part in the couple's dance entertainment?
            </p>
            <label className="ml-2">
              <input
                type="radio"
                value={"yes"}
                className="m-2"
                onChange={handleRadioChange}
                name="danceEntertainment"
              />
              Yes
            </label>

            <label className="ml-2">
              <input
                type="radio"
                className="m-2"
                onChange={handleRadioChange}
                name="danceEntertainment"
                value={"no"}
              />
              No
            </label>
          </div>

          <div className="col-md-12 submit-btn-center">
            {" "}
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary">
              Add Guest
            </button>
          </div>
        </form>
      ) : (
        <p className="col-md-12 submit-btn-center">Guest Added {guestNo + 1}</p>
      )}
    </div>
  );
};

export default AddGuest;
