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
import { getAllCeremoniesByEventId } from "../redux/ceremony";
import {
  selectedDrinksForAUser,
  selectedFoodForAUser,
} from "../redux/foodSlice";

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

function AddGuestRSPV1({ guestNo }) {
  const [hasAllergies, setHasAllergies] = useState(false);

  const [requiresAssistance, setRequiresAssistance] = useState(false);
  const [selectedCeremonies, setSelectedCeremonies] = useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [foodList, setFoodList] = React.useState([]);
  const { group_name, id, user_id, event_id } = useParams();
  const [ceremonyData, setCeremonyData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [foodsData, setFoodsData] = useState([]);
  const [showGuestDetails, setShowGuestDetails] = useState(true);
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

  console.log(selectedCeremonies);

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
      event_id,
      question_id: questionIdsWithValues,
      extraData,
      response,
    };

    // dispatch(postUserRspvForm(data));
    console.log(selectedCeremonies);
    console.log(`guestData${guestNo + 1}`, data);
  };

  return (
    <div className="rsvp-pack">
      {showGuestDetails ? (
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-12 rsvp-title">
            {" "}
            <h2>Guest {guestNo + 1} Details </h2>{" "}
          </div>
          <div className="col-md-12">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label mt-3 ">
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
          <div className="col-md-12">
            {" "}
            <button
              type="button"
              onClick={handleSubmit}
              className="btn rsvp-btn">
              AddGuest
            </button>
          </div>
        </form>
      ) : (
        <p className="col-md-12 submit-btn-center">Guest Added {guestNo + 1}</p>
      )}
    </div>
  );
}

export default AddGuestRSPV1;
