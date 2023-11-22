import React, { useEffect, useState } from "react";
import Sidebar from "./Header";
import "../fonts.css";
import { Link } from "react-router-dom";
import "../scss/Dashboard.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { templateText1 } from "../redux/templateSlice";
import { useRef } from "react";
import { getUserEventById } from "../redux/eventSlice";
import user from "../assets/user.jpg";
import Navbar from "./Navbar";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [
      {
        font: [],
      },
    ],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blackquote"],
    [
      {
        list: "ordered",
      },
      {
        list: "bullet",
      },
      {
        indent: "-1",
      },
      {
        indent: "+1",
      },
    ],
  ],
};
const TemplateText = () => {
  const dispatch = useDispatch();
  const quillRef = useRef();
  const text = useSelector((state) => state.image.tempText);
  const selectedEvents = useSelector((state) => state.event.selectedEvents);
  console.log(selectedEvents.event_name);

  const [plainText, setPlainText] = useState();
  const [selectedFont, setSelectedFonts] = useState();

  const fonts = [
    { value: "Calibri", label: "Calibri" },
    { value: "Bahnschrift Semil", label: "Bahnschrift Semil" },
    { value: "Bell MT", label: "Bell MT" },
    { value: "Bradley Hand ITC", label: "Bradley Hand ITC" },
    { value: "Century Gothic", label: "Century Gothic" },
    { value: "Chamberi Super Display", label: "Chamberi Super Display" },
    { value: "Cosmic Sans MS", label: "Cosmic Sans MS" },
    { value: "Constantia", label: "Constantia" },
    { value: "Daytona Condensed", label: "Daytona Condensed" },
    { value: "FrankRuehl", label: "FrankRuehl" },
    { value: "Gautami", label: "Gautami" },
    { value: "Kigelia Arabic Light", label: "Kigelia Arabic Light" },
    { value: "Kristen ITC", label: "Kristen ITC" },
    { value: "Lucida Calligraphy", label: "Lucida Calligraphy" },
    { value: "Lucida Handwritting", label: "Lucida Handwritting" },
    { value: "Microsoft PhagsP", label: "Microsoft PhagsP" },
    { value: "Mongolian Baiti", label: "Mongolian Baiti" },
    { value: "Old English Text", label: "Old English Text" },
    { value: "Rockwell Light", label: "Rockwell Light" },
    { value: "Sanskrit Text", label: "Sanskrit Text" },
    { value: "Selawik Light", label: "Selawik Light" },
    { value: "Tahoma", label: "Tahoma" },
    { value: "Walbaum Display", label: "Walbaum Display" },
    { value: "Yu Mincho Light", label: "Yu Mincho Light" },
    { value: "Ink Free", label: "Ink Free" },
  ];

  const handleTemplateText = (value) => {
    dispatch(templateText1(value));
  };
  const defaultContent = "<p>Hello, this is the default content!</p>";

  // useEffect(() => {
  //   dispatch(getUserEventById());
  // }, []);

  return (
    <div>
      <Navbar />
      <div className="container mid-title">
        <div className="mid-title-left">Template Text </div>
      </div>

      <div className="main-container">
        <div className="container bg-w">
          <Link className="flot-left-btn mt-4 mb-4" to={"/shiv_app/template"}>
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

          <div className="font-div items-center justify-center w-full gap-2  ">
            <div className="event-top-row">
              {selectedEvents?.event_name?.map((ev, index) => (
                <div
                  className="text-white bg-[#00565f] p-2 rounded-md cursor-pointer font-box2"
                  key={index}
                >
                  {ev}
                </div>
              ))}
              <div className="crl"></div>
            </div>
            <div className="crl"></div>

            <div className="font-box">
              <div className="font-box3">
                <label htmlFor="font">Choose a Font :</label>
                <select
                  name="font"
                  id="font"
                  value={selectedFont}
                  onChange={(e) => setSelectedFonts(e.target.value)}
                  className="border-2  border-gray-400 ml-5 p-2"
                >
                  {fonts.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="font-box4">
              {/* <textarea
            className="w-96 h-96 "
            style={{ fontFamily: `${selectedFont}` }}
          ></textarea> */}
              <ReactQuill
                theme="snow"
                value={text}
                onChange={handleTemplateText}
                modules={modules}
                className="h-96"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
          <div className="crl"></div>
          <div className="font-box5 mr-10 h-fit position-relative ">
            <Link
              to={"/shiv_app/preview"}
              className="cursor-pointer bg-[#00565f] rounded-md px-4 py-2 text-white w-52 font-semibold no-underline"
            >
              Preview Invitation
            </Link>
          </div>
          <div className="crl"></div>
        </div>
        <div className="crl"></div>
      </div>
    </div>
  );
};

export default TemplateText;
