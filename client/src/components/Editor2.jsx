import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  footerText,
  templateText1,
  templateText2,
  templateText3,
  temp3Ceremony,
} from "../redux/templateSlice";

const Editor2 = () => {
  const dispatch = useDispatch();
  const ceremonies = useSelector((state) => state.image.dynamicCeremony);
  // console.log(ceremonies);
  // ? DONT NEED TO PASS THE VALUE ARGUMENT IN THE FUNCTION CALL, BECAUSE REACT QUILL SEND VALUE PARAMETER AUTOMATIC.
  const handleTemplateText3 = (value) => {
    dispatch(temp3Ceremony(value));
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
        value={ceremonies}
        onChange={handleTemplateText3}
        className=" h-96"
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

export default Editor2;
