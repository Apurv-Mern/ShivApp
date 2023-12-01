import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import bannerImage from "../../../assets/wedding/images/banner.png";
const Home = () => {
  return (
    <div id="home">
      <section className="middle-part web-banner">
        <div
          id="carouselExampleCaptions"
          className="carousel carousel-wedd slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="banner-container">
                <img src={bannerImage} className="d-block w-100" alt="banner" />
                <label htmlFor="file-upload" className="upload-icon">
                  <BsPencilSquare />
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  // onChange={handleImageUpload}
                  className="file-upload"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
