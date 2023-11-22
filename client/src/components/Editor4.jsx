import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { updatessTempText1 } from "../redux/templateSlice";

const Editor4 = () => {
  const dispatch = useDispatch();
  const sstext1 = useSelector((state) => state.image.ssTempText1);

  const handleTemplateText1 = (value) => {
    // console.log(value);
    dispatch(updatessTempText1(value));
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
    <div>
      <ReactQuill
        value={sstext1} // Value is not taking functions
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

export default Editor4;
