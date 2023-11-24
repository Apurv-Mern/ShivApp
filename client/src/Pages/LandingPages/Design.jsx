import React from "react";
import Navbar from "../../components/Landing Page Components/Navbar";

import img1 from "../../assets/images/sikh/Aqua-Anand-Karaj.png";
import img2 from "../../assets/images/sikh/Bhangra-Burst.png";
import img3 from "../../assets/images/indian/Blue-Peacock.png";
import img4 from "../../assets/images/sikh/Celebration.png";

import img5 from "../../assets/images/indian/Dancing-in-red.png";
import img6 from "../../assets/images/universal/Dark-Green-Flowers.png";
import img7 from "../../assets/images/sikh/Elegant-Aqua.png";
import img8 from "../../assets/images/indian/Elegant-Ganesh.png";

import img9 from "../../assets/images/indian/Gold-Elegant-Ganesh.png";
import img10 from "../../assets/images/indian/Golden-lephants.png";
import img11 from "../../assets/images/indian/Golden-Sky.png";
import img12 from "../../assets/images/muslim/Green-sunset.png";

import img13 from "../../assets/images/sikh/Horizon.png";
import img14 from "../../assets/images/indian/Lilac.png";
import img15 from "../../assets/images/universal/Love.png";
import img16 from "../../assets/images/universal/Mr-Mrs.png";

import img17 from "../../assets/images/universal/Navy-Love.png";
import img18 from "../../assets/images/muslim/Navy-nights.png";
import img19 from "../../assets/images/indian/Pink-Ganesh.png";
import img20 from "../../assets/images/indian/Pink-moonlight.png";

import img21 from "../../assets/images/universal/Purple-Hearts.png";
import img22 from "../../assets/images/sikh/Red-Bouquet.png";
import img23 from "../../assets/images/indian/Red-OM.png";
import img24 from "../../assets/images/universal/Royal-Blue-Hearts.png";

import img25 from "../../assets/images/universal/Royal-Blue-Mandala.png";
import img26 from "../../assets/images/muslim/Shadows-of-lime.png";
import img27 from "../../assets/images/muslim/Green-sunset.png";
import img28 from "../../assets/images/sikh/Sunrise-Khanda.png";

import img29 from "../../assets/images/indian/Lilac.png";
import img30 from "../../assets/images/indian/Tie-the-Knot.png";
import img31 from "../../assets/images/indian/Turquoise-Ganesh.png";
import img32 from "../../assets/images/indian/Turquoise-Splash.png";

import GreenGarlandOM from "../../assets/images/universal/Green-Garland-OM.png";
import TraditionalGanesh from "../../assets/images/universal/Traditional-Ganesh.png";
import TealGreenOM from "../../assets/images/universal/Teal-Green-OM.png";
import Sunflower from "../../assets/images/universal/Sunflower.png";
import Indo from "../../assets/images/universal/Indo-Italian.jpg";
import Lemon from "../../assets/images/universal/lemon-trees.jpg";

import img33 from "../../assets/images/indian/WhiteElegantAnandKaraj.png";

import Footer from "../../components/Landing Page Components/Footer";
import { Helmet } from "react-helmet-async";

const Design = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Use our wedding designs or up-load your own for all your wedding ceremonies and collect your guest RSVP in your personal dashboard."
        />
        <link
          rel="canonical"
          href="https://shivappdev.24livehost.com/shiv_app/invitations%20templates"
        ></link>
        <title>Digital Asian wedding e-invite designs | SHIV</title>
      </Helmet>

      <div className="front-page-container">
        <Navbar />
        <section className="middle-part web-banner inner-page-banner1">
          <div className="container">
            <div className="col-md-12">
              <h2 className="inner-page-title">
                SELECT ONE OF OUR DESIGNS OR
                <br /> UPLOAD YOUR OWN
              </h2>
            </div>
          </div>
        </section>

        <section className="middle-part new-about">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="new-title">INVITATION DESIGNS</h3>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img1} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Aqua Anand Karaj</div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img2} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Bhangra Burst</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img3} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Blue Peacock</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img4} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Celebration</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img5} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Dancing in red</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img6} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Dark Green Flowers</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img7} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Elegant Aqua</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img8} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Elegant Ganesh</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img9} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Gold Elegant Ganesh</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img10} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Golden Elephants</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img11} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Golden Sky</div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={GreenGarlandOM} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Green Garland OM</div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img12} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Green Sunset</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={GreenGarlandOM} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Green Garland OM</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img27} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Green Sunset</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img13} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Horizon</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={Indo} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Indo Italian</div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={Lemon} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Lemon Trees</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img14} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Lilac</div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img15} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Love </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img29} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Lilac</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img16} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Mr & Mrs</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img17} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title"> Navy Love</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img18} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title"> Navy Nights</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img19} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title"> Pink Ganesh</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img20} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title"> Pink Moonlight</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img21} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title"> Purple Hearts</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img22} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title"> Red Bouquet</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img23} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title"> Red OM</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img24} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title"> Royal Blue Hearts </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img25} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Royal Blue Mandala </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img26} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Shadows Of Lime</div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={Sunflower} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Sunflower</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img28} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Sunrise Khanda</div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={TealGreenOM} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Teal Green OM</div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img30} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Tie the Knot</div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img
                    src={TraditionalGanesh}
                    className="card-show"
                    alt="card"
                  />
                </div>
                <div className="inv-design-title">Traditional Ganesh</div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img31} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Turquoise Ganesh</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img32} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">Turquoise Splash</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-lg-12 design-pack">
                <div className="inv-design">
                  <img src={img33} className="card-show" alt="card" />
                </div>
                <div className="inv-design-title">
                  White Elegant Anand Karaj
                </div>
              </div>

              {/* End of repeated block */}

              {/* Repeat the block for other designs */}
            </div>
            {/* <div className="col-lg-12 navigation-pack">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="invitation-designs3.html"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="invitation-designs.html">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="invitation-designs2.html">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="invitation-designs3.html">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link active"
                      href="invitation-designs4.html"
                    >
                      4
                    </a>
                  </li>
                </ul>
              </nav>
            </div> */}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Design;
