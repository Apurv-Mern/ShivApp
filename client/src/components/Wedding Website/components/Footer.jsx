import React from "react";
import img1 from "../../../assets/wedding/images/logo-footer.png";

const Footer = () => {
  return (
    <div>
      <section className="web-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <img src={img1} className="d-footer-img" alt="images" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
