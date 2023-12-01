import React, { useEffect, useState } from "react";

const Caraousel = ({ galleryArray, selected }) => {
  const [latest, setLatest] = useState(selected);

  useEffect(() => {
    setLatest(selected);
  }, [selected]);

  const handlePreviousClick = () => {
    const newLatest = (latest - 1 + galleryArray.length) % galleryArray.length;
    setLatest(newLatest);
  };

  const handleNextClick = () => {
    const newLatest = (latest + 1) % galleryArray.length;
    setLatest(newLatest);
  };

  return (
    <>
      <div id="carouselExample" className="carousel carousel-wedd slide ">
        <div className="carousel-inner">
          {galleryArray.map((image, index) => (
            <div
              className={`carousel-item ${index === latest ? "active" : ""}`}
              key={index}
            >
              <img
                src={image}
                className="d-block w-100"
                alt={`Image ${index}`}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
          onClick={handlePreviousClick}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
          onClick={handleNextClick}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Caraousel;
