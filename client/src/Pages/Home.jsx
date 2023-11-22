import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import Dashboard from "../components/Dashboard";
import AdminDashboard from "../components/Admin/Home";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  console.log({ user });

  return (
    <div>
      {user ? user?.isAdmin ? <AdminDashboard /> : <Dashboard /> : <Banner />}
    </div>
  );
};

export default Home;
