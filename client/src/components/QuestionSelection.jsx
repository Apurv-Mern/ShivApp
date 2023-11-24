import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDynamicRsvpQuestions,
  postUserDynamicRsvpQuestions,
} from "../redux/rspvSlice";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  getMarriageDetailss,
  putMarriageDetailss,
} from "../redux/marriageSlice";
import PackagesPopup from "./PackagesPopup";

const QuestionSelection = () => {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(true);

  const [formData, setFormData] = useState({});
  const user_id = localStorage.getItem("user");
  const eventName = localStorage.getItem("eventName");
  const decodedName = decodeURIComponent(eventName);
  const [userQuestions, setUserQuestions] = useState([]);
  const [marriage, setMarriage] = useState({
    Bride_Name: "",
    Groom_Name: "",
  });
  const [undoRemovedQuestionIds, setUndoRemovedQuestionIds] = useState([]);
  const [removedQuestionIds, setRemovedQuestionIds] = useState([]); // Array to store removed question IDs
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMarriage({ ...marriage, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an array to store the selected questions
    const questions_data = removedQuestionIds.map((questionId) => ({
      question_id: questionId,
      selected: false,
    }));

    // Prepare the payload for the POST request
    const payload = {
      questions_data,
    };

    console.log(payload);
    dispatch(postUserDynamicRsvpQuestions(payload));
    toast.success("Questions Saved");
  };

  const handleMarriageSubmit = () => {
    const data = {
      bride_name: marriage.Bride_Name,
      groom_name: marriage.Groom_Name,
    };
    // console.log("Data to be sent to API: ", data);
    dispatch(putMarriageDetailss(data))
      .then(() => toast.success("Data Saved Successfully"))
      .catch(() => toast.error("Failed to save data"));
  };

  const handleRemoveQuestion = (questionId, questionText) => {
    // Create a new array that excludes the clicked question_id
    const updatedUserQuestions = userQuestions.filter(
      (question) => question.id !== questionId,
      toast.success("Question Delete Successfully")
    );
    setRemovedQuestionIds((prevIds) => [...prevIds, questionId]);
    setUndoRemovedQuestionIds((prevIds) => [
      ...prevIds,
      { id: questionId, questions: questionText },
    ]);

    // Update the state to reflect the new array of questions
    setUserQuestions(updatedUserQuestions);
  };

  const handleUndo = () => {
    // Restore previously removed questions
    const updatedUserQuestions = userQuestions.concat(
      undoRemovedQuestionIds.map((question) => ({
        id: question.id,
        questions: question.questions,
      }))
    );
    toast.success("Question Successfully Added Back");
    // Clear the undo array
    setUndoRemovedQuestionIds([]);

    // Update the state to reflect the restored questions
    setUserQuestions(updatedUserQuestions);
  };

  // console.log(marriage);

  const handlePopup = () => {
    setPopupOpen(!popupOpen);
  };

  useEffect(() => {
    const handleData = async () => {
      const res = await dispatch(getUserDynamicRsvpQuestions());
      const selectedQuestions = res.payload?.user_questions.filter(
        (question) => question.selected
      );
      setUserQuestions(selectedQuestions);
    };
    const getMarriageDetails = async () => {
      const response = await dispatch(getMarriageDetailss());

      if (response && response.payload.length > 0) {
        const { bride_name, groom_name } = response.payload[0];

        // Initialize marriage state with pre-filled values
        setMarriage({
          Bride_Name: bride_name || "",
          Groom_Name: groom_name || "",
        });
      }
    };

    getMarriageDetails();

    handleData();
  }, []);

  const handleNext = (event) => {
    event.preventDefault();

    if (!marriage.Bride_Name && !marriage.Groom_Name) {
      toast.error("Please fill your name and your partner's name");
    } else {
      const data = {
        bride_name: marriage.Bride_Name,
        groom_name: marriage.Groom_Name,
      };
      // console.log("Data to be sent to API: ", data);
      dispatch(putMarriageDetailss(data))
        .then(() => toast.success("Data Saved Successfully"))
        .catch(() => toast.error("Failed to save data"));
      navigate("/shiv_app/sendInvitation");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container card-b-1">
        <div className="row">
          <h6 className="col-md-12 welcome-text">
            <h4 className="heading">CHOOSE YOUR RSVP QUESTIONS</h4>
            Please enter your name and your partner’s name to ensure your guests
            can view these details in the email e-invitation and RSVP submission
            page they receive.
            <br></br> <br></br>
            As a part of your package, you have access to all the questions
            below. If you wish to remove a question, simply press the X button
            next to the question.
            <br></br> <br></br>
            You do have the option to undo, however, please note once you save
            the RSVP questions you will be unable to edit them again.
            <br></br> <br></br>
            Please ensure you click save before moving to the next section.
            <br></br> <br></br>
            <div className="refer">
              Please refer to our downloadable Welcome Pack and Guide in the
              Dashboard for further details.
            </div>
            <br></br>
          </h6>
        </div>

        <div className="groom-block card-home">
          <div className="row groom-rsvp">
            <div className="col-md-12">
              <Link
                className="flot-left-btn"
                to={"/shiv_app/add/group/ceremonies"}
              >
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
            </div>
          </div>
          <div className="row groom-rsvp">
            <div className="col-md-6">
              <label htmlFor={`Groom`}>Your Name</label>
              <input
                type="text"
                className="form-control"
                id="Groom Name"
                name={"Groom_Name"}
                onChange={handleInputChange}
                value={marriage.Groom_Name}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor={`Bride`}>Your Partner's Name</label>
              <input
                type="text"
                className="form-control"
                id="Bride Name"
                name={"Bride_Name"}
                onChange={handleInputChange}
                value={marriage.Bride_Name}
                required
              />
            </div>
            {/* <div className="col-md-12 save-btn-2">
              <button className="view-r-btn" onClick={handleMarriageSubmit}>
                Save
              </button>
            </div> */}
          </div>
        </div>

        {userQuestions.length > 0 ? (
          <div className="card-home">
            <div className="row card-rsvp">
              {userQuestions?.map((question, index) => (
                <div className="col-sm-12 col-md-4 col-lg-4 rsvp-padding rsvp-form">
                  <div className="question" key={index}>
                    <label htmlFor={`question${index + 1}`}>
                      {question.questions}
                      <FaTimes
                        className="question-btn"
                        onClick={() =>
                          handleRemoveQuestion(question.id, question.questions)
                        }
                        // data-question-id={question.question_id}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-r-btn" onClick={handleSubmit}>
              Save
            </button>
            <button className="view-r-btn" onClick={handleUndo}>
              Undo
            </button>
            <div className="crl"></div>
          </div>
        ) : (
          <div className="card-home">
            <div className="row card-rsvp rsvppackage">
              <h4>Please Buy the package first</h4>
            </div>
          </div>
        )}
      </div>
      <div>
        {userQuestions.length > 0 ? "" : popupOpen && <PackagesPopup />}
      </div>
    </div>
  );
};

export default QuestionSelection;
