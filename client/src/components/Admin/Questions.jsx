import React from "react";
import AdminNavbar from "./AdminNavbar";
import Navbar from "../Navbar";

const Questions = () => {
  return (
    <div className="col-md-12 questions-details">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Popular questions used </th>
            <th scope="col">deleted questions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.{" "}
            </td>
            <td>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </td>
          </tr>
          <tr>
            <td>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.{" "}
            </td>
            <td>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Questions;
