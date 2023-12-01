import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";

const ImageUpload = ({ defaultImage, eventId }) => {
  const [image, setImage] = useState(defaultImage);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImageUrl = e.target.result;
        setImage(uploadedImageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="banner-container">
      <img src={image} className="d-block w-100" alt="banner" />
      <label htmlFor={`file-upload-${eventId}`} className="upload-icon">
        <BsPencilSquare />
      </label>
      <input
        type="file"
        id={`file-upload-${eventId}`}
        accept="image/*"
        onChange={handleImageUpload}
        className="file-upload"
      />
    </div>
  );
};

export default ImageUpload;
