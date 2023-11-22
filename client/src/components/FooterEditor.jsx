import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  footerText,
  templateText1,
  templateText2,
} from "../redux/templateSlice";

const FooterEditor = () => {
  const dispatch = useDispatch();
  const footer = useSelector((state) => state.image.footer);

  // ? DONT NEED TO PASS THE VALUE ARGUMENT IN THE FUNCTION CALL, BECAUSE REACT QUILL SEND VALUE PARAMETER AUTOMATIC.
  const handleFooterText = (value) => {
    dispatch(footerText(value));
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"], // Add any other text formatting options you want
      [{ color: [] }], // Font color option
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <>
      <ReactQuill
        value={footer}
        onChange={handleFooterText}
        className=""
        modules={modules}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "color",
          "link",
          "image",
          "clean",
        ]}
      />
    </>
  );
};

export default FooterEditor;
