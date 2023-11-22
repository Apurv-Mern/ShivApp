import React, { useState, useEffect } from "react";
import "../scss/Dashboard.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectedDrinksForAUser,
  selectedFoodForAUser,
} from "../redux/foodSlice";
import { getAllCeremoniesByEventId } from "../redux/ceremony";
import AddGuestRSPV3 from "./AddGuestRSPV3";
import { postUserRspvForm } from "../redux/rspvSlice";

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
function Rsvp3() {
  const [hasAllergies, setHasAllergies] = useState(false);

  const [requiresAssistance, setRequiresAssistance] = useState(false);
  const [selectedCeremonies, setSelectedCeremonies] = useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [foodList, setFoodList] = React.useState([]);
  const { group_name, id, user_id, event_id } = useParams();

  const [songRequest, setSongRequest] = useState(false);
  const [stayAtVenue, setStayAtVenue] = useState(false);
  const [attendingMehndi, setAttendingMehndi] = useState(false);
  const dispatch = useDispatch();
  const selectedDrinks = useSelector((state) => state.food.selectedDrinks);
  const selectedFoods = useSelector((state) => state.food.selectedFoods);
  const [formData, setFormData] = useState({
    firstName: { id: 1, value: "" },
    lastName: { id: 2, value: "" },
    email: { id: 3, value: "" },
    mobile: { id: 4, value: "" },
    guestOf: { id: 5, value: "" },
    ceremonies: { id: 6, value: [] },
    dietaryRequirements: { id: 7, value: "" },
    hasAllergies: { id: 8, value: "", extraData: "" },
    personalAssistance: { id: 9, value: "", extraData: "" },
    drinks: { id: 10, value: "" },
    drinks2: { id: 11, value: "" },
    mehndiFunction: { id: 12, value: "" },

    stayAtVenue: { id: 13, value: "" },
    roomCount: { id: 14, value: "0" },
    whatHotel: { id: 15, value: "" },
    extraBeds: { id: 16, value: "0" },
    mehndiHandsCount: { id: 17, value: "" },
    mehndiPlacement: { id: 18, value: "" },
    songRequest: { id: 19, value: "", extraData: "" },
  });

  const handleCeremonie = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    handleInputChange({ target: { name: "ceremonies", value } }, "ceremonies");
  };

  const handleFood = (event) => {
    const {
      target: { value },
    } = event;

    setFoodList(typeof value === "string" ? value.split(",") : value);
    handleInputChange(
      { target: { name: "dietaryRequirements", value } },
      "dietaryRequirements"
    );
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    if (name === "hasAllergies") {
      setFormData({
        ...formData,
        hasAllergies: { id: 8, value },
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
    } else if (name === "stayAtVenue") {
      setFormData({
        ...formData,
        stayAtVenue: { id: 13, value },
      });
    }
  };

  const handleExtraData = (e, fieldName) => {
    const updatedFormData = { ...formData };
    updatedFormData[fieldName].extraData = e.target.value; // Update the extraData property
    setFormData(updatedFormData);
  };
  const [addGuestDetails, setAddGuestDetails] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const handleGuestCount = (e) => {
    const { value } = e.target;

    setGuestCount(value);
  };

  const handleInputChange = (event, fieldName) => {
    const { name, value } = event.target;

    if (fieldName === "ceremonies") {
      setFormData({
        ...formData,
        ceremonies: { id: 6, value },
      });
    } else if (fieldName === "dietaryRequirements") {
      setFormData({
        ...formData,
        dietaryRequirements: { id: 7, value },
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
    } else {
      setFormData({
        ...formData,
        [name]: { ...formData[name], value },
      });
    }
  };

  const handleSubmit = (e) => {
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
      event_id,
      guest_id: id,
      question_id: questionIdsWithValues,
      extra_details: extraData,
      response,
      attending: formData.ceremonies.value,
    };

    dispatch(postUserRspvForm(data));
    console.log(selectedCeremonies);
    console.log("data", data);
  };

  useEffect(() => {
    const selectedFood = selectedFoods
      .filter((food) => selectedFoods.includes(food.food_name))
      .map((food) => food.food_name);
    // Update the 'dietaryRequirements' value in formData with the selectedFoods array
    setFormData({
      ...formData,
      dietaryRequirements: { id: 9, value: selectedFood },
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
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-12 rsvp-title">
          {" "}
          <h2>SHIV – LUXURY ASIAN WEDDING SHOW DEMO - RSVP</h2>{" "}
        </div>

        <div className="col-md-12">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label mt-3 "
          >
            First Name:
          </label>
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
        <div className="col-md-12">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Last Name:
          </label>
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
        <div className="col-md-12">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email:
          </label>
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
        <div className="col-md-12">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Mobile Number:
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile.value}
            onChange={(e) => handleInputChange(e)}
            required
            className="form-control"
            placeholder="Mobile No."
            aria-label="Mobile No."
          />
        </div>
        <div className="col-md-12">
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
              MenuProps={MenuProps}
            >
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
              MenuProps={MenuProps}
            >
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

        <div className="col-md-12">
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

        <div className="col-md-12">
          <div className="mb-2">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Will you require any personal assistance (disability) :{" "}
            </label>
            <label className="ml-2">
              <input
                type="radio"
                value={"yes"}
                name="personalAssistance"
                className="m-2"
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
            onChange={(e) => handleInputChange(e, "drinks")}
          >
            <option value="">Select First Preference</option>
            {selectedDrinks?.map((item) => (
              <option value={item?.drink_name} key={item.id}>
                {item?.drink_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Alcoholic Drinks Second Preference:
          </label>
          <select
            id="exampleFormControlInput2"
            className="form-select"
            value={formData.drinks2.value}
            onChange={(e) => handleInputChange(e, "drinks2")}
          >
            <option value="">Select Second Preference</option>
            {selectedDrinks?.map((item) => (
              <option value={item?.drink_name} key={item.id}>
                {item?.drink_name}
              </option>
            ))}
          </select>
        </div>

        {attendingMehndi ? (
          <>
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
                  onChange={handleInputChange}
                >
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
                  onChange={handleInputChange}
                >
                  <option value="">Select Mehndi Placement? </option>
                  <option value="PALM OF HANDS">Palm of hands</option>
                  <option value="BACK OF HANDS">Back of hands</option>
                  <option value="BOTH HANDS">Both hands</option>
                </select>
              </label>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="col-md-12">
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

        <div className="col-md-12">
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
            <div className="col-md-12">
              <label>
                <label>How many rooms will you and your family require?</label>
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

            <div className="col-md-12">
              <label>
                <label>
                  How many extra beds will you require for any children staying
                  with you?
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
          </>
        ) : (
          <div className="col-md-12">
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
          {addGuestDetails && guestCount > 0 ? null : (
            <>
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Number of Additional guests?
              </label>
              <br />
              <label className="ml-2">
                <input
                  type="number"
                  placeholder="Number of guests?"
                  name="guestCount"
                  onChange={handleGuestCount}
                  className="form-control"
                  aria-label="Number of guests?"
                />
              </label>
            </>
          )}
        </div>
        {addGuestDetails && guestCount > 0 ? (
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <button type="button" onClick={() => setAddGuestDetails(false)}>
              Close Add Guest
            </button>
          </div>
        ) : (
          <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
            <button type="button" onClick={() => setAddGuestDetails(true)}>
              Add guest
            </button>
          </div>
        )}

        <div>
          {addGuestDetails && guestCount > 0 ? (
            <>
              {Array(parseInt(guestCount))
                .fill(0)
                .map((_, idx) => (
                  <AddGuestRSPV3 key={idx} guestNo={idx} />
                ))}
            </>
          ) : (
            ""
          )}
        </div>

        <div className="col-md-12">
          {" "}
          <button type="submit" className="btn rsvp-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Rsvp3;
