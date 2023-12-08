import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import img1 from "../../../assets/wedding/images/love3.png";
import imgL from "../../../assets/wedding/images/img1.png";
import cal from "../../../assets/wedding/images/cal.png";
import lo from "../../../assets/wedding/images/lo.png";
import love from "../../../assets/wedding/images/love2.png";
import { useDispatch, useSelector } from "react-redux";
import { WeddingWebsiteCode } from "../../../redux/marriageSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const code = localStorage.getItem("code");
  const weddingCeremonies = useSelector(
    (state) => state.marriage.weddingCeremonies
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const openModal = (index) => {
    setSelectedImageIndex(index);

    console.log("Select", index);
  };

  const closeModal = () => {
    setSelectedImageIndex(selectedImageIndex);
    console.log("close Selected", selectedImageIndex);
  };

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

  useEffect(() => {
    dispatch(WeddingWebsiteCode(code));
  }, []);

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

          {weddingCeremonies?.map((item, index) => (
            <div className="row top-wedding-panel">
              <div className="col-lg-6 col-md-12 web-img">
                <ImageUpload
                  defaultImage={imgL}
                  eventId={index}
                  className="d-wdeeing-img"
                  alt="icon"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => openModal(index)}
                />
                <div className="crl"></div>
              </div>

              <div className="col-lg-6 col-md-12 web-content-box">
                <div className="web-icon-3">
                  <img src={img1} className="main-image-1" alt="img" />
                </div>
                <div className="web-icon-2">
                  <div className="web-title-n1">{item.ceremony_name}</div>
                  <div className="web-date-box">
                    <img src={cal} className="main-cal-1" alt="img" />
                    {formatDateTime(item.ceremony_time)}
                  </div>
                  <div className="web-ad-box">
                    <img src={lo} className="main-lo-1" alt="img" />
                    {item.ceremony_venue}
                  </div>
                  <div className="crl"></div>
                </div>
                <div className="web-icon-3">
                  <img src={img1} className="main-image-1" alt="img" />
                </div>
                <div className="crl"></div>
              </div>
              <div className="crl"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Calendar;
