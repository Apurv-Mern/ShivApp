import React from "react";
import Navbar from "../../components/Landing Page Components/Navbar";
import img1 from "../../assets/images/love5.png";
import img2 from "../../assets/images/right-icon.png";
import Heart from "../../assets/images/lover.png";
import Footer from "../../components/Landing Page Components/Footer";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/signup");
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Local or destination weddings ask guests up to 30 questions and view all details in your personal dashboard to help plan and budget for all your wedding events."
        />
        <link
          rel="canonical"
          href="https://shivappdev.24livehost.com/packages"
        ></link>
        <title>
          SHIV Packages specialise in Asian Wedding e-invites and RSVPs
        </title>
      </Helmet>
      <div className="front-page-container">
        <Navbar />
        <section className="middle-part web-banner inner-page-banner1">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="inner-page-title">
                  WE HAVE PACKAGES TO SUIT
                  <br /> ALL YOUR WEDDING EVENT
                  <br /> REQUIREMENTS{" "}
                </h2>
              </div>
            </div>
          </div>
        </section>
        <section className="middle-part gift-pack">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="new-title">PACKAGES</h3>
              </div>
            </div>
            <div className="row d-flex justify-content-center pakage-row">
              <div className="col-lg-2 col-md-6">
                <div className="product">
                  <div className="wrapper1">
                    <div className="card equal">
                      <div className="face front pack-in-1">
                        <div className="pack-title">BRONZE PACKAGE - £300</div>
                        <ul>
                          <li>100 guests</li>
                          <li>Send Save the Date</li>
                          <li>Send up to 7 event invitations</li>
                          <li>
                            Send up to 2 invites for each couple’s ceremonies
                            (E.g. Haldi and Mehndi)
                          </li>
                          <li>Receive RSVP for all events</li>

                          <li>Personal RSVP dashboard</li>
                          <li>Send RSVP reminders</li>
                          <li>Standard RSVP questions</li>
                          {/* <li>Free wedding website coming soon</li> */}
                        </ul>
                        <br></br>
                        <span className="bottom-f-text">
                          THAT’S ONLY £3.00 PER INVITE PER GUEST
                        </span>
                      </div>

                      <div className="face back">
                        <h2 className="text-h2 text-new-banner">
                          <h3 className="back-title">
                            RSVP DETAILS INCLUDED IN OUR BRONZE PACKAGE{" "}
                          </h3>
                          <div className="questions-right-block">
                            <div className="giftcontent">First name</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Last name</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">Email</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Mobile number</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Guest of</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              What events will you be attending?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Dietary requirements
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Allergies</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require any special assistance
                              (disability)?
                            </div>
                          </div>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-buy-btn">
                  <button className="btn buy1" onClick={handleNavigate}>
                    Buy Now
                  </button>
                  {/* <button className="btn buy2">Buy Later</button> */}
                </div>
                <div className="crl"></div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="product">
                  <div className="wrapper1">
                    <div className="card equal">
                      <div className="face front pack-in-1">
                        <div className="pack-title">
                          {" "}
                          SILVER PACKAGE <br></br> £450
                        </div>
                        <ul>
                          <li>150 guests </li>
                          <li>Send Save the Date</li>
                          <li>Send up to 7 event invitations</li>
                          <li>
                            Send up to 2 invites for each couple’s ceremonies
                            (E.g. Haldi and Mehndi)
                          </li>
                          <li>Receive RSVP for all events</li>

                          <li>Personal RSVP dashboard</li>
                          <li>Send RSVP reminders</li>
                          <li>Ask guests their drinks preference </li>
                          {/* <li>Free wedding website coming soon</li> */}
                        </ul>
                        <br></br>
                        <span className="bottom-f-text">
                          THAT’S ONLY £3.00 PER INVITE PER GUEST
                        </span>
                      </div>

                      <div className="face back">
                        <h2 className="text-h2 text-new-banner">
                          <h3 className="back-title">
                            RSVP DETAILS INCLUDED IN OUR SILVER PACKAGE
                          </h3>

                          <div className="questions-right-block">
                            <div className="giftcontent">First name</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Last name</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">Email</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Mobile number</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Guest of</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              What events will you be attending?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Dietary requirements
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Allergies</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require any special assistance
                              (disability)?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">Drinks preference</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Second drinks preference
                            </div>
                          </div>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-buy-btn">
                  <button className="btn buy1" onClick={handleNavigate}>
                    Buy Now
                  </button>
                  {/* <button className="btn buy2">Buy Later</button> */}
                  <div className="crl"></div>
                </div>
                <div className="crl"></div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="product">
                  <div className="wrapper1">
                    <div className="card">
                      <div className="face front pack-in-1">
                        <div className="pack-title">
                          GOLD PACKAGE <br></br> £575
                        </div>
                        <ul>
                          <li>200 guests</li>
                          <li>Send Save the Date</li>

                          <li>Send up to 7 event invitations</li>
                          <li>
                            Send up to 2 invites for each couple’s ceremonies
                            (E.g. Haldi and Mehndi)
                          </li>
                          <li>Receive RSVP for all events</li>

                          <li>Personal RSVP dashboard</li>
                          <li>Send RSVP reminders</li>
                          <li>
                            Ask guests if they will participate in Mehndi
                            application
                          </li>
                          <li>Total of 15 RSVP questions</li>
                          {/* <li>Free wedding website coming soon</li> */}
                        </ul>
                        <br></br>
                        <span className="bottom-f-text">
                          THAT’S ONLY £2.88 PER INVITE PER GUEST
                        </span>
                      </div>
                      <div className="face back">
                        <h2 className="text-h2 text-new-banner">
                          <h3 className="back-title">
                            RSVP DETAILS INCLUDED IN OUR GOLD PACKAGE
                          </h3>
                          <div className="questions-right-block">
                            <div className="giftcontent">First name</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Last name</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">Email</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Mobile number</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Guest of</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              What events will you be attending (disability)?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Dietary requirements
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Allergies</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require any special assistance?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">Drinks preference</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Second drinks preference
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you participate in mehndi application
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              How many hands would you like mehndi on?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Where would you like your mehndi?
                            </div>
                          </div>

                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Request a song (Please state artist and song name)
                            </div>
                          </div>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-buy-btn">
                  <button className="btn buy1" onClick={handleNavigate}>
                    Buy Now
                  </button>
                  {/* <button className="btn buy2">Buy Later</button> */}
                  <div className="crl"></div>
                </div>
                <div className="crl"></div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="product ">
                  <div className="wrapper1">
                    <div className="card ">
                      <div className="face front pack-in-1">
                        <div className="pack-title">
                          PLATINUM PACKAGE <br></br>£675
                        </div>
                        <ul>
                          <li> 250 guests</li>
                          <li> Send Save the Date</li>
                          <li> Send Thank you e-card</li>
                          <li> Send up to 7 event invitations</li>
                          <li>
                            Send up to 2 invites for each couple’s ceremonies
                            (E.g. Haldi and Mehndi)
                          </li>
                          <li> Receive RSVP for all events</li>
                          <li> Personal RSVP dashboard</li>
                          <li> Send RSVP reminders</li>
                          <li>Ask flight details to out of town guests</li>
                          <li> Delete any questions</li>
                          <li> Total of 20 RSVP questions</li>
                          <li>Log your gifts received from all your events</li>
                          {/* <li> Free wedding website coming soon</li> */}
                        </ul>
                        <br></br>
                        <span className="bottom-f-text">
                          THAT’S ONLY £2.70 PER INVITE PER GUEST
                        </span>
                      </div>

                      <div className="face back">
                        <h2 className="text-h2 text-new-banner" id="style-2">
                          <h3 className="back-title">
                            RSVP DETAILS INCLUDED IN OUR PLATINUM PACKAGE
                          </h3>

                          <div className="questions-right-block">
                            <div className="giftcontent">First name</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Last name</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">Email</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Mobile number</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Guest of</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              What events will you be attending?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Dietary requirements
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Allergies</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require any special assistance
                              (disability)?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">Drinks preference</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Second drinks preference
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you participate in mehndi application
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              How many hands would you like mehndi on?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Where would you like your mehndi?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require Hijab styling?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require saree styling?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require turban styling?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require dhoti styling?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">Flight arrival</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">Flight departure</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Request a song (Please state artist and song name)
                            </div>
                          </div>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-buy-btn">
                  <button className="btn buy1" onClick={handleNavigate}>
                    Buy Now
                  </button>
                  {/* <button className="btn buy2">Buy Later</button> */}
                  <div className="crl"></div>
                </div>
                <div className="crl"></div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="product ">
                  <div className="wrapper1">
                    <div className="card">
                      <div className="face front pack-in-1">
                        <div className="pack-title">
                          DIAMOND PACKAGE <br></br> £775
                        </div>
                        <ul>
                          <li>300 guests</li>
                          <li>Send Save the Date</li>
                          <li>Send Thank you e-card</li>
                          <li>Send up to 7 event invitations</li>
                          <li>
                            Send up to 2 invites for each couple’s ceremonies
                            (E.g. Haldi and Mehndi)
                          </li>
                          <li>Receive RSVP for all events</li>
                          <li>Request guests missing contact details</li>
                          <li>Personal RSVP dashboard</li>
                          <li>Send RSVP reminders</li>
                          <li>Total of 30 questions</li>
                          <li>
                            Ask flight, transfer and accommodation details
                          </li>
                          <li>Delete any questions</li>
                          <li>Total of 30 questions</li>
                          <li>Log your gifts received from all events</li>
                          <li>Suitable for destination weddings </li>
                          {/* <li>Free wedding website coming soon</li> */}
                        </ul>
                        <br></br>
                        <span className="bottom-f-text">
                          THAT’S ONLY £2.58 PER INVITE PER GUEST
                        </span>
                      </div>

                      <div className="face back">
                        <h2 className="text-h2 text-new-banner" id="style-2">
                          <h3 className="back-title">
                            RSVP DETAILS INCLUDED IN OUR DIAMOND PACKAGE
                          </h3>
                          <div className="questions-right-block">
                            <div className="giftcontent">First name</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Last name</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">Email</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Mobile number</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Guest of</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              What events will you be attending?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Dietary requirements
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent"> Allergies</div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require any special assistance
                              (disability)?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Drinks preference{" "}
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Second drinks preference
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you participate in mehndi application
                            </div>
                          </div>{" "}
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              How many hands would you like mehndi on?
                            </div>
                          </div>{" "}
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Where would you like your mehndi?
                            </div>
                          </div>{" "}
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require Hijab styling?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require saree styling?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require turban styling?
                            </div>
                          </div>{" "}
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require dhoti styling?
                            </div>
                          </div>{" "}
                          <div className="questions-right-block">
                            <div className="giftcontent">Flight arrival</div>
                          </div>{" "}
                          <div className="questions-right-block">
                            <div className="giftcontent">Flight departure</div>
                          </div>{" "}
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you require transfers?
                            </div>
                          </div>{" "}
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Will you be staying at the couples’ event venue/
                              hotel?
                            </div>
                          </div>{" "}
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              If yes, how many rooms will you and your family
                              require?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              How many extra beds will you require for any
                              children staying with you?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              How old are your children?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              If not, what hotel will you be staying at?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Would you like to extend your stay at the couples’
                              event venue / hotel?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              If yes, please enter dates of full stay
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Would you like to take part in any excursions?
                            </div>
                          </div>
                          <div className="questions-right-block">
                            <div className="giftcontent">
                              Request a song (Please state artist and song name)
                            </div>
                          </div>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-buy-btn">
                  <button className="btn buy1" onClick={handleNavigate}>
                    Buy Now
                  </button>
                  {/* <button className="btn buy2">Buy Later</button> */}
                  <div className="crl"></div>
                </div>
                <div className="crl"></div>
              </div>
              <div className="crl"></div>
              <div className="col-lg-12">
                <div className="inner-page-title">
                  Want to invite more guests?
                  <br />
                  Up-Grade your package with additional guests when <br /> you
                  make your purchase
                </div>

                <div className="pak-msg">
                  RECEIVE FREE WEDDING CHECKLIST, WEDDING GUIDES AND TIPS <br />{" "}
                  WITH ALL OUR PACKAGES
                </div>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Packages;
