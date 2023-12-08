import React, { useState } from "react";
import {
  WeddingWebsiteCode,
  getMarriageDetailss,
} from "../../../redux/marriageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";

const CodePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const marriageDetails = useSelector(
    (state) => state.marriage.marriageDetails
  );
  const weddingCeremonies = useSelector(
    (state) => state.marriage.weddingCeremonies
  );
  const [code, setCode] = useState("");

  //   const handleOtpChange = (e) => {
  //     const newCode = e.target.value;

  //     setCode(newCode);
  //   };

  console.log(code);

  const handleSubmit = async () => {
    dispatch(getMarriageDetailss());

    const res = await dispatch(WeddingWebsiteCode(code));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(
        `/wedding_website/site/${marriageDetails[0]?.bride_name}/weds/${marriageDetails[0]?.groom_name}`,
        { state: { weddingCeremonies } }
      );
    }
  };

  return (
    <div>
      <OtpInput
        value={code}
        onChange={setCode}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CodePage;
