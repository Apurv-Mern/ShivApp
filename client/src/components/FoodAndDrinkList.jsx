import React, { useEffect, useState } from "react";
import Sidebar from "./Header";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Dashboard.css";
import user from "../assets/user.jpg";
import Navbar from "./Navbar";

import { useDispatch, useSelector } from "react-redux";
import {
  getDrinks,
  getFoods,
  updateDrinkForAUser,
  updateFoodForAUser,
} from "../redux/foodSlice";
import { toast } from "react-toastify";

const FoodAndDrinkList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"));
  const user_id = parseInt(userId, 10);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const foods = useSelector((state) => state.food.foods);
  const drinks = useSelector((state) => state.food.drinks);
  const [drinkSelections, setDrinkSelections] = useState(
    Array(drinks.length).fill(false)
  );
  const [foodSelections, setFoodSelections] = useState(
    Array(foods.length).fill(false)
  );
  const handleNext = () => {
    const hasSelectedFoods = foodSelections.some((selection) => selection);
    const hasSelectedDrinks = drinkSelections.some((selection) => selection);

    if (!hasSelectedFoods && !hasSelectedDrinks) {
      toast.error("Please select at least one Food and drink");
    } else if (!hasSelectedFoods) {
      toast.error("Please select at least one Food");
    } else if (!hasSelectedDrinks) {
      toast.error("Please select at least one Drink");
    } else {
      handleDrinks();
      handleFoods();
      navigate("/shiv_app/template");
    }
  };

  const handleDrinkSelectionChange = (index) => {
    const updatedSelections = [...drinkSelections];
    updatedSelections[index] = !updatedSelections[index];
    setDrinkSelections(updatedSelections);
  };
  const handleFoodSelectionChange = (index) => {
    const updatedSelections = [...foodSelections];
    updatedSelections[index] = !updatedSelections[index];
    setFoodSelections(updatedSelections);
  };
  const handleDrinks = () => {
    const selectedDrinkResponse = {
      drink_id: [],
      selected: [],
    };

    drinks.forEach((drink, index) => {
      if (drinkSelections[index]) {
        selectedDrinkResponse.drink_id.push(drink.id); // Assuming drink has an 'id' property
        selectedDrinkResponse.selected.push(true);
      }
    });

    dispatch(updateDrinkForAUser(selectedDrinkResponse));
  };
  // console.log(selectedDrinks);

  const handleFoods = () => {
    const selectedFoodResponse = {
      food_id: [],
      selected: [],
    };

    foods.forEach((food, index) => {
      if (foodSelections[index]) {
        selectedFoodResponse.food_id.push(food.id); // Assuming drink has an 'id' property
        selectedFoodResponse.selected.push(true);
      }
    });
    dispatch(updateFoodForAUser(selectedFoodResponse));
  };

  useEffect(() => {
    dispatch(getFoods());
    dispatch(getDrinks());
  }, [drinkSelections, foodSelections]);

  return (
    <div>
      <Navbar />
      <div className="crl"></div>
      <div className="container card-b-1">
        <div className="row">
          <h6 className="col-md-12 welcome-text">
            <h4 className="heading">Food and Drinks </h4>
            Select the food and drink options you wish to share with your guests
            in your RSVP to help you plan and budget for all your events. Please
            note only the options selected will be available to view in your
            RSVP page.
            <br></br> <br></br>
            <div className="refer">
              {" "}
              Please refer to our downloadable Welcome Pack and Guide in the
              Dashboard for more assistance.
            </div>
            <br></br>
          </h6>
        </div>
        <div className="crl"></div>
      </div>
      <div className="crl"></div>

      <div className="main-container">
        <div className="container bg-w">
          <Link className="flot-left-btn" to={"/shiv_app/eventList"}>
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
          <div className="crl"></div>

          <div className="main-checkbox food-drink">
            <h3>Food </h3>
            {foods.map((food, index) => (
              <div className="checkbox-main" key={index}>
                <label htmlFor={`food${index}`}>{food.food_name}</label>
                <input
                  type="checkbox"
                  id={`food${index}`}
                  name={food}
                  className="mr-2"
                  checked={foodSelections[index]}
                  onChange={() => handleFoodSelectionChange(index)}
                />
                <span className="checkmark"></span>
              </div>
            ))}

            <div className="crl"></div>
          </div>
          <div className="main-checkbox food-drink">
            <h3>Drinks </h3>
            {drinks.map((drink, index) => (
              <div className="checkbox-main" key={index}>
                <label htmlFor={`drink${index}`}>{drink.drink_name}</label>
                <input
                  type="checkbox"
                  id={`drink${index}`}
                  name={drink}
                  className="mr-2"
                  checked={drinkSelections[index]}
                  onChange={() => handleDrinkSelectionChange(index)}
                />
                <span className="checkmark"></span>
              </div>
            ))}

            <div className="crl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodAndDrinkList;
