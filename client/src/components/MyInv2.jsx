import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Dashboard.css";
import user from "../assets/user.jpg";
import Navbar from "./Navbar";

import { useDispatch, useSelector } from "react-redux";
import { getSelectedFoods } from "../redux/foodSlice";
import { toast } from "react-toastify";

const MyInv2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"));
  const user_id = parseInt(userId, 10);
  let event_id = useSelector((state) => state.event.event_id);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  console.log(userId);

  const Drinks = [
    "No Alcohol",
    "Beer",
    "Brandy",
    "Champagne",
    "Gin",
    "Prosecco",
    "Red Wine",
    "Rose Wine",
    "Rum",
    "Tequila",
    "Vodka",
    "Whisky",
    "White Wine",
  ];

  const Food = [
    "Children's Meal",
    "Gluten and Coeliac Free",
    "Gluten Free",
    "Halal",
    "Jain",
    "Kosher",
    "No beef",
    "No Chicken",
    "No Dairy",
    "No Fish",
    "No onion no garlic",
    "No Pork",
    "Pescatarian",
  ];

  const handleCheckboxChangeFood = (food) => {
    if (food.target.checked) {
      setSelectedFoods([...selectedFoods, food.target.name]);
      dispatch(
        getSelectedFoods({
          user_id,
          food_name: [...selectedFoods, food.target.name],
        })
      );
    } else {
      setSelectedFoods(selectedFoods.filter((e) => e !== food.target.name));
      dispatch(
        getSelectedFoods({
          user_id,
          food_name: selectedFoods.filter((e) => e !== food.target.name),
        })
      );
    }
  };
  const handleCheckboxChangeDrink = (drink) => {
    if (drink.target.checked) {
      setSelectedDrinks([...selectedDrinks, drink.target.name]);
      dispatch(
        getSelectedFoods({
          user_id,
          food_name: [...selectedDrinks, drink.target.name],
        })
      );
    } else {
      setSelectedDrinks(selectedDrinks.filter((e) => e !== drink.target.name));
      dispatch(
        getSelectedFoods({
          user_id,
          food_name: selectedDrinks.filter((e) => e !== drink.target.name),
        })
      );
    }
  };
  // console.log({ "select drink": selectedDrinks, "select food": selectedFoods });

  const handleNext = () => {
    if (selectedFoods.length === 0) {
      if (selectedDrinks.length === 0) {
        toast.error("Please select at least on Food and drink");
      } else {
        toast.error("Please select at least one Food");
      }
    } else {
      toast.error("Please select at least one Drink");
    }
    if (selectedDrinks.length && selectedFoods.length > 0) {
      navigate("/template");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mid-title">
        <div className="mid-title-left">My Invitations </div>
        <div className="add-eventapp-btn"></div>
      </div>

      <div className="main-container">
        <div className="container bg-w">
          <Link className="flot-left-btn mt-3 mb-3" to={"/eventList"}>
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

          <button className="flot-tight-btn mt-3 mb-3" onClick={handleNext}>
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

          <div className="main-checkbox my-Invitations2">
            <div className="row">
              <div className="col-md-12">
                <h5> Event Date (1) 04/12/2013 </h5>{" "}
              </div>
            </div>
            <div className="row event-block top-head">
              <div className="col-md-6">We are engaged</div>
              <div className="col-md-3">
                <a href="#">View</a>{" "}
              </div>
              <div className="col-md-3">
                <a href="#">Sent</a>{" "}
              </div>
            </div>
            <div className="row event-block">
              <div className="col-md-6">We are engaged</div>
              <div className="col-md-3">
                <a href="#">View</a>{" "}
              </div>
              <div className="col-md-3">
                <a href="#">Sent</a>{" "}
              </div>
            </div>
            <div className="row event-block">
              <div className="col-md-6">We are engaged</div>
              <div className="col-md-3">
                <a href="#">View</a>{" "}
              </div>
              <div className="col-md-3">
                <a href="#">Sent</a>{" "}
              </div>
            </div>
            <div className="row event-block">
              <div className="col-md-6">We are engaged</div>
              <div className="col-md-3">
                <a href="#">View</a>{" "}
              </div>
              <div className="col-md-3">
                <a href="#">Schedule</a>{" "}
              </div>
            </div>

            <div className="row event-block">
              <div className="col-md-6">We are engaged</div>
              <div className="col-md-3">
                <a href="#">View</a>{" "}
              </div>
              <div className="col-md-3">
                <a href="#">Reschedule</a>{" "}
              </div>
            </div>

            <div className="row event-block">
              <div className="col-md-6">We are engaged</div>
              <div className="col-md-3">
                <a href="#">View</a>{" "}
              </div>
              <div className="col-md-3">
                <a href="#">Schedule</a>{" "}
              </div>
            </div>

            <div className="crl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInv2;
