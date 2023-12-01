import React from "react";
import ImageUpload from "./ImageUpload";
import img1 from "../../../assets/wedding/images/love3.png";
import imgL from "../../../assets/wedding/images/img1.png";
import cal from "../../../assets/wedding/images/cal.png";
import lo from "../../../assets/wedding/images/lo.png";
import love from "../../../assets/wedding/images/love2.png";

const Calendar = () => {
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
            <div className="col-lg-6 col-md-12 web-img">
              {/* <img
                src="assets/images/img1.png"
                className="main-image-1"
                alt="img"
              /> */}

              <img src={imgL} className="main-image-1" alt="img" />
            </div>
            <div className="col-lg-6 col-md-12 web-content-box">
              <div className="web-icon-1">
                <img src={img1} className="main-image-1" alt="img" />
              </div>
              <div className="web-icon-2">
                <div className="web-title-n1">Mehendi</div>
                <div className="web-date-box">
                  <img src={cal} className="main-cal-1" alt="img" />
                  July 19, 2021 10:00 AM
                </div>
                <div className="web-ad-box">
                  <img src={lo} className="main-lo-1" alt="img" />
                  Taj Mahal Palace Hotel, Colaba, Mumbai
                </div>
                <div className="web-dress-box">Dress Code : Bright & bling</div>
              </div>
              <div className="web-icon-3">
                <img src={img1} className="main-image-1" alt="img" />
              </div>
            </div>
          </div>
          <div className="row top-wedding-panel wedding-p2">
            <div className="col-lg-6 col-md-12 web-content-box">
              <div className="web-icon-1">
                <img src={img1} className="main-image-1" alt="img" />
              </div>
              <div className="web-icon-2">
                <div className="web-title-n1">Haldi / Sangeet</div>
                <div className="web-date-box">
                  <img src={cal} className="main-cal-1" alt="img" />
                  July 19, 2021 10:00 AM
                </div>
                <div className="web-ad-box">
                  <img src={lo} className="main-lo-1" alt="img" />
                  Taj Mahal Palace Hotel, Colaba, Mumbai
                </div>
                <div className="web-dress-box">
                  {" "}
                  Dress Code : Bright & bling
                </div>
              </div>
              <div className="web-icon-3">
                <img src={img1} className="main-image-1" alt="img" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 web-img">
              <img src={imgL} className="main-image-1" alt="img" />
            </div>
          </div>
          <div className="row top-wedding-panel">
            <div className="col-lg-6 col-md-12 web-img">
              <img src={imgL} className="main-image-1" alt="img" />
            </div>
            <div className="col-lg-6 col-md-12 web-content-box">
              <div className="web-icon-1">
                <img src={img1} className="main-image-1" alt="img" />
              </div>
              <div className="web-icon-2">
                <div className="web-title-n1">Wedding</div>
                <div className="web-date-box">
                  <img src={cal} className="main-cal-1" alt="img" />
                  July 19, 2021 10:00 AM
                </div>
                <div className="web-ad-box">
                  <img src={lo} className="main-lo-1" alt="img" />
                  Taj Mahal Palace Hotel, Colaba, Mumbai
                </div>
                <div className="web-dress-box">
                  {" "}
                  Dress Code : Bright & bling
                </div>
              </div>
              <div className="web-icon-3">
                <img src={img1} className="main-image-1" alt="img" />
              </div>
            </div>
          </div>
          <div className="row top-wedding-panel wedding-p2">
            <div className="col-lg-6 col-md-12 web-content-box">
              <div className="web-icon-1">
                <img src={img1} className="main-image-1" alt="img" />
              </div>
              <div className="web-icon-2">
                <div className="web-title-n1">Reception</div>
                <div className="web-date-box">
                  <img src={cal} className="main-cal-1" alt="img" />
                  July 19, 2021 10:00 AM
                </div>
                <div className="web-ad-box">
                  <img src={lo} className="main-lo-1" alt="img" />
                  Taj Mahal Palace Hotel, Colaba, Mumbai
                </div>
                <div className="web-dress-box">
                  {" "}
                  Dress Code : Bright & bling
                </div>
              </div>
              <div className="web-icon-3">
                <img src={img1} className="main-image-1" alt="img" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12  web-img">
              <img src={imgL} className="main-image-1" alt="img" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
