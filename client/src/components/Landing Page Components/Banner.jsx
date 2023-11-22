import React from "react";
import img1 from "../../assets/images/banner1.png";

import img2 from "../../assets/images/banner6.png";

import img3 from "../../assets/images/banner2.png";

import img4 from "../../assets/images/banner4.png";
import img5 from "../../assets/images/shiv-logo-footer.png";
import img6 from "../../assets/images/shiv-logo-footer.png";
import img7 from "../../assets/images/imga1.png";
import img8 from "../../assets/images/imga2.png";
import Footer from "./Footer";

const Banner = () => {
  return (
    <div className="container">
      <section className="middle-part web-banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 banner-top-head-1">
              <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="carousel"
              >
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
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={img1} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                      SIMPLICITY
                      <br /> YOUR PERSONAL INVITATIONS, PLANNING AND BUDGETING
                      TOOL -<br /> MANAGE ALL EVENTS IN ONE PLACE
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img src={img2} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                      EXPERTISE <br /> WE UNDERSTAND ASIAN WEDDINGS <br /> AND
                      THE IMPORTANCE OF EVERY CEREMONY
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img src={img3} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                      EXPERIENCE <br />
                      MORE THAN 20 YEARS OF <br /> DIGITAL AND TECHNOLOGY
                      KNOWLEDGE
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img src={img4} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                      BESPOKE
                      <br />
                      OUR TECHNOLOGY IS PURPOSELY BUILT TO CATER FOR
                      <br /> ASIAN WEDDINGS SUCH AS YOURS
                    </div>
                  </div>
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
            </div>
          </div>
        </div>
      </section>

      <section className="middle-part new-about">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="new-title"> Home</h1>
              <p>
                Welcome to <strong>SHIV</strong>, where you can Share Heartfelt
                Invitations Virtually.
                <br />
                <br />
                Our platform helps couples send out e-invitations for all their
                wedding-related events and collects RSVPs in a personal
                dashboard to plan, organise, and budget efficiently.
                <br />
                <br />
                Weddings can be intimate or extravagant. Every couple has their
                unique vision of the perfect day, and here at SHIV, we can help
                you track all your events.
                <br />
                <br />
                Aside from having your wedding the way you always imagined, you
                also want all guests to have a good time and feel looked after.
                While we specialise in Asian weddings, our packages are for any
                type of wedding — we are a diverse and inclusive platform for
                all couples.
                <br />
                <br />
                Here are some key offerings in our packages that make us so
                unique:
              </p>
              <br />
              <ul className="about-part-2">
                <li>Collect, view, and manage your RSVPs centrally</li>
                <li>Send event invitations associated with your wedding</li>
                <li>Plan, budget, and organise each event</li>
                <li>
                  Invite individuals, couples, or families to separate events
                </li>
                <li>
                  Combine invites for multiple events in one single invitation
                </li>
                <li>See a clear dashboard of attendance for all events</li>
                <li>Group guests in your dashboard with ease</li>

                <li>Use our invitation template or upload your own design</li>
                <li>Send electronic Save the Date and Thank You cards</li>
                <li>
                  Customise your event names to fit your culture and traditions
                </li>
                <li>
                  Manage your destination wedding with guest flight plans,
                  transfers, etc.
                </li>
                <li>Reduce costs while being environmentally friendly</li>
                <li>And so much more…</li>
              </ul>
              <br />
              <p>
                SHIV offers you invitation designs for several events. If you
                have a specific theme or invitation design you want to use,
                simply upload it in your dashboard and write your own copy.
                <br />
                <br />
                SHIV allows you the flexibility to invite a whole family to your
                main event while specifying which individual(s) and/or couples
                should attend other pre-wedding ceremonies. Be clear about what
                events your guests and their families are invited to by choosing
                the following options:
              </p>
              <ul className="about-part-2">
                <li>You are invited to;</li>
                <li>You and your partner are invited to;</li>
                <li>You and your family are invited to:</li>
              </ul>
              <br />
              <br />
              <div className="des-img">
                <img src={img7} className="des-img" alt="img" />
              </div>
              <p>
                Additionally, SHIV will store all your RSVP information in an
                easy-to-use and user-friendly dashboard in your account. Your
                dashboard is fully exportable. Share dietary requirements with
                your caterers. Give your Mehndi artists a list so they know how
                many people to expect and budget. Or send names to your favor
                organiser for personalised gifts. You can also share details
                with your parents or family members at any time.
              </p>
              <br />
              <br />
              <div className="des-img">
                <img src={img8} className="des-img" alt="img" />
              </div>
              <p>
                SHIV offers you a stress-free way to organise all your wedding
                events with years of digital and technology experience behind
                it.
              </p>
              <ul className="about-part-2">
                <li>
                  Simplicity: Your personal invitations, planning, and budgeting
                  tool — manage ALL events in one place.
                </li>
                <li>
                  Expertise: From cultural dietary menu options to Mehndi; We
                  understand Asian weddings and the importance of every
                  ceremony.
                </li>
                <li>
                  Experience: More than 20 years of digital and technology
                  knowledge.
                </li>
                <li>
                  Bespoke: Our technology is purposely built to cater for Asian
                  weddings such as yours.
                </li>
              </ul>
              <p>
                If all that is not enough, everything is digital! Be mindful of
                your carbon footprint by eliminating printed invitations. Share
                Heartfelt Invitations Virtually packages reduce costs, help our
                planet and, most importantly, save you time.
                <br />
                <br />
                Take away the stress of managing all your events manually. Get
                an easy-to-use dashboard to organise everything centrally! Give
                yourself the time to focus on all the other things that matter
                to you at your events. Let SHIV be your personal invitations,
                planning, and budgeting tool to achieve your perfect wedding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Banner;
