import React from "react";
import ImageUpload from "./ImageUpload";
import img1 from "../../../assets/wedding/images/love3.png";
import imgL from "../../../assets/wedding/images/img1.png";
import cal from "../../../assets/wedding/images/cal.png";
import lo from "../../../assets/wedding/images/lo.png";
import love from "../../../assets/wedding/images/love2.png";
import { useLocation } from "react-router-dom";

const Calendar = () => {
  const {
    state: { weddingCeremonies },
  } = useLocation();
  console.log(weddingCeremonies);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";

    const formattedDate = new Date(dateTimeString).toLocaleString("en-US", {
      weekday: "long",
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formattedDate;
  };
  return (
    <div id="calendar">
      <section className="web-inner-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="web-icon-top">
                <img src={love} className="d-love" alt="icon" />
              </div>
              <div className="web-top-title"> Wedding Calendar </div>
            </div>
          </div>
          <div className="row top-wedding-panel">
            <div className="col-lg-6 col-md-12 web-content-box">
              {weddingCeremonies?.map(
                ({ ceremony_name, ceremony_time, ceremony_venue }) => (
                  <>
                    <div className="col-lg-6 col-md-12 web-img">
                      <img src={imgL} className="main-image-1" alt="img" />
                    </div>
                    <div className="web-icon-3">
                      <img src={img1} className="main-image-1" alt="img" />
                    </div>
                    <div className="web-icon-2">
                      <div className="web-title-n1">{ceremony_name}</div>
                      <div className="web-date-box">
                        <img src={cal} className="main-cal-1" alt="img" />
                        {formatDateTime(ceremony_time)}
                      </div>
                      <div className="web-ad-box">
                        <img src={lo} className="main-lo-1" alt="img" />
                        {ceremony_venue}
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
