import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // You don't need useSelector here
import {
  getAllSelectedCeremoneisForRsvp,
  getUserDynamicRsvpQuestions2,
  postUserRspvForm,
} from "../redux/rspvSlice";
import DatePicker from "react-datepicker";
import { DateRangePicker } from "react-date-range";

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
import AddGuestForm from "./AddGuestForm";
import { getMarriageDetailss2 } from "../redux/marriageSlice";
import toast from "react-hot-toast";

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

const NewRsvpForm = () => {
  const dispatch = useDispatch();
  const { group_name, id, user_id, event_id } = useParams();
  const { loading, error, successMessage } = useSelector((state) => state.rspv);
  const [userQuestions, setUserQuestions] = useState([]);
  const [numOfGuests, setNumOfGuests] = useState(0);
  const [formData, setFormData] = useState({});
  const [addGuestDetails, setAddGuestDetails] = useState(false);
  const [selectedRadioValues, setSelectedRadioValues] = useState({});
  const [marriage, setMarriage] = useState({
    Bride_Name: "",
    Groom_Name: "",
  });
  const marriageDetails = useSelector(
    (state) => state.marriage.marriageDetails
  );
  const selectedCeremoniesForRsvp = useSelector(
    (state) => state.rspv.selectedCeremoniesForRsvp
  );

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
      const res = await dispatch(getUserDynamicRsvpQuestions2(user_id));
      if (res.meta.requestStatus === "fulfilled") {
        const selectedQuestions = res.payload?.user_questions.filter(
          (question) => question.selected
        );
        setUserQuestions(selectedQuestions);
      }
    };

    const getMarriageDetails = async () => {
      const response = await dispatch(getMarriageDetailss2(user_id));

      const { bride_name, groom_name } = response.payload;
      if (response.meta.requestStatus === "fulfilled") {
        setMarriage({
          Bride_Name: bride_name || "",
          Groom_Name: groom_name || "",
        });
      }
    };

    getMarriageDetails();
    handleData();
  }, [dispatch]);

  const handleSubmit = () => {
    // Initialize arrays to collect question IDs with values and their corresponding values
    const questionIdsWithValues = [];
    const questionValues = [];
    const extraDetails = [];
    const attendingEvents = [];

    userQuestions.forEach((question) => {
      const questionId = question.id;
      const questionValue = formData[`question${questionId}`];

      if (questionValue) {
        questionIdsWithValues.push(questionId);
        questionValues.push(questionValue);
      }

      if (
        question.question_type === "Radio text" &&
        selectedRadioValues[questionId] === "yes"
      ) {
        questionIdsWithValues.push(questionId); // Add the question ID to the array
        questionValues.push("yes"); // Add "yes" for questions answered with "Yes"
        const radioTextValue = formData[`question${questionId}RadioText`];

        if (radioTextValue) {
          extraDetails.push({ questionid: questionId, value: radioTextValue });
        }
      } else if (
        question.question_type === "Radio text" &&
        selectedRadioValues[questionId] === "no"
      ) {
        questionIdsWithValues.push(questionId); // Add the question ID to the array
        questionValues.push("no"); // Add "no" for questions answered with "No"
      }
      if (question.questions === "What events will you be attending?") {
        attendingEvents.push(questionValue);
      }
    });

    const data = {
      user_id,
      event_id,
      guest_id: id,
      question_id: questionIdsWithValues,
      extra_details: extraDetails,
      response: questionValues,
      attending: attendingEvents,
    };

    dispatch(postUserRspvForm(data));
  };

  useEffect(() => {
    dispatch(getAllSelectedCeremoneisForRsvp(id));
  }, []);

  return (
    <div>
      <div className="container card-b-1">
        <h4 className="text-uppercase">
          Please RSVP for your invitation from &nbsp;
          {marriageDetails[0]?.bride_name +
            " " +
            "AND" +
            " " +
            marriageDetails[0]?.groom_name}
        </h4>
        <div className="card-home">
          <form className="row card-rsvp new-rsvp">
            {userQuestions?.map((question, index) => (
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
                        id={`question${question.id}`}
                        name={`question${question.id}`}
                        onChange={handleInputChange}
                        required
                      />
                    )}
                    {question.question_type === "Api" && (
                      <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id={`demo-select-label${index}`}>
                            {question.questions}
                          </InputLabel>

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
                            {selectedCeremoniesForRsvp?.data?.map((value) => (
                              <MenuItem
                                key={value.ceremony_name}
                                value={value.ceremony_name}
                              >
                                {value.ceremony_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    )}

                    {question.question_type === "Dropdown" && (
                      <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id={`demo-select-label${index}`}>
                            {question.questions}
                          </InputLabel>
                          {(question.question_number === 7 && (
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
                        <div className="question">
                          <input
                            type="number"
                            className="form-control"
                            id={`question${question.id}`}
                            name={`question${question.id}`}
                            onChange={(event) => {
                              handleInputChange(event);
                              setNumOfGuests(parseInt(event.target.value, 10));
                            }}
                            required
                          />

                          {addGuestDetails ? (
                            <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
                              <button
                                type="button"
                                className="btn"
                                onClick={() => setAddGuestDetails(false)}
                              >
                                Close Add Guest
                              </button>
                            </div>
                          ) : (
                            <div className="col-sm-12 col-md-4 col-lg-3 rsvp-padding">
                              <button
                                type="button"
                                className="btn"
                                onClick={() => setAddGuestDetails(true)}
                              >
                                Add guest
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                    {question.question_type === "Number" &&
                      question.questions !== "number of guests" && (
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id={`question${question.id}`}
                            name={`question${question.id}`}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      )}

                    {question.question_type === "Radio text" && (
                      <div className="question1">
                        <input
                          type="radio"
                          id={`question${question.id}`}
                          name={`question${question.id}`}
                          value="yes"
                          onChange={(event) =>
                            handleRadioChange(event, question.id)
                          }
                          checked={selectedRadioValues[question.id] === "yes"}
                        />
                        <label htmlFor={`question${question.id}`}>Yes</label>
                        <input
                          type="radio"
                          id={`question${question.id}`}
                          name={`question${question.id}`}
                          value="no"
                          onChange={(event) =>
                            handleRadioChange(event, question.id)
                          }
                          checked={selectedRadioValues[question.id] === "no"}
                        />
                        <label htmlFor={`question${question.id}`}>No</label>
                      </div>
                    )}

                    {question.question_type === "Radio text" &&
                      selectedRadioValues[question.id] === "yes" && ( // Conditionally render the text box
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            id={`question${question.id}`}
                            name={`question${question.id}RadioText`} // Append "RadioText" to the name
                            onChange={(e) => handleInputChange(e)}
                            required
                          />
                        </div>
                      )}

                    {question.question_type === "Calendar" && (
                      <div className="question">
                        <DatePicker
                          className="form-control"
                          id={`question${question.id}`}
                          name={`question${question.id}`}
                          selected={formData[`question${question.id}`] || null}
                          onChange={(date) => {
                            handleInputChange({
                              target: {
                                name: `question${question.id}`,
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
          </form>

          <button className="view-r-btn" onClick={handleSubmit}>
            Submit
          </button>
          <div className="crl"></div>
          <div>
            {addGuestDetails && numOfGuests > 0 && (
              <div>
                <AddGuestForm guestNo={numOfGuests} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRsvpForm;
