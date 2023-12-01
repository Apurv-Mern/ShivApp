import React from "react";
import { Link, input } from "react-router-dom";
import banner from "../assets/banner.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import video from "../assets/video.png";
import pro1 from "../assets/pro1.png";
import pro2 from "../assets/pro2.png";
import pro3 from "../assets/pro3.png";
import pro4 from "../assets/pro4.png";
import weddingImg from "../assets/wedding-img.png";
import temp1 from "../assets/t1.png";
import temp2 from "../assets/t2.png";
import temp3 from "../assets/t3.png";
import temp4 from "../assets/t4.png";
import temp5 from "../assets/t5.png";
import temp6 from "../assets/t6.png";
import temp7 from "../assets/t7.png";
import temp8 from "../assets/t8.png";
import love1 from "../assets/love1.png";

import logo from "../assets/SHIV_logo_anim.gif";
import footerlogo from "../assets/shiv-logo-footer.png";

import facebook from "../assets/facebook.png";
import insta from "../assets/insta.png";
import pinterest from "../assets/pint.png";

import "../scss/LandingPage.css";

const Banner = () => {
  return (
    <div className="home-page-block">
      <header>
        <div className="container-fluid nav-panel-1">
          <div className="container-in">
            <div className="left-panel"></div>
            <div className="logo">
              <img src={logo} className="header-logo" alt="banner" />
            </div>
            <div className="right-penal">
              <Link to="/login"> Login</Link>
              <Link to="/signup">Register</Link>
            </div>
            <div className="crl"></div>
          </div>
          <div className="nav-panel home-page-top-nav">
            <nav className="navbar home-nav navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <div className="navbar-toggler-icon-1"></div>
                  <div className="navbar-toggler-icon-1"></div>
                  <div className="navbar-toggler-icon-1"></div>
                </button>
                <div
                  className=" collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav ms-auto ">
                    <li className="nav-item">
                      <Link
                        className="nav-link mx-2 active"
                        aria-current="page"
                        to="#"
                      >
                        HOME
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link mx-2" to="#">
                        ABOUT US
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link mx-2" to="#">
                        DEMO
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link mx-2 dropdown-toggle"
                        to="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {" "}
                        PACKAGES{" "}
                      </Link>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <li>
                          <Link className="dropdown-item" to="#">
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            Contact us
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link mx-2" to="#">
                        TEMPLATES
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link mx-2" to="#">
                        {" "}
                        CONTACT US
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="crl"></div>
          </div>
          <div className="crl"></div>
        </div>
      </header>
      <section className="middle-part">
        <div
          id="carouselExampleCaptions"
          className="carousel slide landing-banner"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={banner} className="d-block w-100" alt="banner" />
              <div className="carousel-caption d-none d-md-block">
                <div className="row">
                  <div className="col-lg-6 col-md-6 left-b">
                    <img src={banner3} className="banner-img" alt="banner" />
                  </div>
                  <div className="col-lg-6 col-md-6 right-b">
                    <div className="text-b1">
                      <div className="m-text">
                        Unlock the ultimate stress-free event planning
                        experience with us
                      </div>
                      <div className="m-btn">
                        <Link className="" to="#">
                          <button>
                            <img
                              src={video}
                              className="video-img"
                              alt="video"
                            />{" "}
                            Watch demo video{" "}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={banner} className="d-block w-100" alt="banner" />
              <div className="carousel-caption d-none d-md-block">
                <div className="row">
                  <div className="col-lg-6 col-md-6 left-b">
                    <img src={banner4} className="banner-img" alt="banner" />
                  </div>
                  <div className="col-lg-6 col-md-6 right-b">
                    <div className="text-b1">
                      <div className="m-text">
                        With our RSVP data Management services, plan your event
                        to perfection with ease{" "}
                      </div>
                      <div className="m-btn">
                        <Link className="" to="#">
                          <button>
                            <img
                              src={video}
                              className="video-img"
                              alt="video"
                            />{" "}
                            Watch demo video{" "}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
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
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section className="about-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="sub">
                <img src={love1} className="top-l-img" alt="love" />
              </div>
              <h2>
                Celebrate your important moments with shiv heartfelt invitations
                irtually worldwde
              </h2>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="about-text">
                ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
                massa. Vestibulum lacinia arcu eget nulla. className aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos{" "}
              </div>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-3 col-md-6">
              <div className="product">
                <div class="wrapper1">
                  <div class="card">
                    <div class="face front">
                      <img src={pro1} className="pro-img" alt="pro" />
                      <h1 class="text-h1">Party & Events</h1>
                    </div>

                    <div class="face back">
                      <h2 class="text-h2">Party & Events</h2>
                      <p class="text-p">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Harum repellat maiores aperiam nemo officia,
                        praesentium suscipit? Eum voluptate fuga eius accusamus
                        harum cum unde natus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="product">
                <div class="wrapper1">
                  <div class="card">
                    <div class="face front">
                      <img src={pro2} className="pro-img" alt="pro" />
                      <h1 class="text-h1">Birthday party</h1>
                    </div>

                    <div class="face back">
                      <h2 class="text-h2">Birthday party</h2>
                      <p class="text-p">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Harum repellat maiores aperiam nemo officia,
                        praesentium suscipit? Eum voluptate fuga eius accusamus
                        harum cum unde natus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="product">
                <div class="wrapper1">
                  <div class="card">
                    <div class="face front">
                      <img src={pro3} className="pro-img" alt="pro" />
                      <h1 class="text-h1">Wedding party </h1>
                    </div>

                    <div class="face back">
                      <h2 class="text-h2">Wedding party </h2>
                      <p class="text-p">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Harum repellat maiores aperiam nemo officia,
                        praesentium suscipit? Eum voluptate fuga eius accusamus
                        harum cum unde natus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="product">
                <div class="wrapper1">
                  <div class="card">
                    <div class="face front">
                      <img src={pro4} className="pro-img" alt="pro" />
                      <h1 class="text-h1">Rsvp</h1>
                    </div>
                    <div class="face back">
                      <h2 class="text-h2">Rsvp</h2>
                      <p class="text-p">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Harum repellat maiores aperiam nemo officia,
                        praesentium suscipit? Eum voluptate fuga eius accusamus
                        harum cum unde natus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="demo-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="sub">
                <img src={love1} className="top-l-img" alt="love" />
              </div>
              <h2>Demo</h2>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="about-text">
                ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
                massa. Vestibulum lacinia arcu eget nulla. className aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos{" "}
              </div>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="video">
                <video
                  id="video"
                  controls="controls"
                  preload="none"
                  width="600"
                  poster="https://crystallinestudio.com/imgBanner/81-crystalline-banner.jpg"
                >
                  <source
                    id="mp4"
                    src="https://happy.videvo.net/videvo_files/video/premium/partners0115/large_watermarked/BB_44667bcc-0896-4cb4-9cf4-053f777492f3_preview.mp4"
                    type="video/mp4"
                  />
                  <source
                    id="webm"
                    src="https://happy.videvo.net/videvo_files/video/premium/partners0115/large_watermarked/BB_44667bcc-0896-4cb4-9cf4-053f777492f3_preview.mp4"
                    type="video/webm"
                  />
                  <source
                    id="ogv"
                    src="https://happy.videvo.net/videvo_files/video/premium/partners0115/large_watermarked/BB_44667bcc-0896-4cb4-9cf4-053f777492f3_preview.mp4"
                    type="video/ogg"
                  />
                  <track
                    kind="subtitles"
                    label="English subtitles"
                    src="subtitles_en.vtt"
                    srclang="en"
                    default
                  ></track>
                  <track
                    kind="subtitles"
                    label="Deutsche Untertitel"
                    src="subtitles_de.vtt"
                    srclang="de"
                  ></track>
                  <p>
                    Your user agent does not support the HTML5 Video element.
                  </p>
                </video>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </section>
      <section className="packages-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="sub">
                <img src={love1} className="top-l-img" alt="love" />
              </div>
              <h2>Select package and go to invitations then templates</h2>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-3 col-md-6">
              <div className="pakage-box">
                <div className="pakage-box-in">
                  <h4>SILVER PACKAGE - </h4>
                  <div className="pakage-raund">70 GUESTS</div>
                  <div className="price"> £150 / $195</div>
                  <div className="pakage-content">
                    <ul>
                      <li>Invite 1-70 guests </li>
                      <li>Send up to 7 event invitations</li>
                      <li>Receive RSVP for all events</li>
                      <li>
                        Request guests missing contact details (Phone number and
                        email)
                      </li>
                      <li>Send invites via SMS, What’s app or email </li>
                      <li>Guests can RSVP for family members </li>
                      <li>
                        See all your guest details in a readable dashboard{" "}
                      </li>
                      <li>Ask up to 4 questions </li>
                      <li>Delete any questions</li>
                    </ul>
                  </div>
                  <details>
                    <div className="exp">
                      <div className="pakage-content">
                        <ul>
                          <li>Full guest name</li>
                          <li>Guest email address</li>
                          <li>Guest mobile number</li>
                          <li>Attendance to all events</li>
                          <li>Dietary requirements</li>
                          <li>Allergy details </li>
                          <li>Disability details / requirements </li>
                        </ul>
                      </div>
                    </div>
                    <div className="crl"> </div>
                    <summary>Click Here</summary>
                  </details>
                </div>
                <div className="bottom-price">
                  {" "}
                  <Link className="btn" to="#">
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="pakage-box box-pricing-selected">
                <div className="pakage-box-in">
                  <h4>GOLD PACKAGE - </h4>
                  <div className="pakage-raund">70 GUESTS</div>
                  <div className="price">£360 / $475</div>
                  <div className="pakage-content">
                    <ul>
                      <li>1-150 guests </li>
                      <li>Send up to 7 event invitations</li>
                      <li>Receive RSVP for all events</li>
                      <li>
                        Request guests missing contact details (Phone number and
                        email)
                      </li>
                      <li>Send invites via SMS, What’s app or email </li>
                      <li>Guests can RSVP for family members </li>
                      <li>
                        See all your guest details in a readable dashboard{" "}
                      </li>
                      <li>Send RSVP reminders </li>
                      <li>Create photo group </li>
                      <li>Create your seating plan </li>
                      <li>Ask up to 6 questions </li>
                      <li>Delete any questions </li>
                    </ul>
                  </div>
                  <details>
                    <summary>Click Here</summary>
                    <div className="exp">
                      <div className="pakage-content">
                        <ul>
                          <li>Full guest name </li>
                          <li>Guest email address</li>
                          <li>Guest mobile number</li>
                          <li>Attendance to all events</li>
                          <li>Dietary requirements</li>
                          <li>Allergy details </li>
                          <li>Disability details / requirements </li>
                          <li>1st Alcoholic drink preference</li>
                          <li>2nd alcoholic drinks preference</li>
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
                <div className="bottom-price">
                  {" "}
                  <Link className="btn" to="#">
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="pakage-box">
                <div className="pakage-box-in">
                  <h4>PLATINUM PACKAGE – </h4>
                  <div className="pakage-raund">70 GUESTS</div>
                  <div className="price"> £420 / $550 </div>
                  <div className="pakage-content">
                    <ul>
                      <li>Invite 1-250 guests </li>
                      <li>Send up to 7 event invitations</li>
                      <li>Send Thank you card</li>
                      <li>Receive RSVP for all events</li>
                      <li>
                        Request guests missing contact details (Phone number and
                        email)
                      </li>
                      <li>Send invites via SMS, What’s app or email </li>
                      <li>Guests can RSVP for family members </li>
                      <li>
                        See all your guest details in a readable dashboard
                      </li>
                      <li>Send RSVP reminders </li>
                      <li>Create photo groups </li>
                      <li>Create your seating plan </li>
                      <li>Ask up to 10 questions </li>
                      <li>Delete any questions </li>
                      <li>Add your own questions</li>
                    </ul>
                  </div>
                  <details>
                    <summary>Click Here</summary>
                    <div className="exp">
                      <div className="pakage-content">
                        <ul>
                          <li>Full guest name </li>
                          <li>Send up to 7 event invitations</li>
                          <li>Send Thank you card</li>
                          <li>Receive RSVP for all events</li>
                          <li>
                            Request guests missing contact details (Phone number
                            and email)
                          </li>
                          <li>Send invites via SMS, What’s app or email </li>
                          <li>Guests can RSVP for family members </li>
                          <li>
                            See all your guest details in a readable dashboard
                          </li>
                          <li>Send RSVP reminders</li>
                          <li>Create photo groups</li>
                          <li>Create your seating plan</li>
                          <li>Ask up to 24 questions </li>
                          <li>Delete any questions </li>
                          <li>Add your own questions </li>
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
                <div className="bottom-price">
                  {" "}
                  <Link className="btn" to="#">
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="pakage-box box-pricing-selected">
                <div className="pakage-box-in">
                  <h4>DIAMOND PACKAGE – </h4>
                  <div className="pakage-raund">70 GUESTS</div>
                  <div className="price">£720 / $945</div>
                  <div className="pakage-content">
                    <ul>
                      <li>Invite 1-250+ </li>
                      <li>Send up to 7 event invitations</li>
                      <li>Send Thank you card</li>
                      <li>Receive RSVP for all events</li>
                      <li>
                        Request guests missing contact details (Phone number and
                        email)
                      </li>
                      <li>Send invites via SMS, What’s app or email </li>
                      <li>Guests can RSVP for family members </li>
                      <li>
                        See all your guest details in a readable dashboard
                      </li>
                      <li>Send RSVP reminders</li>
                      <li>Create photo groups</li>
                      <li>Create your seating plan</li>
                      <li>Ask up to 24 questions </li>
                      <li>Delete any questions </li>
                      <li>Add your own questions </li>
                    </ul>
                  </div>

                  <details>
                    <summary>Click Here</summary>
                    <div className="exp">
                      <div className="pakage-content">
                        <ul>
                          <li>Full guest name </li>
                          <li>Guest email address</li>
                          <li>Guest mobile number</li>
                          <li>Attendance to all events</li>
                          <li>Dietary requirements</li>
                          <li>Allergy details </li>
                          <li>Disability details / requirements </li>
                          <li>1st Alcoholic drink preference</li>
                          <li>2nd alcoholic drinks preference</li>
                          <li>Highchair requirements </li>
                          <li>Mehndi participation</li>
                          <li>How many hands of mehndi</li>
                          <li>Request a song</li>
                          <li>
                            Where would they like mehndi (back, palms or both
                            hands){" "}
                          </li>
                          <li>Will they require a MUA (Make-up Artist)</li>
                          <li>Will they require a HA (Hair Artist)</li>
                          <li>Will they require assistance with their sari</li>
                          <li>
                            Will they require assistance with their turban
                          </li>
                          <li>
                            Will they require assistance with their dhoti{" "}
                          </li>
                          <li>Flight arrival details </li>
                          <li>Flight departure details</li>
                          <li>Will they require transfers</li>
                          <li>Will they be staying at the event venue </li>
                          <li>How many rooms will they require</li>
                          <li>How old are their children</li>
                          <li>
                            How many extra beds will they need for children
                          </li>
                          <li>
                            Will they be extending their stay after the events
                          </li>
                          <li>Are they staying at another venue close by</li>
                          <li>
                            Would they like to take part in the couples’ dance
                            entertainment
                          </li>
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
                <div className="bottom-price">
                  {" "}
                  <Link className="btn" to="#">
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="temp-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="sub">
                <img src={love1} className="top-l-img" alt="love" />
              </div>
              <h2>Create invitations from here, then select package</h2>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-3 col-md-6">
              <div className="temp-box">
                <img src={temp1} className="template-img" alt="template" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="temp-box">
                <img src={temp2} className="template-img" alt="template" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="temp-box">
                <img src={temp3} className="template-img" alt="template" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="temp-box">
                <img src={temp4} className="template-img" alt="template" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="temp-box">
                <img src={temp5} className="template-img" alt="template" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="temp-box">
                <img src={temp6} className="template-img" alt="template" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="temp-box">
                <img src={temp7} className="template-img" alt="template" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="temp-box">
                <img src={temp8} className="template-img" alt="template" />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="bottom-btn">
                <Link className="btn" to="#">
                  More Template
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="sub">
                <img src={love1} className="top-l-img" alt="love" />
              </div>
              <h2>Get Free Consultation</h2>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-3"></div>
            <div className="col-lg-6 col-md-6">
              <div className="contact-box">
                <div className="contact-top-text">
                  {" "}
                  Live Your Magic And Save Your Precious Love Memories Our Team
                  Of Professional Photographers Is Here To Help You{" "}
                </div>
                <form action="#" method="post">
                  <div className="form-group">
                    <label htmlFor="firstname">Looking For</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputfirstname"
                      name="firstname"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname"> Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputlastname"
                      name="lastname"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneno">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputphoneno"
                      name="phoneno"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Email1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="comments">Comment</label>
                    <textarea
                      name="comments"
                      className="form-control"
                      id="comments"
                    ></textarea>
                  </div>
                  <div className="form-group btn-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      name="create"
                    >
                      Send Mail
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-3  col-md-12">
              <div className="logo">
                <img src={footerlogo} className="header-logo" alt="banner" />
              </div>
            </div>
            <div className="col-lg-3  col-md-4">
              <div className="footer-link">
                <h3>Link</h3>
                <ul>
                  <li>
                    <Link to="#"> Home </Link>
                  </li>
                  <li>
                    <Link to="#">About us</Link>
                  </li>
                  <li>
                    <Link to="#">Services</Link>
                  </li>
                  <li>
                    <Link to="#">invitation Designs </Link>
                  </li>
                  <li>
                    <Link to="#">Contact us</Link>
                  </li>
                  <li>
                    <Link to="#">Terms of use</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy Policy </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3  col-md-4">
              <div className="footer-link">
                <h3>Social Media</h3>
                <div className="midia">
                  <img src={facebook} className="social-midia" alt="social" />
                  <img src={insta} className="social-midia" alt="social" />
                  <img src={pinterest} className="social-midia" alt="social" />
                </div>
                <div className="add-box">
                  <bold>SHIV WORLDWIDE LIMITED </bold> <br></br>
                  ADDRESS: 3rd Floor, 46 Albemarle Street, Mayfair, W1S 4JL
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-md-4">
              <div className="logo">
                <img src={footerlogo} className="header-logo" alt="banner" />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <section className="copy-right">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {" "}
              © Copyright 2023 | | SHIV WORLDWIDE LIMITED | All right reserved.{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
