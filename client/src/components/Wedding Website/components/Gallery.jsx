import React, { useState } from "react";
import Caraousel from "./Caraousel";
import ImageUpload from "./ImageUpload";
import love from "../../../assets/wedding/images/love2.png";

import img1 from "../../../assets/wedding/images/wm1.png";
import img2 from "../../../assets/wedding/images/wm2.png";
import img3 from "../../../assets/wedding/images/wm3.png";
import img4 from "../../../assets/wedding/images/wdeeing1.png";
import img5 from "../../../assets/wedding/images/wm3.png";
import img6 from "../../../assets/wedding/images/wm1.png";
import img7 from "../../../assets/wedding/images/wdeeing1.png";
import img8 from "../../../assets/wedding/images/wm2.png";
import img9 from "../../../assets/wedding/images/wm1.png";
import img10 from "../../../assets/wedding/images/wm2.png";
import img11 from "../../../assets/wedding/images/wm3.png";
import img12 from "../../../assets/wedding/images/wdeeing1.png";
import img13 from "../../../assets/wedding/images/wm3.png";
import img14 from "../../../assets/wedding/images/wm1.png";
import img15 from "../../../assets/wedding/images/wdeeing1.png";
import img16 from "../../../assets/wedding/images/wm2.png";
import img17 from "../../../assets/wedding/images/wm1.png";
import img18 from "../../../assets/wedding/images/wm2.png";
import img19 from "../../../assets/wedding/images/wm3.png";
import img20 from "../../../assets/wedding/images/wdeeing1.png";
import img21 from "../../../assets/wedding/images/wm3.png";
import img22 from "../../../assets/wedding/images/wm1.png";
import img23 from "../../../assets/wedding/images/wdeeing1.png";
import img24 from "../../../assets/wedding/images/wm2.png";

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visibleAll, setVisibleAll] = useState(false);
  const openModal = (index) => {
    setSelectedImageIndex(index);

    console.log("Select", index);
  };

  const closeModal = () => {
    setSelectedImageIndex(selectedImageIndex);
    console.log("close Selected", selectedImageIndex);
  };

  // const galleryImages = [
  //   "assets/images/wm1.png",
  //   "assets/images/wm2.png",
  //   "assets/images/wm3.png",
  //   "assets/images/wdeeing1.png",
  //   "assets/images/wm3.png",
  //   "assets/images/wm1.png",
  //   "assets/images/wdeeing1.png",
  //   "assets/images/wm2.png",
  //   "assets/images/wm1.png",
  //   "assets/images/wm2.png",
  //   "assets/images/wm3.png",
  //   "assets/images/wdeeing1.png",
  //   "assets/images/wm3.png",
  //   "assets/images/wm1.png",
  //   "assets/images/wdeeing1.png",
  //   "assets/images/wm2.png",
  //   "assets/images/wm1.png",
  //   "assets/images/wm2.png",
  //   "assets/images/wm3.png",
  //   "assets/images/wdeeing1.png",
  //   "assets/images/wm3.png",
  //   "assets/images/wm1.png",
  //   "assets/images/wdeeing1.png",
  //   "assets/images/wm2.png",
  // ];

  const galleryImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    img23,
    img24,
  ];

  return (
    <>
      <div id="gallery">
        <section className="web-inner-page our-gallery">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="web-icon-top">
                  <img src={love} className="d-love" alt="icon" />
                </div>
                <div className="web-top-title"> Our Gallery </div>
              </div>
            </div>
            <div className="row">
              {galleryImages.slice(0, 8).map((image, index) => (
                <div key={index} className="col-lg-3 col-md-6 g-img">
                  <ImageUpload
                    defaultImage={image}
                    eventId={index}
                    className="d-wdeeing-img"
                    alt="icon"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => openModal(index)}
                  />
                  {/* <img
                    src={image}
                    className="d-wdeeing-img"
                    alt="icon"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => openModal(index)}
                  /> */}
                </div>
              ))}
              <div className="clearfix"></div>
              <div className="col-md-12 web-img-btn">
                <a>More Photographs </a>

                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog custom-modal-dialog">
            <div className="modal-content ">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  X
                </button>
              </div>

              <div className="modal-body">
                <Caraousel
                  selected={selectedImageIndex}
                  galleryArray={galleryImages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;

// "assets/images/1.jpg",
//     "assets/images/2.jpg",
//     "assets/images/3.jpg",
//     "assets/images/4.jpg",
//     "assets/images/5.jpg",
//     "assets/images/6.jpg",
//     "assets/images/7.jpg",
//     "assets/images/8.jpg",
