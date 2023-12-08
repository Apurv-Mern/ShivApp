import React, { useEffect, useRef, useState, img } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectImage, temp3Ceremony } from "../redux/templateSlice";
import "../scss/Dashboard.css";
import Navbar from "./Navbar";
import Editor from "./Editor";
import Draggable from "react-draggable";
import Editor1 from "./Editor1";
import Editor2 from "./Editor2";
import Editor3 from "./Editor3";
import FooterEditor from "./FooterEditor";
import ThankuEditor from "./ThankuEditor";
import SaveTheDateEditor from "./SaveTheDateEditor";

const TemplatePreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [plainText, setPlainText] = useState();
  const [model, setModel] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const template = localStorage.getItem("template");

  // ?Add these state variables at the top of your component function
  const [text1Coordinates, setText1Coordinates] = useState({ x: 0, y: 0 });
  const thankYou = useSelector((state) => state.image.thankYou);
  const eventName = JSON.parse(localStorage.getItem("eventName"));
  const selectedImage = useSelector((state) => state.image.selectedTemplate);
  const text1 = useSelector((state) => state.image.tempText1);
  const text2 = useSelector((state) => state.image.tempText2);
  const text3 = useSelector((state) => state.image.tempText3);
  const event2text = useSelector((state) => state.image.engagedText);
  const footerText = useSelector((state) => state.image.footer);
  const saveTheDate = useSelector((state) => state.image.saveTheDate);
  const selectedCeremonies = useSelector(
    (state) => state.image.dynamicCeremony
  );

  const handelModel = () => {
    setModel(!model);
  };

  const handleBuyNow = () => {
    navigate("/packages");
  };

  const handleEditor1 = () => {
    setToggle1(!toggle1);
    setHide1(!hide1);
  };

  const handleEditor2 = () => {
    setToggle2(!toggle2);
    setHide2(!hide2);
  };

  return (
    <>
      <Navbar />
      <div className="crl"></div>
      <div className="container mid-title">
        <div className="mid-title-left">Template Preview </div>
        <div className="crl"></div>
      </div>
      <div className="crl"></div>
      <div className="main-container">
        <div className="container bg-w">
          <div className="btn-box ">
            <Link className="flot-left-btn" to={"/template"}>
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
            <Link className="flot-tight-btn" to={"/contacts"}>
              Next
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
            </Link>

            <div className="crl"></div>
          </div>

          <div className=" mt-10 h-fit"></div>
          <div className="flex flex-col items-center justify-center w-full">
            {/* // ? WAY 2 TODO : IMPROVEMENT  */}
            <div className="crl"></div>
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

                    {hide1 ? (
                      <div className="absolute-editor">
                        <div className="absolute-editor-in">
                          {" "}
                          <Editor />{" "}
                        </div>
                      </div>
                    ) : (
                      <Draggable
                        onDrag={(e, ui) => {
                          setText1Coordinates({ x: ui.x, y: ui.y });
                        }}
                      >
                        <div
                          className="absolute-text"
                          dangerouslySetInnerHTML={{ __html: text1 }}
                        ></div>
                      </Draggable>
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
                        <Draggable>
                          <div
                            className="absolutetext-2xl"
                            dangerouslySetInnerHTML={{ __html: text2 }}
                          ></div>
                        </Draggable>
                        <div
                          className="absolute-m1 mob-font"
                          dangerouslySetInnerHTML={{ __html: footerText }}
                        ></div>
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
                        <Draggable>
                          <div
                            className="absolute-text text-xl"
                            dangerouslySetInnerHTML={{
                              __html: text3,
                            }}
                          ></div>
                        </Draggable>
                        <div
                          className="absolute-bottom mob-font"
                          dangerouslySetInnerHTML={{ __html: footerText }}
                        ></div>
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
                    <button className="edit-btn" onClick={handleEditor1}>
                      {toggle1 ? "PREVIEW" : "EDIT"}
                    </button>

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
                    <button className="edit-btn" onClick={handleEditor1}>
                      {toggle1 ? "PREVIEW" : "EDIT"}
                    </button>

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
                    <button className="edit-btn" onClick={handleEditor1}>
                      {toggle1 ? "PREVIEW" : "EDIT"}
                    </button>

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
              <Link to={"/template"} className="btn btn-2">
                Edit Invitation
              </Link>
            </div>
          </div>

          {model ? (
            <>
              <div>
                <Dialog
                  open={model}
                  keepMounted
                  onClose={handelModel}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"RSPV"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Please complete your RSVP Package Purchase to download a
                      water mark free Invitation.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handelModel}></Button>
                    <Button onClick={handleBuyNow}>Buy Now</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TemplatePreview;
