import React, { useState } from "react";
import img1 from "../../assets/images/mail-con.png";
import img2 from "../../assets/images/call-icon.png";
import img3 from "../../assets/images/watsup.png";
import Footer from "../../components/Landing Page Components/Footer";
import Navbar from "../../components/Landing Page Components/Navbar";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { updateContactDetails } from "../../redux/ContactUsSlice";

const Contactus = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    queryType: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.contactNo,
      query: formData.queryType,
      comment: formData.message,
    };

    console.log(data);
    dispatch(updateContactDetails(data));
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Contact Us for booking in demos or any customer queries via email, phone, call or WhatsApp. We are available Monday to Sunday."
        />
        <link
          rel="canonical"
          href="https://shivappdev.24livehost.com/shiv_app/contactus"
        ></link>

        <title>Contact Us and book a Demo | SHIV</title>
      </Helmet>
      <div className="front-page-container">
        <Navbar />
        <section className="middle-part web-banner inner-page-banner1">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="inner-page-title">
                  WE PRIDE OURSELVES WITH OUR <br /> CUSTOMER SERVICE
                </h2>
              </div>
            </div>
          </div>
        </section>
        <section className="middle-part new-about">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="new-title">CONTACT US</h3>
              </div>

              <div className="col-md-12 mb-md-0 mb-5 contact-content">
                <form
                  id="contact-form"
                  name="contact-form"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <label htmlFor="name" className="">
                          Your name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <label htmlFor="email" className="">
                          Your email
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <label htmlFor="contact-no" className="">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          id="contact-no"
                          name="contactNo"
                          className="form-control"
                          value={formData.contactNo}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <label htmlFor="contact-no" className="">
                          Query Type
                        </label>
                        <select
                          className="form-select"
                          name="queryType"
                          value={formData.queryType}
                          onChange={handleInputChange}
                        >
                          <option> Please Select Query</option>
                          <option>Demo Request</option>
                          <option>General Query</option>
                          <option>Design Query</option>
                          <option>Packages Query</option>
                          <option>Technical Query</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="md-form">
                        <label htmlFor="message">Your message</label>
                        <textarea
                          type="text"
                          id="message"
                          name="message"
                          rows="2"
                          className="form-control md-textarea"
                          value={formData.message}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <label htmlFor="contact-no" className="">
                          Attach any images or documents if required
                        </label>
                        <div className="d-flex justify-right">
                          <div className="btn btn-primary btn-rounded">
                            <label
                              className="form-label text-white m-1"
                              htmlFor="customFile1"
                            >
                              Choose file
                            </label>
                            <input
                              type="file"
                              className="form-control d-none"
                              id="customFile1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary primary-contect"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Send
                  </button>
                </form>
                <div className="status"></div>
              </div>

              <div className="row contact-content-1">
                <div className="col-xl-4 col-lg-4 col-md-4 col-lg-12">
                  <div className="contact-1">
                    <img src={img1} className="contact-icon" alt="icon" />
                    <div className="contact-2">
                      {" "}
                      Email us at
                      <br />
                      <a href="mailto:info@shiv-worldwide.com">
                        info@shiv-worldwide.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-lg-12">
                  <div className="contact-1">
                    <img src={img2} className="contact-icon" alt="icon" />
                    <div className="contact-2">
                      If you prefer speaking to us call us
                      <br />
                      Monday – Friday 8am – 8pm
                      <br /> Saturday 9am – 5pm
                      <br /> Sunday 10am – 5pm <br /> +44 7387 959 487
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-lg-12">
                  <div className="contact-1">
                    <img src={img3} className="contact-icon" alt="icon" />
                    <div className="contact-2">
                      We are available on WhatsApp
                      <br />
                      Monday – Friday 8am – 8pm
                      <br /> Saturday 9am – 5pm
                      <br /> Sunday 10am – 5pm
                      <br /> +44 7387 959 487
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="newse-part">
          <div className="container">
            <div className="row newselatter">
              <div className="col-xl-6 col-md-6 col-lg-12">
                <h2>Newsletter</h2>
                <p>
                  Sign up to our mailing list for promotional offers and FREE
                  wedding tips and ideas to help you organise your wedding
                  events.
                </p>
              </div>
              <div className="col-xl-6 col-md-6 col-lg-12">
                <form className="f-newse" action="" method="post">
                  <div className="input-prepend">
                    <span className="add-on">
                      <i className="icon-envelope"></i>
                    </span>
                    <input
                      type="text"
                      id=""
                      name=""
                      className="n-input"
                      placeholder="your@email.com"
                    />
                  </div>
                  <br />
                </form>
                <button
                  type="submit"
                  className="btn btn-primary primary-contect"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header1">
                  <button
                    type="button"
                    className="btn-close close1"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body query-text">
                  Thank you for your query.<br></br>A member of our team aim to
                  come back to you within 24 hours If your query is urgent
                  please call us.<br></br>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal2"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header1">
                  <button
                    type="button"
                    className="btn-close close1"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body query-text">
                  Thank you for registering with us.
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Contactus;
