import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Charts from "../components/Charts";
import Details from "../components/Details";
import "../scss/Dashboard.css";
import Navbar from "../components/Navbar";
import vidhi from "../assets/vidhi.png";
import mehdi from "../assets/mehdi.png";
import wedding from "../assets/wedding.png";
import reception from "../assets/reception.png";
import chart from "../assets/chart.png";
import eye from "../assets/eye_159078.png";
import mehndi2 from "../assets/mehndi-2.png";
import wedding2 from "../assets/wedding-2.png";
import rec2 from "../assets/rec-2.png";
import vidhi2 from "../assets/vidhi-2.png";
import jainfood from "../assets/jain-food.png";
import noGarlic from "../assets/no-garlic.png";
import noDairy from "../assets/no-dairy.png";
import Gluten from "../assets/gluten-free.png";
import noFish from "../assets/no-fish.png";
import noPork from "../assets/no-pork.png";
import Beverages from "../assets/beverages.png";
import { Bar } from "react-chartjs-2";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCeremonyAttendance,
  getAllDrinksPrefrence,
  getAllEventsAttendance,
  getFilterFoodAndDrinkList,
  getPersonalAssistance,
  getTotalCeremony,
  getTotalDhotiAssistance,
  getTotalFilterCeremony,
  getTotalFoodCount,
  getTotalGuestListWithMembers,
  getTotalMua,
  getTotalRsvpResponses,
  getTotalSareeAssistance,
  getTotalTurbanAssistance,
  getUserAllergies,
  selectCeremonyId,
  selectFoodAndDrinkName,
} from "../redux/dashboardSlice";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { getAllGuestForAUser } from "../redux/guestSlice";
import { getFilterCeremony } from "../redux/Api";
import { getAllCeremoniesByEventId } from "../redux/ceremony";
import {
  selectedDrinksForAUser,
  selectedFoodForAUser,
} from "../redux/foodSlice";
import { getEventUserById } from "../redux/eventSlice";
import { toast } from "react-toastify";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title
);

