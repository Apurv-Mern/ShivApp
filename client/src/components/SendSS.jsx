import React, { useEffect, useRef, useState, img } from "react";
import tool from "../assets/tool.png";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoordinatesForTemplates,
  setCoordinatesForTemplates,
  setinvitationType,
  temp3Ceremony,
} from "../redux/templateSlice";
import "../scss/Dashboard.css";
import Navbar from "./Navbar";
import Draggable from "react-draggable";
import Editor1 from "./Editor1";
import Editor2 from "./Editor2";
import Editor3 from "./Editor3";
import FooterEditor from "./FooterEditor";
import html2canvas from "html2canvas";
import {
  saveTheDateScreenshotsToApi,
  testMailForSaveTheDate,
  testMailForThankYou,
  testMailForWeEngaged,
  testMailForWedding,
  thankYouScreenshotsToApi,
  weAreEngagedScreenshotsToApi,
  weddingScreenshotsToApi,
} from "../redux/screenshotSlice";
import { getAllCeremoniesByEventId } from "../redux/ceremony";
import { getPaymentStatus } from "../redux/paymentSlice";
import EditorSS from "./EditorSS";
import Editor4 from "./Editor4";
import { TextField } from "@mui/material";
import ThankuEditor from "./ThankuEditor";
import SaveTheDateEditor from "./SaveTheDateEditor";
import { toast } from "react-toastify";
import PackagesPopupTemplate from "./PackagePopupTemplate";
import { getUserGroupsByUserId } from "../redux/templateCreationSlice";
import { getGroupsByUserId } from "../redux/GroupSlice";
import { getMarriageDetailss } from "../redux/marriageSlice";

