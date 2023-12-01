import React from "react";
import Sidebar from "./Header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../scss/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { selectImage } from "../redux/templateSlice";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useState } from "react";

import img1 from "../assets/images/sikh/Aqua-Anand-Karaj.png";
import img2 from "../assets/images/sikh/Bhangra-Burst.png";
import img3 from "../assets/images/indian/Blue-Peacock.png";
import img4 from "../assets/images/sikh/Celebration.png";
import img5 from "../assets/images/indian/Dancing-in-red.png";
import img6 from "../assets/images/universal/Dark-Green-Flowers.png";
import img7 from "../assets/images/sikh/Elegant-Aqua.png";
import img8 from "../assets/images/indian/Elegant-Ganesh.png";
import img9 from "../assets/images/indian/Gold-Elegant-Ganesh.png";
import img10 from "../assets/images/indian/Golden-lephants.png";
import img11 from "../assets/images/indian/Golden-Sky.png";
import img12 from "../assets/images/muslim/Green-sunset.png";
import img13 from "../assets/images/sikh/Horizon.png";
import img14 from "../assets/images/indian/Lilac.png";
import img15 from "../assets/images/universal/Love.png";
import img16 from "../assets/images/universal/Mr-Mrs.png";
import img17 from "../assets/images/universal/Navy-Love.png";
import img18 from "../assets/images/muslim/Navy-nights.png";
import img19 from "../assets/images/indian/Pink-Ganesh.png";
import img20 from "../assets/images/indian/Pink-moonlight.png";
import img21 from "../assets/images/universal/Purple-Hearts.png";
import img22 from "../assets/images/sikh/Red-Bouquet.png";
import img23 from "../assets/images/indian/Red-OM.png";
import img24 from "../assets/images/universal/Royal-Blue-Hearts.png";
import img25 from "../assets/images/universal/Royal-Blue-Mandala.png";
import img26 from "../assets/images/muslim/Shadows-of-lime.png";
import img28 from "../assets/images/sikh/Sunrise-Khanda.png";
import img29 from "../assets/images/indian/Lilac.png";
import img30 from "../assets/images/indian/Tie-the-Knot.png";
import img31 from "../assets/images/indian/Turquoise-Ganesh.png";
import img32 from "../assets/images/indian/Turquoise-Splash.png";
import GreenGarlandOM from "../assets/images/universal/Green-Garland-OM.png";
import TraditionalGanesh from "../assets/images/universal/Traditional-Ganesh.png";
import TealGreenOM from "../assets/images/universal/Teal-Green-OM.png";
import Sunflower from "../assets/images/universal/Sunflower.png";
import Indo from "../assets/images/universal/Indo-Italian.jpg";
import Lemon from "../assets/images/universal/lemon-trees.jpg";
import img33 from "../assets/images/indian/WhiteElegantAnandKaraj.png";

