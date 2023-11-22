import React, { useCallback, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setinvitationType,
  templateText1,
  templateText2,
  updateTempText1WithInvitationType,
} from "../redux/templateSlice";
import { useEffect } from "react";

const EditorSS = () => {
  const dispatch = useDispatch();
  const sstext1 = useSelector((state) => state.image.ssTempText1);
  const setinvitationTypeofgroup = useSelector(
    (state) => state.image.invitationType
  );
  const setinvitationTypeStyling = useSelector(
    (state) => state.image.setinvitationTypeStyling
  );

  const handleTemplateForInvitationType = (value) => {
    console.log(value);
    dispatch(setinvitationType(value));
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

  console.log("setinvitationTypeStyling", setinvitationTypeStyling);

  return (
    <div>
      <ReactQuill
        value={setinvitationTypeofgroup} // Value is not taking functions
        onChange={handleTemplateForInvitationType}
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

export default EditorSS;
