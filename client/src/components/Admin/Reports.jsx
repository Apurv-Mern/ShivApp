import React from "react";
import AdminNavbar from "./AdminNavbar";
import Navbar from "../Navbar";

const Reports = () => {
  return (
    <div className="col-md-12 report-details">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Customer count Vs Package brought </th>
            <th scope="col">All Packages sales count</th>
            <th scope="col">Total sales by package</th>
            <th scope="col">Sales per country/ region</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Customer count Vs Package brought </td>
            <td>All Packages sales count</td>
            <td>Total sales by package</td>
            <td>Sales per country/ region</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
