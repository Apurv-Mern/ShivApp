import React, { useState } from "react";
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
import AddGuestRSPV2 from "./AddGuestRSPV2";
import {
  selectedDrinksForAUser,
  selectedFoodForAUser,
} from "../redux/foodSlice";
import { getAllCeremoniesByEventId } from "../redux/ceremony";
import { useEffect } from "react";
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

function Rsvp2() {
  const [hasAllergies, setHasAllergies] = useState(false);

  const [requiresAssistance, setRequiresAssistance] = useState(false);
  const [selectedCeremonies, setSelectedCeremonies] = useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [foodList, setFoodList] = React.useState([]);
  const { group_name, id, user_id, event_id } = useParams();
  const [ceremonyData, setCeremonyData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [foodsData, setFoodsData] = useState([]);
  const selectedDrinks = useSelector((state) => state.food.selectedDrinks);
  const selectedFoods = useSelector((state) => state.food.selectedFoods);
  const dispatch = useDispatch();

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
  });

  //!
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
    }
  };

  const handleExtraData = (e, fieldName) => {
    const updatedFormData = { ...formData };
    updatedFormData[fieldName].extraData = e.target.value; // Update the extraData property
    setFormData(updatedFormData);
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

  const [addGuestDetails, setAddGuestDetails] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const handleGuestCount = (e) => {
    const { value } = e.target;

    setGuestCount(value);
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

  // console.log(selectedCeremonies);
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
            Guest Of (Bride/Groom):
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
        <div className="col-md-12">
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
              className="m-2"
              name="hasAllergies"
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
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Alcoholic Drinks Second Preference:
          </label>
          <select
            id="exampleFormControlInput1"
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
                  // <AddGuestRSPV1 key={idx} guestNo={idx} />
                  <AddGuestRSPV2 key={idx} guestNo={idx} />
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

export default Rsvp2;
