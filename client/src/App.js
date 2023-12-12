import React, { useState, Component, Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Reports from "./components/Reports";
import EventReport from "./components/Reports/EventReport";
import PersonalAssistanceReport from "./components/Reports/PersonalAssistance";
import FoodListReport from "./components/Reports/FoodListReport";
import SendSS from "./components/SendSS";
import Purchase from "./components/Purchase";
import MuaReport from "./components/Reports/MuaReport";
import TraditionalReport from "./components/Reports/EthinicWearReport";
import Flight from "./components/Reports/FlightReport";
import Mehndi from "./components/Reports/MehndiReport";
import PackagesDetails from "./components/Admin/PackagesDetails";
import Invoices from "./components/Admin/Invoices";
import Questions from "./components/Admin/Questions";
import UserDetails from "./components/Admin/UserDetails";
import QuestionSelection from "./components/QuestionSelection";
import NewRsvpForm from "./components/NewRsvpForm";
import Gift from "./components/Gift";
import BGNames from "./components/BGNames";
import EventsDetails from "./components/EventsDetails.jsx";
import TermsOfSale from "./Pages/LandingPages/TermsOfSale.jsx";
import RSVP4 from "./components/RSVP4";
import WeddingWebsite from "./components/Wedding Website/components/Main.jsx";
import CodePage from "./components/Wedding Website/components/CodePage.jsx";

//PAGES
const Home = React.lazy(() => import("./Pages/Home"));
const LandingPage = React.lazy(() => import("./Pages/LandingPages/Home"));
const AboutUs = React.lazy(() => import("./Pages/LandingPages/About"));
const InvitationDesign = React.lazy(() =>
  import("./Pages/LandingPages/Design")
);
const ContactUs = React.lazy(() =>
  import("./Pages/LandingPages/Contactus.jsx")
);
const LandingPackages = React.lazy(() =>
  import("./Pages/LandingPages/Packages.jsx")
);
const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const ForgotPass = React.lazy(() => import("./Pages/Forgotpass"));
const Faq = React.lazy(() => import("./Pages/LandingPages/Faq"));
const AdminReport = React.lazy(() => import("./components/Admin/Reports"));
const PrivacyPolicy = React.lazy(() =>
  import("./Pages/LandingPages/PrivacyPolicy")
);
const Term = React.lazy(() => import("./Pages/LandingPages/Term"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Events = React.lazy(() => import("./components/Events"));
const Packages = React.lazy(() => import("./components/Packages"));
const EventsList = React.lazy(() => import("./components/EventsList"));
const Template = React.lazy(() => import("./components/Template"));
const TemplateText = React.lazy(() => import("./components/TemplateText"));
const FoodAndDrinkList = React.lazy(() =>
  import("./components/FoodAndDrinkList")
);
const TemplatePreview = React.lazy(() =>
  import("./components/TemplatePreview")
);
const ResetPassword = React.lazy(() => import("./Pages/ResetPassword"));
const Contacts = React.lazy(() => import("./components/Contacts"));

const InvitationType = React.lazy(() => import("./components/InvitationType"));
const Schedulers = React.lazy(() => import("./components/Schedulers"));
const AddGroupInCeremonies = React.lazy(() =>
  import("./components/AddGroupInCeremonies")
);
const AdminPanel = React.lazy(() => import("./components/Admin/Home"));
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"> </div>{" "}
  </div>
);

function App() {
  const code = localStorage.getItem("code");
  const isAuthenticated = useSelector((state) => state.auth.user);
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  // {isAuthenticated.isAdmin ? <AdminNavbar /> : <Navbar />}

  return (
    <>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />{" "}
          <Route exact path="/signup" name="Signup Page" element={<Signup />} />{" "}
          <Route exact path="/" name="Website Page" element={<LandingPage />} />{" "}
          <Route
            exact
            path="/about-us"
            name="Website Page"
            element={<AboutUs />}
          />{" "}
          <Route
            exact
            path="/invitations-templates"
            name="Website Page"
            element={<InvitationDesign />}
          />{" "}
          <Route
            exact
            path="/contact-us"
            name="Website Page"
            element={<ContactUs />}
          />{" "}
          <Route
            exact
            path="/packages"
            name="Website Page"
            element={<LandingPackages />}
          />{" "}
          <Route exact path="/faq" name="Website Page" element={<Faq />} />{" "}
          <Route
            exact
            path="/term-condition"
            name="Website Page"
            element={<Term />}
          />{" "}
          <Route
            exact
            path="/terms-of-sale"
            name="Website Page"
            element={<TermsOfSale />}
          />{" "}
          <Route
            exact
            path="/privacy-policy"
            name="Website Page"
            element={<PrivacyPolicy />}
          />{" "}
          <Route
            exact
            path="/forgotPassword"
            name="Forgot Password Page"
            element={<ForgotPass />}
          />{" "}
          <Route
            exact
            path="/user/resetPassword/:token"
            name="Forgot Password Page"
            element={<ResetPassword />}
          />{" "}
          <Route
            exact
            path="/rsvp/questions"
            name="RSVPPages4"
            element={<RSVP4 />}
          />{" "}
          {/* https://shivappdev.24livehost.com/248/wwe/390/527 */}
          <Route
            exact
            path="/:user_id/:group_name/:event_id/:id"
            name="MyInvPage2"
            element={<NewRsvpForm />}
          />{" "}
          <Route
            exact
            path="/:user_id/wedding_website/otp"
            name="OTP"
            element={<CodePage />}
          />{" "}
          <Route
            exact
            path="/wedding_website/site/:bride/weds/:groom"
            name="Wedding website"
            element={
              code ? <WeddingWebsite /> : <Navigate to="/wedding_website/otp" />
            }
          />{" "}
          {/* PROTECTED ROUTES STARTS FROM HERE */}
          <Route
            exact
            path="/"
            name="Home Page"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/dashboard"
            name="Admin Page"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/myEvents"
            name="Website Page"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/packages/:eventName"
            name="RSPV packages Page"
            element={
              <ProtectedRoute>
                <Packages />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/eventList"
            name="Event List Page"
            element={
              <ProtectedRoute>
                <EventsList />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/foodDrink"
            name="Food Drink Page"
            element={
              <ProtectedRoute>
                <FoodAndDrinkList />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/template"
            name="Template Page"
            element={
              <ProtectedRoute>
                <Template />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/preview"
            name="Template Preview Page"
            element={
              <ProtectedRoute>
                <TemplatePreview />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/contacts"
            name="Contacts Page"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/sendInvitation"
            name="MyInvPage"
            element={
              <ProtectedRoute>
                <InvitationType />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/invitation/schedulers"
            name="MyInvPage2"
            element={
              <ProtectedRoute>
                <Schedulers />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/add/group/ceremonies"
            name="Add Group In Ceremonies"
            element={
              <ProtectedRoute>
                <AddGroupInCeremonies />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/payment/success"
            name="Payment Success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/payment/cancel"
            name="Payment Cancel"
            element={
              <ProtectedRoute>
                <Cancel />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/guest/:questions"
            name="Rsvp questions"
            element={
              <ProtectedRoute>
                <QuestionSelection />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/guests/:template"
            name="Guest Template"
            element={
              <ProtectedRoute>
                <SendSS />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/guest/reports"
            name="Guest Reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/guest/all-events-attendance-report"
            name="Guest Reports"
            element={
              <ProtectedRoute>
                <EventReport />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/guest/all-food-and-drink-attendance-report"
            name="Guest Reports"
            element={
              <ProtectedRoute>
                <FoodListReport />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/guest/personal-assistance-report"
            name="Guest Reports"
            element={
              <ProtectedRoute>
                <PersonalAssistanceReport />
              </ProtectedRoute>
            }
          />{" "}
          {/* <Route
            exact
            path="/guest/mua report"
            name="Guest Reports"
            element={
              <ProtectedRoute>
                <MuaReport />
              </ProtectedRoute>
            }
          />{" "} */}
          <Route
            exact
            path="/guest/travel-report"
            name="Guest Reports"
            element={
              <ProtectedRoute>
                <Flight />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/guest/mehndi-report"
            name="Guest Reports"
            element={
              <ProtectedRoute>
                <Mehndi />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/guest/guests-styling-report"
            name="Guest Reports"
            element={
              <ProtectedRoute>
                <TraditionalReport />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/package/purchase"
            name="Guest Reports"
            element={
              <ProtectedRoute>
                <Purchase />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/guest/gifts"
            name="Guest Reports"
            element={
              <ProtectedRoute>
                <Gift />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/couples"
            name="Bride and Groom Names"
            element={
              <ProtectedRoute>
                <BGNames />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/event/details"
            name="Event Details"
            element={
              <ProtectedRoute>
                <EventsDetails />
              </ProtectedRoute>
            }
          />
          {/* NESTED ROUTE FOR ADMIN */}
          <Route
            exact
            path="/admin"
            name="Admin Panel Page"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          >
            <Route
              exact
              path=""
              name="Admin panel Reports"
              element={
                <ProtectedRoute>
                  <UserDetails />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="package-details"
              name="Admin panel Reports"
              element={
                <ProtectedRoute>
                  <PackagesDetails />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="invoice"
              name="Admin panel Reports"
              element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="faq"
              name="Admin panel Reports"
              element={
                <ProtectedRoute>
                  <Questions />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="reports"
              name="Admin panel Reports"
              element={
                <ProtectedRoute>
                  <AdminReport />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