export const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  const ceremony_id = useSelector((state) => state.userDashboard.ceremony_id);
  const guest = useSelector((state) => state.guest.guest);
  const [attendenceListView, setAttendenceListView] = useState();
  const [guestListView, setGuestListView] = useState();
  const [otherListView, setOtherListView] = useState();
  const [selectedCeremonies, setSelectedCeremonies] = useState([]);
  const [filterGuestList, setFilterGuestList] = useState([]);
  const [guestList, setGuestList] = useState([]);
  const [foodGuestList, setFoodGuestList] = useState([]);
  const [guestListLoading, setGuestListLoading] = useState(false); // Initialize guestListLoading state
  const [foodGuestListLoading, setFoodGuestListLoading] = useState(false); // Initialize guestListLoading state
  const [showText, setShowText] = useState(true);
  const [showFoodText, setShowFoodText] = useState(true);
  const [toggleGraph, setToggleGraph] = useState();
  const selectedDrinks = useSelector((state) => state.food.selectedDrinks);
  const selectedFoods = useSelector((state) => state.food.selectedFoods);
  const filteredFoodAndDrink = useSelector(
    (state) => state.userDashboard.filteredFoodAndDrink
  );

  const [loading, setLoading] = useState(false);
  // console.log(filteredFoodAndDrink);
  const {
    allergies,
    personalAssistance,
    mua,
    dhoti,
    turban,
    saree,
    foodCount,
    ceremony,
    getCeremonyAttendance,
    getEventAttendance,
  } = useSelector((state) => state.userDashboard);
  const eventData = useSelector((state) => state.event.eventData);

  const location = useLocation();
  window.history.pushState(null, null, location.pathname);
  window.onpopstate = function (event) {
    window.history.go(1);
  };

  useEffect(() => {
    dispatch(getUserAllergies());
    dispatch(getPersonalAssistance());
    dispatch(getTotalMua());
    dispatch(getTotalDhotiAssistance());
    dispatch(getTotalSareeAssistance());
    dispatch(getTotalTurbanAssistance());
    dispatch(getTotalGuestListWithMembers());
    dispatch(getTotalRsvpResponses());
    dispatch(getTotalFoodCount());
    dispatch(getTotalCeremony());
    dispatch(getAllGuestForAUser());
    dispatch(getAllDrinksPrefrence());
    dispatch(getAllEventsAttendance());
    dispatch(selectedDrinksForAUser());
    dispatch(selectedFoodForAUser());
    dispatch(getFilterFoodAndDrinkList());
  }, [ceremony_id]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Set this to false to hide the legend
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  const attendanceData = {
    labels: Object.keys(ceremony),
    datasets: [
      {
        // label: "Ceremony Attendence Overview",
        data: Object.values(ceremony),
        backgroundColor: [
          "#00cadc",
          "#65a6fa",
          "#7e80e7",
          "#9b57cc",
          "#bb109d",
          "#d0005f",
          "#de4f45",
        ],
        borderColor: [
          "#00cadc",
          "#65a6fa",
          "#7e80e7",
          "#9b57cc",
          "#bb109d",
          "#d0005f",
          "#de4f45",
        ],
        borderWidth: 1,
      },
    ],
  };

  const guestData = {
    labels: Object.keys(foodCount),
    datasets: [
      {
        label: "Food List",
        data: Object.values(foodCount),
        backgroundColor: [
          "#66cbff",
          "#29cc2e",
          "#5ce1e6",
          "#6ec1eb",
          "#5ec196",
          "#2ce1e9",
        ],
        borderColor: ["#66cbff", "#29cc2e"],
        borderWidth: 1,
      },
    ],
  };

  const EventData = {
    labels: getEventAttendance?.data?.map((event) => event.event_name) || [], // Provide a default empty array if data is undefined
    datasets: [
      {
        // label: "Total Invitation Sent",
        data:
          getEventAttendance?.data?.map((item) => item.total_invitation_sent) ||
          [], // Provide a default empty array if data is undefined
        backgroundColor: ["#00cadc", "#d0005f"],
        borderColor: ["#00cadc", "#d0005f"],
        borderWidth: 1,
      },
      {
        // label: "Total Response Received",
        data:
          getEventAttendance?.data?.map(
            (item) => item.total_response_received
          ) || [], // Provide a default empty array if data is undefined
        backgroundColor: ["#66cbff", "#5ce1e6"],
        borderColor: ["#66cbff", "#5ce1e6"],
        borderWidth: 1,
      },
    ],
  };

  const categories = Object.keys(getCeremonyAttendance || {}); // Use an empty object as a fallback if getCeremonyAttendance is undefined
  // console.log(categories);

  const labels =
    categories.length > 0
      ? Object.keys(getCeremonyAttendance[categories[0]] || {})
      : []; // Use an empty object as a fallback for nested property access
  // console.log(labels);

  const datasets = [];

  categories.forEach((category, index) => {
    const data = labels.map(
      (label) => getCeremonyAttendance[category]?.[label] || 0
    ); // Use 0 as a fallback if the value is undefined or null
    const backgroundColor = index === 0 ? "#66cbff" : "#29cc2e";
    const borderColor = index === 0 ? "#66cbff" : "#29cc2e";

    datasets.push({
      label: category,
      data: data,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1,
    });
  });

  const ceremonyData = {
    labels: labels,
    datasets: datasets,
  };

  // console.log("getEventAttendance", getEventAttendance);
  const otherData = {
    labels: [
      "Allergies",
      "Personal Assistance",
      "MUA",
      "Saree Dressing Assistance",
      "Turban Dressing Assistance",
      "Dhoti Dressing Assistance",
    ],
    datasets: [
      {
        label: "Other Request",
        data: [
          allergies.Yes_Count,
          personalAssistance.Yes_Count,
          mua.Yes_Count,
          saree.Yes_Count,
          turban.Yes_Count,
          dhoti.Yes_Count,
        ],
        backgroundColor: [
          "#66cbff",
          "#29cc2e",
          "#ffcc29",
          "#ff6f61",
          "#cc29e8",
          "#2970ff",
        ],
        borderColor: [
          "#66cbff",
          "#29cc2e",
          "#ffcc29",
          "#ff6f61",
          "#cc29e8",
          "#2970ff",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleTabClick = async (ceremonyId) => {
    dispatch(selectCeremonyId(ceremonyId));
    setShowText(false);
    try {
      setGuestListLoading(true); // Set guestListLoading state to true before the API call
      const response = await dispatch(getTotalFilterCeremony(ceremonyId));
      // console.log("line 289 response", response);
      const guestData = response?.payload?.Groups || [];
      console.log("guestData", guestData);
      if (guestData) {
        setGuestList(guestData);
        toast.success("Data fetch successfully");
      } else {
        setGuestListLoading(false);
        toast.error("Guest data not found in the response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setGuestListLoading(false); // Set guestListLoading state to false when API call is complete
    }
  };

  const handleFoodGuestList = async (name) => {
    dispatch(selectFoodAndDrinkName(name));
    setShowFoodText(false);
    try {
      setFoodGuestListLoading(true); // Set guestListLoading state to true before the API call
      const response = await dispatch(getFilterFoodAndDrinkList(name));
      console.log("line 289 response", response);
      const guestData = response?.payload || [];
      console.log("guestData", guestData);
      if (guestData) {
        setFoodGuestList(guestData);
        toast.success("Data fetch successfully");
      } else {
        setFoodGuestListLoading(false);
        toast.error("Guest data not found in the response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFoodGuestListLoading(false); // Set guestListLoading state to false when API call is complete
    }
  };

  useEffect(() => {
    const handleCeremonies = async () => {
      const res = await dispatch(getAllCeremoniesByEventId());
      // console.log(res);
      const selectedCeremonyNames = res.payload
        ?.filter((item) => item.selected === true)
        ?.map((item) => ({
          name: item.ceremony_name,
          id: item.id,
          icon: item.icon_link,
        }));
      setSelectedCeremonies(selectedCeremonyNames);
    };

    handleCeremonies();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="crl"></div>
      <div className="container card-b-1">
        <div className="row">
          <h6 className="col-md-12 welcome-text">
            <h4 className="heading"> Dashboard</h4>
            <br></br>
            Welcome to your personal dashboard.
            <br></br> <br></br>
            In order to ensure you make the most out of our features and set up
            your groups and invitations correctly please download your Welcome
            Pack and your step-by-step guide to SHIV.
            <br></br> <br></br>
            Please{" "}
            <a href="_SHIV WELCOME PACK.pdf" download>
              download
            </a>{" "}
            your Welcome pack to view all the details of how to use our
            features.
            <br></br> <br></br>
            Please{" "}
            <a href="SHIV STEP-BY-STEP GUIDE.pdf" download>
              download
            </a>{" "}
            a step-by-step guide on how to use your dashboard.
            <br></br> <br></br>
            Your Dashboard will show you a quick snapshot of attendance to your
            events, with the option to click into each event to view food, drink
            requirements as well as allergy and other key components to help you
            plan and budget for your events.
            <br></br> <br></br>
            Click on your list view or graph view to see the data in a way that
            suits you. To get started with your invitations click into the
            Events section.
            <br></br> <br></br>
          </h6>
        </div>

        <div className="card-home">
          <div className="row">
            <div className="col-lg-7 mb-lg-0 mb-3">
              <div className="gray-box">
                <div className="gray-box-inv">
                  Invitation Statistics
                  <button
                    class="sky-circle"
                    onClick={() => setToggleGraph(!toggleGraph)}
                  >
                    {toggleGraph ? "Event Graph" : "Ceremony Graph"}
                  </button>
                  <Link
                    className="view-r-btn view-r-btn2"
                    to={"/guest/all food and drink attendance report"}
                  >
                    View Report
                  </Link>
                </div>

                <div className="collapse show" id="Invitation">
                  <div className="inside-coll-1">
                    <div className="chart">
                      <div className="chart-left-1">
                        {/* <Pie data={data} /> */}
                        {toggleGraph ? (
                          <Bar data={ceremonyData} options={options} />
                        ) : (
                          <Bar data={EventData} options={options} />
                        )}
                      </div>

                      <div className="crl"></div>
                    </div>
                    <div className="crl"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="gray-box">
                <a aria-controls="AttendanceOverview">
                  <span className="top-text text2"> Attendance Overview </span>
                  <span className="top-button-1">
                    <button
                      onClick={() => setAttendenceListView(!attendenceListView)}
                      className="sky-circle"
                    >
                      {attendenceListView ? "Graph View" : "List View"}
                    </button>
                  </span>
                </a>
                <Link
                  className="view-r-btn btn-ar"
                  to={"/guest/all events attendance report"}
                >
                  View Report
                </Link>

                <div id="AttendanceOverview">
                  <div className="inside-coll">
                    {attendenceListView ? (
                      <ul className="ps-0 mb-0 item-block">
                        {Object.entries(ceremony).map(
                          ([ceremonyName, count]) => (
                            <li
                              className="item-li border-bottom"
                              key={ceremonyName}
                            >
                              <div className="item-img">
                                <img
                                  // src={
                                  //   "https://shivapp.s3.ap-south-1.amazonaws.com/ceremony_icons/icon/Hindu+Wedding.png"
                                  // }
                                  alt=""
                                />
                              </div>
                              <div className="item-name">{ceremonyName}</div>
                              <div className="item-no">{count}</div>
                              <div className="crl"></div>
                            </li>
                          )
                        )}
                        {Object.keys(ceremony).length === 0 && (
                          <h4 className="not-found">No Data Found</h4>
                        )}
                      </ul>
                    ) : (
                      <Bar data={attendanceData} options={options} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row gray-4">
            <div className="col-lg-6 mb-lg-0 ">
              <div className="gray-box gray-in">
                <a
                //
                // href="#Statistics "
                //
                >
                  <span className="top-text"> Guest's Food Statistics</span>
                  <button
                    onClick={() => setGuestListView(!guestListView)}
                    className="sky-circle"
                  >
                    {guestListView ? "Graph View" : "List View"}
                  </button>
                </a>
                <Link
                  className="view-r-btn"
                  to={"/guest/all food and drink attendance report"}
                >
                  View Report
                </Link>

                <div className="collapse show" id="Statistics">
                  <div className="inside-coll v-2">
                    {guestListView ? (
                      <ul className="ps-0 mb-0">
                        {Object.entries(foodCount).map(([food, count]) => (
                          <li
                            className="d-flex justify-content-between align-items-center"
                            key={food}
                          >
                            <div className="Invitation statistics">
                              <div className="statistics1">
                                <div className="statistics2">{food}</div>
                                <div className="statistics3">
                                  <div className="sky-circle">{count}</div>
                                </div>
                                <div className="crl"></div>
                              </div>
                            </div>
                          </li>
                        ))}
                        {Object.keys(foodCount).length === 0 && (
                          <li className="d-flex justify-content-between align-items-center">
                            <div className="Invitation statistics">
                              <h4 className="not-found">No Data Found</h4>
                            </div>
                          </li>
                        )}
                      </ul>
                    ) : (
                      <Bar data={guestData} options={options} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="gray-box gray-in-1">
                <a>
                  <span className="top-text"> Other Requests</span>
                  <button
                    onClick={() => setOtherListView(!otherListView)}
                    className="sky-circle"
                  >
                    {otherListView ? "Graph View" : "List View"}
                  </button>
                </a>
                <div className="collapse show" id="Requests">
                  <div className="inside-coll v-2">
                    {otherListView ? (
                      <ul className="ps-0 mb-0 data-tab-2">
                        <li className="d-flex justify-content-between align-items-center  border-bottom">
                          <div className="">
                            <span>Allergies</span>
                          </div>
                          <div className="">
                            <div className="sky-circle">
                              {allergies.Yes_Count}
                            </div>
                          </div>
                        </li>
                        <li className="d-flex justify-content-between align-items-center  border-bottom">
                          <div className="">
                            <span>Personal assistance</span>
                          </div>
                          <div className="">
                            <div className="sky-circle">
                              {personalAssistance.Yes_Count}
                            </div>
                          </div>
                        </li>
                        <li className="d-flex justify-content-between align-items-center  border-bottom">
                          <div className="">
                            <span>MUA</span>
                          </div>
                          <div className="">
                            <div className="sky-circle">{mua.Yes_Count}</div>
                          </div>
                        </li>
                        <li className="d-flex justify-content-between align-items-center  border-bottom">
                          <div className="">
                            <span>Saree dressing assistance</span>
                          </div>
                          <div className="">
                            <div className="sky-circle">{saree.Yes_Count}</div>
                          </div>
                        </li>
                        <li className="d-flex justify-content-between align-items-center  border-bottom">
                          <div className="">
                            <span>Turban dressing assistance</span>
                          </div>
                          <div className="">
                            <div className="sky-circle">{turban.Yes_Count}</div>
                          </div>
                        </li>
                        <li className="d-flex justify-content-between align-items-center  border-bottom">
                          <div className="">
                            <span>Dhoti dressing assistance</span>
                          </div>
                          <div className="">
                            <div className="sky-circle">{dhoti.Yes_Count}</div>
                          </div>
                        </li>
                      </ul>
                    ) : (
                      <Bar data={otherData} options={options} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="clearfix"></div>
          <div className="row tabs-mob">
            <div className="col-12">
              <div className="tabs-home">
                <Tabs>
                  <TabList>
                    {selectedCeremonies?.map((item) => (
                      <Tab>
                        <div
                          className=""
                          onClick={() => handleTabClick(item.id)}
                        >
                          <img src={item.icon} alt="" />
                          <span>{item.name}</span>
                        </div>
                      </Tab>
                    ))}
                  </TabList>

                  <div className="gray-box  menu-tabing">
                    <div className="gray-box-inv">
                      Attendance
                      <div className="sky-circle d-inline-block">
                        {guestList.length}
                      </div>
                    </div>

                    <TabList>
                      {guestListLoading ? ( // Check if guestList is loading
                        <h5>Loading guest list...</h5> // Display loading message
                      ) : guestList.length > 0 ? ( // Check if guestList has data
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>S. No</th>
                                <th>Name</th>
                                <th>Group</th>
                                <th>Mobile Number</th>
                                <th>Guest of Guests</th>
                                <th>RSVP Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {guestList?.map((group, index) => {
                                console.log(group);
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    {group.guests.map((item) => (
                                      <td>{item.guest_name}</td>
                                    ))}
                                    <td>{group.groupname}</td>
                                    <td>{/* Add mobile number here */}</td>
                                    {group.guests.map((item) => (
                                      <td>{item.guests_of_guest}</td>
                                    ))}

                                    <td className="text-center">
                                      <img
                                        className="action-icon"
                                        width={20}
                                        src={eye}
                                        alt="ima"
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <h4 className="not-found">
                          {showText
                            ? "Click On Ceremonies To Get The Guest List"
                            : "No Data Found"}
                        </h4>
                      )}
                    </TabList>
                  </div>
                </Tabs>
              </div>
            </div>

            <div className="col-12">
              <div className="tabs-home home2">
                <Tabs>
                  <div className="crl"></div>
                  <div className="gray-box menu-tabing">
                    <div className="gray-box-inv">Menu</div>

                    <TabList>
                      <>
                        <div className="collapse show " id="Menu">
                          {selectedFoods?.map((food) => (
                            <Tab>
                              <div
                                className="position-relative"
                                onClick={() =>
                                  handleFoodGuestList(food.food_name)
                                }
                              >
                                {/* <div className="sky-circle"></div> */}
                                <img src={food.food_icon} alt="" />
                                <span>{food.food_name}</span>
                              </div>
                            </Tab>
                          ))}
                          {selectedDrinks?.map((drink) => (
                            <Tab>
                              <div
                                className="position-relative"
                                onClick={() =>
                                  handleFoodGuestList(drink.drink_name)
                                }
                              >
                                {/* <div className="sky-circle">25</div> */}
                                <img src={drink.drink_icon} alt="" />
                                <span>{drink.drink_name}</span>
                              </div>
                            </Tab>
                          ))}
                          <div className="crl"></div>
                        </div>
                      </>
                    </TabList>
                    <div className="crl"></div>
                  </div>
                  <div className="crl"></div>

                  <div className="gray-box gray-hight-1">
                    <div class="gray-box-inv">
                      Guest List{" "}
                      <div class="sky-circle d-inline-block">
                        {foodGuestList.length}
                      </div>
                    </div>
                    <div className="crl"></div>
                    <div className="inside-coll v-2">
                      <div className="table-responsive">
                        <TabList className="w-100">
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>S. No</th>
                                  <th>Name</th>
                                  <th>Mobile Number</th>
                                  <th>1st Drink Preference</th>
                                  <th>2nd Drink Preference</th>
                                  {/* <th>Food Preference</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {foodGuestListLoading ? (
                                  <h5>Loading guest list...</h5>
                                ) : foodGuestList.length > 0 ? (
                                  foodGuestList?.map((fd, index) => (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{fd.guest_name}</td>
                                      <td>{fd.mobile_number}</td>
                                      <td>{fd.first_preference}</td>
                                      <td>{fd.second_preference}</td>
                                      {/* <td>Jain</td>  */}
                                    </tr>
                                  ))
                                ) : (
                                  ""
                                )}
                              </tbody>
                            </table>
                            <h4 className="not-found">
                              {showFoodText
                                ? "Click On Food And Drinks To Get the Guest List"
                                : "No Data Found"}
                            </h4>
                          </div>
                        </TabList>
                      </div>
                    </div>
                    <div className="crl"></div>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
