import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { templateText1, templateText2 } from "../redux/templateSlice";

const Editor = () => {
  const dispatch = useDispatch();
  const text1 = useSelector((state) => state.image.tempText1);

  const handleTemplateText1 = (value) => {
    dispatch(templateText1(value));
  };
  const setinvitationTypeofgroup = useSelector(
    (state) => state.image.invitationType
  );

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
        value={text1} // Value is not taking functions
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

export default Editor;
