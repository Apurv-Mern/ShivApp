import Home from "../../Wedding Website/components/Home";
import Calendar from "../../Wedding Website/components/Calendar";
import Footer from "../../Wedding Website/components/Footer";
import Gallery from "../../Wedding Website/components/Gallery";
import Header from "../../Wedding Website/components/Header";
import OurStory from "../../Wedding Website/components/OurStory";
import Contactus from "../../Wedding Website/components/Contactus";
import "../../../scss/Wedding/style.css";
import "../../../scss/bootstrap.min.css";

function Main() {
  return (
    <>
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