const Template = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null); // Add this state variable
  const selectedImage = useSelector((state) => state.image.selectedTemplate);
  // console.log(selectedImage);
  const eventName = useSelector((state) => state.event.eventState);
  const paymentStatus = useSelector((state) => state.payment.paymentStatus);
  const paymentId = paymentStatus["payment status: "]?.status;

  //? TEMPLATES
  const Templates = [
    { title: "Aqua Anand Karaj", image: img1 },
    { title: "Bhangra Burst", image: img2 },
    { title: "Blue Peacock", image: img3 },
    { title: "Celebration", image: img4 },
    { title: "Dancing in red", image: img5 },
    { title: "Dark Green Flowers", image: img6 },
    { title: "Elegant Aqua", image: img7 },
    { title: "Elegant Ganesh", image: img8 },
    { title: "Gold Elegant Ganesh", image: img9 },
    { title: "Golden Elephants", image: img10 },
    { title: "Golden Sky", image: img11 },
    { title: "Green Garland OM", image: GreenGarlandOM },
    { title: "Green Sunset", image: img12 },
    { title: "Horizon", image: img13 },
    { title: "Indo Italian", image: Indo },

    { title: "Lemon Trees", image: Lemon },
    { title: "Love", image: img15 },
    { title: "Lilac", image: img29 },
    { title: "Mr & Mrs", image: img16 },
    { title: "Navy Love", image: img17 },
    { title: "Navy Nights", image: img18 },
    { title: " Pink Ganesh", image: img19 },
    { title: "Pink Moonlight", image: img20 },
    { title: "Purple Hearts", image: img21 },
    { title: "Red Bouquet", image: img22 },
    { title: "Red OM", image: img23 },
    { title: "Royal Blue Hearts ", image: img24 },
    { title: "Royal Blue Mandala", image: img25 },
    { title: "Shadows Of Lime", image: img26 },
    { title: "Sunflower", image: Sunflower },

    { title: "Sunrise Khanda", image: img28 },
    { title: "Teal Green OM", image: TealGreenOM },
    { title: "Tie the Knot", image: img30 },
    { title: "Traditional Ganesh", image: TraditionalGanesh },
    { title: "Turquoise Ganesh", image: img31 },
    { title: "Turquoise Splash", image: img32 },
    { title: "White Elegant Anand Karaj", image: img33 },
  ];

  const handleTemplate = (temp) => {
    dispatch(selectImage(temp));
    toast.success("Template selected");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      const image = new Image();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        image.src = fileContent;

        image.onload = () => {
          if (image.width === 1920 && image.height === 1200) {
            // ?The selected file has the correct resolution
            setSelectedFile(file);
            dispatch(selectImage(fileContent));
          } else {
            // ?The selected file doesn't have the correct resolution
            toast.error("File resolution must be 1920 x 1200 px");
          }
        };
      };

      reader.readAsDataURL(file);
    } else {
      console.log("no file selected");
    }
  };

  const handleNext = () => {
    if (!selectedImage) {
      toast.error("Please select one template");
    } else {
      navigate("/contacts");
    }
  };

  return (
    <>
      <Navbar />
      <div className="crl"></div>
      <div className="container card-b-1">
        <div className="row">
          <h6 className="col-md-12 welcome-text">
            <h4 className="heading"> Design</h4>
            Select the design you like or simple upload your own in size 1920 x
            1200. Ensure if you are uploading your own design, you leave enough
            readable space in the middle for your invitation copy.
            <br></br> <br></br>
          </h6>
        </div>
        <div className="crl"></div>
      </div>
      <div className="crl"></div>
      <div className="main-container">
        <div className="container bg-w">
          <div className="btn-box ">
            <Link
              className="flot-left-btn"
              to={
                eventName === "Wedding"
                  ? "/foodDrink"
                  : paymentId === "Success"
                  ? "/myEvents"
                  : `/packages/${eventName}`
              }
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>{" "}
              Back
            </Link>

            <button className="flot-tight-btn" onClick={handleNext}>
              Next{" "}
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>

            <div className="crl"></div>
          </div>
          <div className="crl"></div>

          {/* // ? Dropbox */}
          <div
            className="w-full h-full flex items-center justify-center"
            onChange={handleFileChange}
          >
            File Resolution should be 1920 x 1200 px
            <form
              id="file-upload-form"
              className="fileUpload"
              action="<?php echo $_SERVER['PHP_SELF'] ?>"
            >
              <input id="file-upload" type="file" name="fileUpload" />
              <div>
                {selectedFile ? (
                  <h4 id="file-drag">Selected File : {selectedFile?.name}</h4>
                ) : (
                  <label for="file-upload" id="file-drag">
                    Select a file to upload
                    <br />
                    OR
                    <br />
                    Drag a file into this box
                    <br />
                    <br />
                    <span id="file-upload-btn" className="button">
                      Add a file
                    </span>
                  </label>
                )}
              </div>
              <progress id="file-progress" value="0">
                <span>0</span>%
              </progress>
              <output for="file-upload" id="messages"></output>
            </form>
            <div className="crl"></div>
          </div>
          <div className="crl"></div>
          <div className="grid grid-cols-1 gap-1 main-box ">
            <h2 className="text-lg font-bold eve-title temp">
              Select Your Template
            </h2>

            <div className=" w-full h-fit mt-3 mx-auto justify-center bottom-padding">
              {Templates.map((t, index) => (
                <div
                  className={`card-box ${
                    selectedImage === t.image
                      ? "border-1 border-dashed border-blue-800 scale-105 shadow-lg  "
                      : "border-1 border-gray-400 "
                  }`}
                >
                  <output for="file-upload" id="messages"></output>
                  <img
                    key={index}
                    className="w-72 h-72"
                    src={t.image}
                    alt="Sunset in the mountains"
                    onClick={() => handleTemplate(t.image)}
                  />
                  <div className="px-6 py-2">
                    <div className="font-bold text-xl mb-2">{t.title}</div>
                    {/* <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla!
                    </p> */}
                  </div>
                </div>
              ))}
              <div className="crl"></div>
            </div>

            <div className="crl"></div>

            {/* <div className="position-absolute bottom-0 start-50 translate-middle">
              <div aria-label="Page navigation mx-auto">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}

            <div className="crl"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
