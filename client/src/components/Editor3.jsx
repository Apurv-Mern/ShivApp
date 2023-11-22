import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { engagedAllText } from "../redux/templateSlice";

const Editor3 = () => {
  const dispatch = useDispatch();

  const event2text = useSelector((state) => state.image.engagedText);

  const handleTemplateText1 = (value) => {
    dispatch(engagedAllText(value));
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
  // const textToDisplay = eventName === "Wedding" ? text1 : event2text;

  return (
    <div>
      <ReactQuill
        value={event2text} // Value is not taking functions
        onChange={handleTemplateText1}
        className=" h-96 "
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
    </div>
  );
};

export default Editor3;
