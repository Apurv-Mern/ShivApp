import React, { useEffect, useState } from "react";
import {
  WeddingWebsiteCode,
  getMarriageDetailss2,
} from "../../../redux/marriageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import img1 from "../../../assets/images/7.gif";

const CodePage = () => {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const navigate = useNavigate();
  const marriageDetails = useSelector(
    (state) => state.marriage.marriageDetails
  );
  const weddingCeremonies = useSelector(
    (state) => state.marriage.weddingCeremonies
  );
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    if (code) {
      dispatch(WeddingWebsiteCode(code))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigate(
              `/wedding_website/site/${marriageDetails[0]?.bride_name}/weds/${marriageDetails[0]?.groom_name}`
            );
          }
          localStorage.setItem("code", code);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Please enter valid code");
        });
    } else {
      toast.error("Enter your 6-digit code");
    }
  };

  useEffect(() => {
    dispatch(getMarriageDetailss2(user_id));
  }, []);

  return (
    <div className="otp-number">
      <div className="otp-number-logo">
        <img src={img1} className="logo" alt="icon" />{" "}
      </div>

      <div className="otp-top-box">
        <div className="otp-input">
          <h4>Please enter your 6 digit code</h4>
          <OtpInput
            value={code}
            onChange={setCode}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="otp-btn">
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default CodePage;