const SendSS = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const marriageDetails = useSelector(
    (state) => state.marriage.marriageDetails
  );
  const [text1Coordinates, setText1Coordinates] = useState({ x: 0, y: 0 });
  const [text2Coordinates, setText2Coordinates] = useState({ x: 0, y: 0 });
  const [text3Coordinates, setText3Coordinates] = useState({ x: 0, y: 0 });
  const [invitationTypeCoordinates, setInvitationTypeCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const allGroupNames = useSelector((state) => state.groups.groupWithId);
  const eventName = JSON.parse(localStorage.getItem("eventName"));
  const selectedImage = useSelector((state) => state.image.selectedTemplate);
  const text1 = useSelector((state) => state.image.tempText1);
  const text2 = useSelector((state) => state.image.tempText2);
  const sstext1 = useSelector((state) => state.image.ssTempText1);
  const event2text = useSelector((state) => state.image.engagedText);
  const footerText = useSelector((state) => state.image.footer);
  const paymentStatus = useSelector((state) => state.payment.paymentStatus);
  const paymentId = paymentStatus["payment status: "]?.status;
  const [activeTab, setActiveTab] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [open, setOpen] = useState(false);
  const [testMail, setTestMail] = useState(false);
  const groupedData = useSelector((state) => state.template.groupedData);
  const thankYou = useSelector((state) => state.image.thankYou);
  const saveTheDate = useSelector((state) => state.image.saveTheDate);
  const [allSelectedCeremonies, setAllSelectedCeremonies] = useState([]);
  const newSelectedGroupNames = useSelector(
    (state) => state.template.newSelectedGroupNames
  );
  const selectedCeremonies = useSelector(
    (state) => state.image.dynamicCeremony
  );
  const invitationType = useSelector(
    (state) => state.invitation.selectedInvitationType
  );
  const setinvitationTypeofgroup = useSelector(
    (state) => state.image.invitationType
  );
  // const user_id = useSelector((state) => state.auth.user);
  const user_id = JSON.parse(localStorage.getItem("user"));

  const event_id = useSelector((state) => state.event.event_id);
  const template = localStorage.getItem("template");

  const handleTabClick = (groupName) => {
    setActiveTab(groupName);
    setSelectedGroup(groupName);
  };

  const handleTestMail = () => {
    setTestMail(!testMail);
  };
  const [email, setEmail] = useState(""); // Initialize email state

  const AllGroupsNamesWithId = allGroupNames.filter(
    (item) => item.groupname !== "Unassigned"
  );

  const filteredGroupNames = AllGroupsNamesWithId.map((item) => item.groupname);

  let invitationTypeString = ""; // Initialize an empty string to store the invitation type

  const generateText1Content = () => {
    if (eventName === "Wedding") {
      const content = newSelectedGroupNames.map((groupName) => {
        const groupCeremonies = groupedData[groupName];
        const groupInvitationType = invitationType[groupName];
        // *Check if the current group matches the selected group

        if (groupName === selectedGroup) {
          // ?Reverse the order of ceremonies
          const reversedCeremonies = [...groupCeremonies].reverse();
          const ceremoniesText = reversedCeremonies
            .sort((a, b) => {
              const dateA = new Date(a?.ceremony_time);
              const dateB = new Date(b?.ceremony_time);
              return dateA - dateB;
            })
            .map((ceremony) => {
              const isoTimeString = ceremony?.ceremony_time;
              const date = new Date(isoTimeString);

              // Format time according to 12-hour clock with AM/PM
              const time = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });

              const dayOfWeek = new Intl.DateTimeFormat("en-US", {
                weekday: "long",
              }).format(date);

              const dayOfMonth = date.getDate();
              const month = new Intl.DateTimeFormat("en-US", {
                month: "long",
              }).format(date);
              const year = date.getFullYear();

              return `${
                ceremony?.ceremony_name
              }<br> ${dayOfWeek} ${dayOfMonth}${getDaySuffix(
                dayOfMonth
              )} ${month} ${year} ${time}<br> ${ceremony?.ceremony_venue}`;
            })
            .join("<br>");

          invitationTypeString = `${
            groupInvitationType !== undefined ? groupInvitationType : "You"
          }`;
          return `${ceremoniesText}`;
        }

        // If the current group doesn't match the selected group, return an empty string
        return "";
      });

      return content.join("<br>");
    }
    return ""; // Return an empty string if eventName is not "Wedding"
  };

  // ?Function to get the day suffix (e.g., 1st, 2nd, 3rd, 4th)
  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  useEffect(() => {
    // Check if there are any group names available and select the first one
    if (Object.keys(groupedData).length > 0) {
      const firstGroupName = Object.keys(groupedData)[0];
      setSelectedGroup(firstGroupName);
    }
  }, [groupedData]); // Trigger when groupedData changes

  // ?const text3content = generateText3Content();
  const text3content = generateText1Content();

  useEffect(() => {
    dispatch(temp3Ceremony(text3content));
  }, [text3content, dispatch]);

  // Dispatch the invitation type for the selected group
  useEffect(() => {
    dispatch(setinvitationType(invitationTypeString));
  }, [invitationTypeString]);

  const handelModel = () => {
    setModel(!model);
  };

  const handleBuyLater = () => {
    // navigate("/invitation/schedulers");
    setModel(!model);
  };

  const handleEditor1 = () => {
    setToggle1(!toggle1);
    setHide1(!hide1);
    setHide3(!hide3);
  };

  const handleEditor2 = () => {
    setToggle2(!toggle2);
    setHide2(!hide2);
  };

  useEffect(() => {
    const handleCeremonies = async () => {
      const res = await dispatch(getAllCeremoniesByEventId());
      const selectedCeremonyNames = res.payload
        ?.filter((item) => item.selected === true)
        ?.map((item) => ({
          name: item.ceremony_name,
          id: item.id,
        }));
      setAllSelectedCeremonies(selectedCeremonyNames);
    };
    dispatch(getPaymentStatus());
    handleCeremonies();
  }, []);

  useEffect(() => {
    dispatch(getUserGroupsByUserId());
    dispatch(getMarriageDetailss());
  }, [dispatch]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state when the input value changes
  };

  const newGroupName = "demo";
  const guest_id = "000";
  const bride_name = marriageDetails[0]?.bride_name;
  const groom_name = marriageDetails[0]?.groom_name;

  const takeScreenshotAndSend = () => {
    const template1 = document.querySelector(".temp1");
    const template2 = document.querySelector(".temp2");
    const template3 = document.querySelector(".temp3");

    // Capture screenshots of the templates based on the eventName
    let screenshotsArray = [];
    let singleScreenshotsArray = [];

    if (eventName === "Wedding") {
      // For "Wedding" event, send all three templates
      Promise.all([
        html2canvas(template1),
        html2canvas(template2),
        html2canvas(template3),
      ]).then((canvases) => {
        canvases.map((canvas) => {
          const data = canvas.toDataURL("image/png");
          screenshotsArray.push(data);
        });
        testMail
          ? dispatch(
              testMailForWedding({
                screenshotsArray,
                user_id,
                email,
                newGroupName,
                event_id,
                guest_id,
                bride_name,
                groom_name,
              })
            )
              .then(() => {
                toast.success("Email sent successfully");
              })
              .catch((error) => {
                toast.error("Email Failed to Sent");
              })
          : dispatch(
              weddingScreenshotsToApi({
                screenshotsArray,
                newSelectedGroupNames,
                allSelectedCeremonies,
              })
            )
              .then(() => {
                toast.success("Email sent successfully");
                navigate("/myEvents");
              })
              .catch((error) => {
                toast.error("Email Failed to Sent");
              });
      });
      setTestMail(false);
      setModel(false);
    }

    if (eventName === "We're Engaged") {
      html2canvas(template1).then((canvas) => {
        const data = canvas.toDataURL("image/png");
        singleScreenshotsArray.push(data);

        testMail
          ? dispatch(
              testMailForWeEngaged({
                singleScreenshotsArray,
                email,
                bride_name,
                groom_name,
              })
            )
              .then(() => {
                toast.success("Email sent successfully");
              })
              .catch((error) => {
                toast.error("Email Failed to Sent");
              })
          : dispatch(
              weAreEngagedScreenshotsToApi({
                singleScreenshotsArray,
                filteredGroupNames,
                bride_name,
                groom_name,
              })
            )
              .then(() => {
                toast.success("Email sent successfully");
                navigate("/myEvents");
              })
              .catch((error) => {
                toast.error("Email Failed to Sent");
              });
      });
      setTestMail(false);
      setModel(false);
    }
    if (eventName === "Save The Date") {
      html2canvas(template1).then((canvas) => {
        const data = canvas.toDataURL("image/png");
        singleScreenshotsArray.push(data);

        testMail
          ? dispatch(
              testMailForSaveTheDate({
                singleScreenshotsArray,
                email,
                bride_name,
                groom_name,
              })
            )
              .then(() => {
                toast.success("Email sent successfully");
              })
              .catch((error) => {
                toast.error("Email Failed to Sent");
              })
          : dispatch(
              saveTheDateScreenshotsToApi({
                singleScreenshotsArray,
                filteredGroupNames,
              })
            )
              .then(() => {
                toast.success("Email sent successfully");
                navigate("/myEvents");
              })
              .catch((error) => {
                toast.error("Email Failed to Sent");
              });
      });

      setTestMail(false);
      setModel(false);
    }
    if (eventName === "Thank You") {
      html2canvas(template1).then((canvas) => {
        const data = canvas.toDataURL("image/png");
        singleScreenshotsArray.push(data);

        testMail
          ? dispatch(
              testMailForThankYou({
                singleScreenshotsArray,
                email,
                bride_name,
                groom_name,
              })
            )
              .then(() => {
                toast.success("Email sent successfully");
              })
              .catch((error) => {
                toast.error("Email Failed to Sent");
              })
          : dispatch(
              thankYouScreenshotsToApi({
                singleScreenshotsArray,
                filteredGroupNames,
              })
            )
              .then(() => {
                toast.success("Email sent successfully");
                navigate("/myEvents");
              })
              .catch((error) => {
                toast.error("Email Failed to Sent");
              });
      });

      setTestMail(false);
      setModel(false);
    }
  };

  // *SET COORDINATE
  const handleCoordinates = () => {
    const data = {
      user_id,
      event_id,
      pages: [1, 2, 3, 4],
      x_coordinates: [
        invitationTypeCoordinates.x,
        text1Coordinates.x,
        text2Coordinates.x,
        text3Coordinates.x,
      ],
      y_coordinates: [
        invitationTypeCoordinates.y,
        text1Coordinates.y,
        text2Coordinates.y,
        text3Coordinates.y,
      ],
    };

    dispatch(setCoordinatesForTemplates(data))
      .then(() => toast.success("Saved"))
      .catch(() => toast.error("Please try again"));
  };

  // *GET COORDINATE
  useEffect(() => {
    setLoading(true);
    const getCoordinates = async () => {
      const data = {
        user_id,
        event_id,
      };
      const res = await dispatch(getCoordinatesForTemplates(data));

      if (res?.meta?.requestStatus === "fulfilled") {
        // *Assuming the response payload is an array
        const coordinates = res.payload;

        // *Set the initial coordinates for text elements
        setInvitationTypeCoordinates({
          x: coordinates[0]?.x_coordinate || 0,
          y: coordinates[0]?.y_coordinate || 0,
        });
        setText1Coordinates({
          x: coordinates[1]?.x_coordinate || 0,
          y: coordinates[1]?.y_coordinate || 0,
        });
        setText2Coordinates({
          x: coordinates[2]?.x_coordinate || 0,
          y: coordinates[2]?.y_coordinate || 0,
        });
        setText3Coordinates({
          x: coordinates[3]?.x_coordinate || 0,
          y: coordinates[3]?.y_coordinate || 0,
        });
      }
      setLoading(false);
    };

    getCoordinates();
  }, [user_id, event_id, dispatch]);

  return (
    <>
      <Navbar />

      {loading ? (
        <h1></h1>
      ) : (
        <>
          <div className="crl"></div>
          <div className="container card-b-1">
            <div className="row">
              <h6 className="col-md-12 welcome-text">
                <h4 className="heading"> Template Preview </h4>
                Click on the Edit button to fill in your details and add any
                text you wish. You can also make amendments such as font size,
                colour, bold, italic, etc.
                <br></br> <br></br>
                Once amended click Preview to also have the choice to move the
                text on the invitation before sending the e-card to your guests.
                <br></br> <br></br>
                <div className="refer">
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
              <div className="btn-box ">
                <Link
                  className="flot-left-btn"
                  to={eventName === "Wedding" ? "/sendInvitation" : "/couples"}
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
                <span data-tooltip="Please note you must send ALL your guest invitations at the same time.">
                  <img className="tool-tip" src={tool} alt="tool" />
                </span>
                <div className="crl"></div>
              </div>

              <div className=" mt-10 h-fit"></div>
              <div className="flex flex-col items-center justify-center w-full">
                {/* // ? WAY 2 TODO : IMPROVEMENT  */}
                <div className="crl"></div>
                {/* Render tabs for each group name */}
                {eventName === "Wedding" && (
                  <div className="tabs tabsprv">
                    <span
                      className="test-m1 test-m3"
                      data-tooltip="To preview the Invitation Type for your group simply click on the Contact Group name and you will see the Invitation Type they will receive. "
                    >
                      <img className="tool-tip" src={tool} alt="tool" />
                    </span>

                    {newSelectedGroupNames.map((groupName) => (
                      <>
                        <button
                          key={groupName}
                          className={`tab ${
                            activeTab === groupName ? "active" : ""
                          }`}
                          onClick={() => handleTabClick(groupName)}
                        >
                          {groupName}
                        </button>
                      </>
                    ))}
                  </div>
                )}

                {eventName === "Wedding" && (
                  <div className="relative cart-prv">
                    {/* // ? TEMPLATE 1 */}
                    {selectedImage || template ? (
                      <div
                        className="cart-prv-in temp1"
                        id="DownloadPdf"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <img
                          className="w-full h-full"
                          src={selectedImage || template}
                          alt="Please select the template"
                        />
                        {model || testMail ? (
                          ""
                        ) : (
                          <button className="edit-btn" onClick={handleEditor1}>
                            {toggle1 ? "PREVIEW" : "EDIT"}
                          </button>
                        )}

                        {hide1 ? (
                          <div className="absolute-editor1   ">
                            <div className="absolute-editor-in">
                              <EditorSS />
                            </div>
                            <div className="absolute-editor">
                              <div className="absolute-editor-in">
                                <Editor4 />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Draggable
                              defaultPosition={{
                                x: invitationTypeCoordinates.x,
                                y: invitationTypeCoordinates.y,
                              }}
                              onDrag={(e, ui) => {
                                setInvitationTypeCoordinates({
                                  x: ui.x,
                                  y: ui.y,
                                });
                              }}
                            >
                              <div
                                className="absolute-text absolute-text-2"
                                dangerouslySetInnerHTML={{
                                  __html: setinvitationTypeofgroup,
                                }}
                              ></div>
                            </Draggable>

                            <Draggable
                              defaultPosition={{
                                x: text1Coordinates.x,
                                y: text1Coordinates.y,
                              }}
                              onDrag={(e, ui) => {
                                setText1Coordinates({ x: ui.x, y: ui.y });
                              }}
                            >
                              <div
                                className="absolute-text"
                                dangerouslySetInnerHTML={{
                                  __html: sstext1,
                                }}
                              ></div>
                            </Draggable>
                          </div>
                        )}
                      </div>
                    ) : (
                      <h4 className="temp-text">
                        Please select the template first
                      </h4>
                    )}

                    {/* // ? TEMPLATE 2 */}
                    {selectedImage || template ? (
                      <div
                        className="cart-prv-in temp2"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <img
                          className="w-full h-full"
                          src={selectedImage || template}
                          alt="Please select the template"
                        />
                        {model || testMail ? (
                          ""
                        ) : (
                          <button className="edit-btn" onClick={handleEditor2}>
                            {toggle2 ? "PREVIEW" : "EDIT"}
                          </button>
                        )}

                        {hide2 ? (
                          <>
                            <div className="absolute-editor">
                              <div className="absolute-editor-in">
                                {" "}
                                <Editor1 />{" "}
                              </div>
                            </div>
                            <div className="footereditor">
                              <div className="absolute-editor-in">
                                {" "}
                                <FooterEditor />{" "}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <Draggable
                              defaultPosition={{
                                x: text2Coordinates.x,
                                y: text2Coordinates.y,
                              }}
                              onDrag={(e, ui) => {
                                setText2Coordinates({ x: ui.x, y: ui.y });
                              }}
                            >
                              <div
                                className="absolutetext-2xl"
                                dangerouslySetInnerHTML={{ __html: text2 }}
                              ></div>
                            </Draggable>
                            {/* <div
                              className="absolute-m1 mob-font"
                              dangerouslySetInnerHTML={{ __html: footerText }}
                            ></div> */}
                          </>
                        )}
                      </div>
                    ) : (
                      ""
                    )}

                    {/* // ? TEMPLATE 3 */}
                    {selectedImage || template ? (
                      <div
                        className="cart-prv-in temp3"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <img
                          className="w-full h-full"
                          src={selectedImage || template}
                          alt="Please select the template"
                        />
                        {model || testMail ? (
                          ""
                        ) : (
                          <button className="edit-btn" onClick={handleEditor2}>
                            {toggle2 ? "PREVIEW" : "EDIT"}
                          </button>
                        )}

                        {hide2 ? (
                          <>
                            <div className="absolute-editor">
                              <div className="absolute-editor-in">
                                {" "}
                                <Editor2 />{" "}
                              </div>
                            </div>
                            <div className="footereditor ">
                              <div className="absolute-editor-in">
                                {" "}
                                <FooterEditor />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <Draggable
                              defaultPosition={{
                                x: text3Coordinates.x,
                                y: text3Coordinates.y,
                              }}
                              onDrag={(e, ui) => {
                                setText3Coordinates({ x: ui.x, y: ui.y });
                              }}
                            >
                              <div
                                className="absolute-text text-xl"
                                dangerouslySetInnerHTML={{
                                  __html: selectedCeremonies,
                                }}
                              ></div>
                            </Draggable>
                          </>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}

                {eventName === "We're Engaged" && (
                  <div className="relative cart-prv">
                    {/* // ? TEMPLATE 1 */}
                    {selectedImage || template ? (
                      <div
                        className="cart-prv-in temp1"
                        id="DownloadPdf"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <img
                          className="w-full h-full"
                          src={selectedImage || template}
                          alt="Please select the template"
                        />
                        {model || testMail ? (
                          ""
                        ) : (
                          <button className="edit-btn" onClick={handleEditor1}>
                            {toggle1 ? "PREVIEW" : "EDIT"}
                          </button>
                        )}

                        {hide1 ? (
                          <div className="absolute-editor">
                            <div className="absolute-editor-in">
                              {" "}
                              <Editor3 />{" "}
                            </div>
                          </div>
                        ) : (
                          <Draggable>
                            <div
                              className="absolute-text"
                              dangerouslySetInnerHTML={{ __html: event2text }}
                            ></div>
                          </Draggable>
                        )}
                      </div>
                    ) : (
                      <h4 className="temp-text">
                        Please select the template first
                      </h4>
                    )}
                  </div>
                )}

                {eventName === "Thank You" && (
                  <div className="relative cart-prv">
                    {/* // ? TEMPLATE 1 */}
                    {selectedImage || template ? (
                      <div
                        className="cart-prv-in temp1"
                        id="DownloadPdf"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <img
                          className="w-full h-full"
                          src={selectedImage || template}
                          alt="Please select the template"
                        />
                        {model || testMail ? (
                          ""
                        ) : (
                          <button className="edit-btn" onClick={handleEditor1}>
                            {toggle1 ? "PREVIEW" : "EDIT"}
                          </button>
                        )}
                        {hide1 ? (
                          <div className="absolute-editor">
                            <div className="absolute-editor-in">
                              {" "}
                              <ThankuEditor />{" "}
                            </div>
                          </div>
                        ) : (
                          <Draggable>
                            <div
                              className="absolute-text"
                              dangerouslySetInnerHTML={{ __html: thankYou }}
                            ></div>
                          </Draggable>
                        )}
                      </div>
                    ) : (
                      <h4 className="temp-text">
                        Please select the template first
                      </h4>
                    )}
                  </div>
                )}

                {eventName === "Save The Date" && (
                  <div className="relative cart-prv">
                    {/* // ? TEMPLATE 1 */}
                    {selectedImage || template ? (
                      <div
                        className="cart-prv-in temp1"
                        id="DownloadPdf"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <img
                          className="w-full h-full"
                          src={selectedImage || template}
                          alt="Please select the template"
                        />
                        {model || testMail ? (
                          ""
                        ) : (
                          <button className="edit-btn" onClick={handleEditor1}>
                            {toggle1 ? "PREVIEW" : "EDIT"}
                          </button>
                        )}

                        {hide1 ? (
                          <div className="absolute-editor">
                            <div className="absolute-editor-in">
                              {" "}
                              <SaveTheDateEditor />{" "}
                            </div>
                          </div>
                        ) : (
                          <Draggable>
                            <div
                              className="absolute-text"
                              dangerouslySetInnerHTML={{ __html: saveTheDate }}
                            ></div>
                          </Draggable>
                        )}
                        {/* <PopupContent /> */}
                      </div>
                    ) : (
                      <h4 className="temp-text">
                        Please select the template first
                      </h4>
                    )}
                  </div>
                )}
                <div className="crl"></div>

                <div className="two-btn-box w-full">
                  <span
                    className="test-m1 test-m2"
                    data-tooltip="Please note editing the invitation will take you back to select a new design template."
                  >
                    <img className="tool-tip" src={tool} alt="tool" />
                  </span>

                  <Link to={"/template"} className="btn btn-2">
                    Edit Invitation
                  </Link>
                  <button
                    className="btn btn-1 "
                    style={{ marginRight: "10px" }}
                    onClick={handelModel}
                  >
                    Send
                  </button>
                  <Button variant="outlined" onClick={handleTestMail}>
                    Test Emailing
                  </Button>

                  <Button variant="outlined" onClick={handleCoordinates}>
                    Save
                  </Button>

                  <span
                    className="test-m1"
                    data-tooltip="Once you click send your invites will automatically be emailed to your guest groups. Please note that this may take some time. Please do NOT click send again or move off this page until we confirm your emails have been sent. "
                  >
                    <img className="tool-tip" src={tool} alt="tool" />
                  </span>

                  <Dialog open={testMail} onClose={handleTestMail}>
                    <DialogTitle>Test Email</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Send yourself a test PDF of your invite to ensure you
                        are happy with it before sending to your guests.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email} // Bind the 'email' state to the input value
                        onChange={handleEmailChange} // Handle input changes
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleTestMail}>Cancel</Button>
                      <Button onClick={takeScreenshotAndSend}>Send Mail</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>

              {paymentId === "Success" ? (
                model && (
                  <>
                    <div>
                      <Dialog
                        open={model}
                        keepMounted
                        onClose={handelModel}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>{"Send Invitations"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to send this?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={takeScreenshotAndSend}>
                            Send Now{" "}
                          </Button>
                          <Button onClick={handleBuyLater}>Send Later</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div>
                    <Dialog
                      open={model}
                      keepMounted
                      onClose={handelModel}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Buy Packages"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Are you sure you want to send this?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <PackagesPopupTemplate />
                      </DialogActions>
                    </Dialog>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SendSS;
