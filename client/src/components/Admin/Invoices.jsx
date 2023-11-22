import React from "react";
import AdminNavbar from "./AdminNavbar";
import Navbar from "../Navbar";

const Invoices = () => {
  return (
    <div className="col-md-12 invoice-details">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">User name </th>
            <th scope="col">Email address</th>
            <th scope="col">Invoice PDF - View / Edit</th>
            <th scope="col">Payment method (card, Apple/ Google pay) </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name </td>
            <td>test@gmail.com</td>
            <td>
              <a href="#"> View</a> / <a href="#">Edit</a>
            </td>
            <td>Google pay </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
