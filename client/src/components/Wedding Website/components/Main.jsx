import Home from "../../Wedding Website/components/Home";
import Calendar from "../../Wedding Website/components/Calendar";
import Footer from "../../Wedding Website/components/Footer";
import Gallery from "../../Wedding Website/components/Gallery";
import Header from "../../Wedding Website/components/Header";
import OurStory from "../../Wedding Website/components/OurStory";
import Contactus from "../../Wedding Website/components/Contactus";
import { Helmet } from "react-helmet-async";
import "../../../scss/Wedding/style.css";
import "../../../scss/bootstrap.min.css";

function Main() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Your personal SHIV Wedding Website to showcase all your selected ceremony invitation details to your guests. Use our secure passcode for safe viewing of all your Wedding Ceremonies."
        />
        <link
          rel="canonical"
          href="https://shiv-worldwide.com/wedding_website"
        ></link>
        <title>SHIV Wedding Website – Asian Wedding Specialist |SHIV</title>
      </Helmet>
      <Header />
      <Home />
      <Calendar />
      <OurStory />
      <Gallery />
      <Contactus />
      <Footer />
    </>
  );
}

export default Main;
