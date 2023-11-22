import React from "react";
import img1 from "../../assets/images/pro1.png";
import img2 from "../../assets/images/pro4.png";
import wedingW from "../../assets/images/pro2.png";
import img3 from "../../assets/images/pro3.png";

import Website from "../../assets/website.png";

import img4 from "../../assets/images/shiv-logo-footer.png";
import img5 from "../../assets/images/facebook.png";
import img6 from "../../assets/images/insta.png";
import img7 from "../../assets/images/pint.png";
import img8 from "../../assets/images/shiv-logo-footer.png";
import img9 from "../../assets/images/insta.png";
import Navbar from "../../components/Landing Page Components/Navbar";
import Footer from "../../components/Landing Page Components/Footer";
import { Helmet } from "react-helmet-async";
const About = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="wedding cards, wedding dresses, photography, wedding invitations, engagement, bridesmaids, wedding cakes, bride, grooming, wedding planner, wedding anniversary, wedding songs, wedding shoes, bridal dresses, wedding venues, wedding photography, reception, wedding hairstyles, wedding gowns, cheap wedding dresses, beach wedding dresses, wedding cards, wedding vows, wedding gifts"
        />
        <link
          rel="canonical"
          href="https://shivappdev.24livehost.com/shiv_app/aboutus"
        ></link>
        <title>About us</title>
      </Helmet>
      <div className="front-page-container">
        <Navbar />
        <section className="middle-part web-banner inner-page-banner1">
          <div className="container">
            <div className="col-md-12">
              <h2 className="inner-page-title">
                WE UNDERSTAND ASIAN
                <br /> WEDDINGS
              </h2>
            </div>
          </div>
        </section>
        <section className="middle-part new-about">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="new-title">About Us</h3>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12">
                <div className="product product-new-1">
                  <div className="wrapper1">
                    <div className="card">
                      <div className="face front">
                        <img src={img1} className="pro-img" alt="pro" />
                        <h1 className="text-h1">
                          WEDDING EVENTS AND CEREMONIES
                        </h1>
                      </div>
                      <div className="face back">
                        <h2 className="text-h2 text-new-banner">
                          We know that weddings are not just a single event or
                          one-day affair; they are a celebration of all the
                          cultural pieces that accompany your big day, from your
                          engagement, to Haldi and Mehndi ceremonies all the way
                          through to your wedding and reception party. <br />
                          <br />
                          <span className="bottom-f-text">
                            WE UNDERSTAND ASIAN WEDDINGS
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12">
                <div className="product product-new-1">
                  <div className="wrapper1">
                    <div className="card">
                      <div className="face front">
                        <img src={img2} className="pro-img" alt="pro" />
                        <h1 className="text-h1">RSVP</h1>
                      </div>
                      <div className="face back">
                        <h2 className="text-h2 text-new-banner">
                          Invite all or some of your guests to your engagement
                          party, Mehndi, Sangeet, Haldi ceremony, Nikah, Hindu
                          ceremony, Church ceremony, Anand Karaj, wedding
                          breakfast, or multiple receptions. We offer couples
                          multiple ceremony invitations four to be named as you
                          wish. Allowing two e-invitations for each couple’s
                          ceremonies along with joint main ceremony events.{" "}
                          <br />
                          <br />{" "}
                          <span className="bottom-f-text">
                            WE UNDERSTAND THE IMPORTANCE OF ALL EVENTS AND
                            CEREMONIES
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12">
                <div className="product product-new-1">
                  <div className="wrapper1">
                    <div className="card">
                      <div className="face front">
                        <img src={img3} className="pro-img" alt="pro" />
                        <h1 className="text-h1">DASHBOARD</h1>
                      </div>
                      <div className="face back">
                        <h2 className="text-h2 text-new-banner">
                          From place settings, favors, dietary requirements, and
                          drinks preferences to flight details, Mehndi
                          participation, or highchair requests, you can organise
                          everything via your dashboard.
                          <br></br>
                          No more wasted time chasing address details or
                          spending hours writing invites, adding extra postage
                          costs and we are environmentally friendly. View all
                          RSVP details in one place, in real-time.
                          <br />
                          <br />
                          <span className="bottom-f-text">
                            EMBRACE THE FUTURE OF ASIAN WEDDING PLANNING
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12">
                <div className="product product-new-1">
                  <div className="wrapper1">
                    <div className="card">
                      <div className="face front">
                        <img src={Website} className="pro-img" alt="pro" />
                        <h1 className="text-h1">WEDDING WEBSITE</h1>
                      </div>
                      <div className="face back">
                        <h2 className="text-h2 text-new-banner">
                          FREE wedding website with all our packages coming
                          soon!! <br></br> <br></br>
                          Have your ceremony details in one easy-to-read place
                          for your guests to access anytime with unique URL and
                          passcodes. Ensuring all your details are safe and
                          guests only see the details of ceremonies you have
                          invited them to.
                          <br></br>
                          Our wedding websites will pre-populate the exact
                          details you entered on your invitations, and you will
                          have the option to share your love story and a
                          personal photo gallery with all your guests. <br />
                          <br />
                          <span className="bottom-f-text">
                            WE CAN HELP YOU BRING TO LIFE YOUR VISION OF YOUR
                            PERFECT WEDDING
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 bottom-part-2">
              <p>
                Hello and welcome. My name is Rina, and I am the founder of{" "}
                <strong>S H I V</strong> Worldwide: <strong>S</strong>hare{" "}
                <strong>H</strong>eartfelt <strong>I</strong>nvitations{" "}
                <strong>V</strong>irtually.
                <br />
                <br /> My concept came to life in 2020. Recently engaged, I
                started planning my big day abroad. I knew a destination wedding
                (let alone an Indian one) would not be easy to arrange but I
                thrive on organisation. Through research, I found very few
                resources dedicated to managing not only the complexity of
                coordination of a large number of people and events, but also no
                way to centrally track invitations and RSVPs for all my events.
                I had made progress though, picking the venue, finalising the
                guest list, and sending save the dates. <br />
                <br /> Unfortunately, due to COVID-19, we had to cancel our
                wedding abroad and notify all guests. With so much uncertainty,
                we opted to have our Hindu ceremony, Civil ceremony, and
                reception party all on the same day — and in London. <br />
                <br /> Since a UK Indian wedding is slightly more expensive and
                condensed to a few days instead of a week, my fiancé and I made
                the tough decision to limit guests and children at certain
                events. Crucially, I needed a digital RSVP to track, manage, and
                budget each event, separately. I wanted something easy to
                understand visually so I could quickly see who was attending
                what event, any dietary requirements (including allergies),
                drink/alcohol preferences, and optional activities
                (Mehndi/henna, etc.).
                <br />
                <br /> Hence,SHIV was instinctive. At the time, however, the
                business was not called this. I was planning a wedding, starting
                a new job, and moving home simultaneously. I did not have the
                capacity to launch my idea, but I still wanted to help other
                couples to make wedding planning easier for several events. In
                late 2022, I was finally ready to go ahead with development when
                the most tragic thing that could happen to anyone happened to us
                as a couple. I was six months pregnant, and we lost our son
                SHIV. It has taken a lot of time, effort, courage, and
                self-motivation to get to where I am now. I decided to do
                something to honor my son. My husband and I wanted to hear
                SHIV’s name with moments that matter, allowing him to share in
                other people’s happy occasions — wherever he may be. <br />
                <br />
                Working more than 20 years in the digital space (Monster,
                Yahoo!, professional event organisers, and many other startups),
                I have the network, knowledge, and experience to help couples. I
                understand how technology makes wedding planning easier and
                stress-free. <br />
                <br /> After nearly three years and the help of talented people
                around me, plus sheer determination and persistence, SHIV is
                live.
                <br />
                <br /> With SHIV, I hope to help couples invite, plan, organise,
                and budget for their wedding events more joyfully. See real-time
                RSVP data and make the whole decision-making process easier.
                Still with so much love to give, SHIV is the platform my husband
                and I view as an outlet to help couples embarking upon their
                beautiful new chapter in life. For us, it also keeps SHIV with
                us every day. Share Heartfelt Invitations Virtually and make a
                difference to your special occasion with SHIV.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default About;
