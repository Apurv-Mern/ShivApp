import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { saveTheDateText, thankYouText } from "../redux/templateSlice";

const SaveTheDateEditor = () => {
  const dispatch = useDispatch();
  //   const thankYou = useSelector((state) => state.image.thankYou);
  const saveTheDate = useSelector((state) => state.image.saveTheDate);

  const handleTemplateText1 = (value) => {
    console.log(value);

    dispatch(saveTheDateText(value));
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
  // const textToDisplay = setinvitationTypeofgroup+text1;

  return (
    <div>
      <ReactQuill
        value={saveTheDate} // Value is not taking functions
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

export default SaveTheDateEditor;
