import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDynamicRsvpQuestions,
  postAdditionalGuestRspvForm,
} from "../redux/rspvSlice";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { DateRangePicker } from "react-date-range";
import { getUserRspvForm, postUserRspvForm } from "../redux/rspvSlice";
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
import AddGuest from "./AddGuestRSPV4";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import "react-datepicker/dist/react-datepicker.css";
// import AddGuestForm from "./AddGuestForm";

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

const AddGuestForm = ({ guestNo }) => {
  const dispatch = useDispatch();
  const { group_name, id, user_id, event_id } = useParams();
  const [userQuestions, setUserQuestions] = useState([]);
  const [numOfGuests, setNumOfGuests] = useState(0);
  const [formData, setFormData] = useState({});
  const [addGuestDetails, setAddGuestDetails] = useState(false);
  const [selectedRadioValues, setSelectedRadioValues] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (event, questionId) => {
    const {
      target: { value },
    } = event;

    setSelectedRadioValues((prevValues) => ({
      ...prevValues,
      [questionId]: value,
    }));
  };

  useEffect(() => {
    const handleData = async () => {
      const res = await dispatch(getUserDynamicRsvpQuestions());
      const selectedQuestions = res.payload?.user_questions.filter(
        (question) => question.selected
      );
      setUserQuestions(selectedQuestions);
    };
    handleData();
  }, [dispatch]);

  const handleSubmit = (e) => {
    // ?Initialize arrays to collect question IDs with values and their corresponding values
    e.preventDefault();
    const questionIds = []; // *Initialize an array to store question IDs
    const questionIdsWithValues = [];
    const questionValues = [];
    const extraDetails = [];

    userQuestions.forEach((question) => {
      const questionId = question.id;
      questionIds.push(questionId);

      const questionValue =
        formData[`question${questionId}${question.questions}`];

      if (questionValue) {
        questionIdsWithValues.push(questionId);
        questionValues.push(questionValue);
      }

      if (
        question.question_type === "Radio text" &&
        selectedRadioValues[questionId] === "yes"
      ) {
        questionIdsWithValues.push(questionId); // *Add the question ID to the array
        questionValues.push("yes"); // *Add "yes" for questions answered with "Yes"
        const radioTextValue =
          formData[`question${questionId}${question.questions}RadioText`];

        if (radioTextValue) {
          extraDetails.push({ questionid: questionId, value: radioTextValue });
        }
      } else if (
        question.question_type === "Radio text" &&
        selectedRadioValues[questionId] === "no"
      ) {
        questionIdsWithValues.push(questionId);
        questionValues.push("no");
      }
    });

    const firstQuestionValue = formData[`question${questionIds[0]}First name`];
    const secondQuestionValue = formData[`question${questionIds[1]}Last name`];
    const thirdQuestionValue = formData[`"question${questionIds[2]}Email`];
    console.log(formData);
    const fourthQuestionValue =
      formData[`question${questionIds[3]}Mobile number`];

    // Create the gogDetails object with the extracted values
    const gogDetails = {
      firstName: firstQuestionValue,
      lastName: secondQuestionValue,
      email: thirdQuestionValue,
      phoneNumber: fourthQuestionValue,
    };

    const data = {
      user_id,
      event_id,
      guest_id: id,
      question_id: questionIdsWithValues,
      extra_details: extraDetails,
      response: questionValues,
      gog_details: gogDetails,
    };

    console.log("Data", data);

    dispatch(postAdditionalGuestRspvForm(data));
  };

  return (
    <div>
      {Array.from({ length: guestNo }, (_, index) => (
        <div className="container card-b-1" key={index}>
          <h4>Add Guest Details</h4>
          <form className="row card-rsvp new-rsvp">
            {userQuestions
              ?.filter((question) => question.questions !== "number of guests")
              ?.map((question, index) => (
                <div
                  className="col-sm-12 col-md-4 col-lg-4 rsvp-padding rsvp-form"
                  key={index}
                >
                  <div className="question">
                    <label htmlFor={`question${index + 1}`}>
                      {question.questions}
                    </label>

                    <div className="form-rs">
                      <div className="crose"></div>
                      {question.question_type === "Free text" && (
                        <input
                          type="text"
                          className="form-control"
                          id={`question${question.id}${question.questions}`}
                          name={`question${question.id}${question.questions}`}
                          onChange={handleInputChange}
                          required
                        />
                      )}

                      {question.question_type === "Dropdown" && (
                        <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id={`demo-select-label${index}`}>
                              {question.questions}
                            </InputLabel>
                            {((question.question_number === 6 ||
                              question.question_number === 7) && (
                              <Select
                                labelId={`demo-select-label${index}`}
                                id={`question${question.id}`}
                                name={`question${question.id}`}
                                multiple // Set to true for multi-select
                                value={formData[`question${question.id}`] || []}
                                onChange={handleInputChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(", ")}
                                MenuProps={MenuProps}
                                required
                              >
                                {question?.question_value?.map((value) => (
                                  <MenuItem key={value} value={value}>
                                    {value}
                                  </MenuItem>
                                ))}
                              </Select>
                            )) || (
                              <Select
                                labelId={`demo-simple-select-label${index}`}
                                id={`question${question.id}`}
                                name={`question${question.id}`}
                                value={formData[`question${question.id}`] || ""}
                                onChange={handleInputChange}
                                input={<OutlinedInput label="Tag" />}
                                MenuProps={MenuProps}
                                required
                              >
                                {question?.question_value?.map((value) => (
                                  <MenuItem key={value} value={value}>
                                    {value}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          </FormControl>
                        </div>
                      )}

                      {question.question_type === "Number" &&
                        question.questions === "number of guests" && (
                          <div className="question1">
                            <input
                              type="number"
                              className="form-control"
                              id={`question${question.id}${question.questions}`}
                              name={`question${question.id}${question.questions}`}
                              onChange={(event) => {
                                handleInputChange(event);
                                setNumOfGuests(
                                  parseInt(event.target.value, 10)
                                );
                              }}
                              required
                            />
                          </div>
                        )}

                      {question.question_type === "Number" &&
                        question.questions !== "number of guests" && (
                          <div className="question1">
                            <input
                              type="number"
                              className="form-control"
                              id={`question${question.id}${question.questions}`}
                              name={`question${question.id}${question.questions}`}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        )}

                      {question.question_type === "Radio text" && (
                        <div className="question1">
                          <input
                            type="radio"
                            id={`question${question.id}${question.questions}`}
                            name={`question${question.id}${question.questions}`}
                            value="yes"
                            onChange={(event) =>
                              handleRadioChange(event, question.id)
                            }
                            checked={selectedRadioValues[question.id] === "yes"}
                          />
                          <label
                            htmlFor={`question${question.id}${question.questions}`}
                          >
                            Yes
                          </label>
                          <input
                            type="radio"
                            id={`question${question.id}${question.questions}`}
                            name={`question${question.id}${question.questions}`}
                            value="no"
                            onChange={(event) =>
                              handleRadioChange(event, question.id)
                            }
                            checked={selectedRadioValues[question.id] === "no"}
                          />
                          <label
                            htmlFor={`question${question.id}${question.questions}`}
                          >
                            No
                          </label>
                        </div>
                      )}

                      {question.question_type === "Radio text" &&
                        selectedRadioValues[question.id] === "yes" && ( // Conditionally render the text box
                          <div className="question1">
                            <input
                              type="text"
                              className="form-control"
                              id={`question${question.id}${question.questions}`}
                              name={`question${question.id}${question.questions}RadioText`} // Append "RadioText" to the name
                              onChange={(e) => handleInputChange(e)}
                              required
                            />
                          </div>
                        )}
                      {question.question_type === "Calendar" && (
                        <div className="question1">
                          <DatePicker
                            className="form-control"
                            id={`question${question.id}${question.questions}`}
                            name={`question${question.id}${question.questions}`}
                            selected={
                              formData[
                                `question${question.id}${question.questions}`
                              ] || null
                            }
                            onChange={(date) => {
                              handleInputChange({
                                target: {
                                  name: `question${question.id}${question.questions}`,
                                  value: date,
                                },
                              });
                            }}
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            <div className="crl"></div>
            {/* <div className="col-sm-12 col-md-4 col-lg-12 gustbutton">
              {addGuestDetails ? (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setAddGuestDetails(false)}
                >
                  Close Add Guest
                </button>
              ) : (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setAddGuestDetails(true)}
                >
                  Add guest
                </button>
              )}
            </div> */}

            <div className="col-md-12">
              <button
                className="btn view-r-btn save-btn-1"
                onClick={handleSubmit}
              >
                Save Details
              </button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AddGuestForm;
