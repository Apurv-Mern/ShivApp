import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Navbar from "../Navbar";
import { useEffect } from "react";
import {
  adminDeleteUser,
  adminEditUser,
  getAdminUsersDetails,
} from "../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import EditUserDialog from "./EditUserDialog";

const UserDetails = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.admin.userDetails);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(getAdminUsersDetails());
  }, []);

  // console.log("userDetails", userDetails);

  const handleDelete = (id) => {
    dispatch(adminDeleteUser(id))
      .then(() => {
        dispatch(getAdminUsersDetails());
        toast.success("User deleted successfully!");
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEdit = (id) => {
    dispatch(getAdminUsersDetails())
      .then((response) => {
        const users = response.payload;
        const user = users.find((data) => data.id === id);
        setId(user);
        if (user) {
          console.log(user);

          setEditedUser({
            username: user.username,
            email: user.email,
            number: user.number,
          });
          setOpenEditDialog(true);
        } else {
          console.error("User not found with id:", id);
        }
      })
      .catch((error) => {
        console.error("Error getting user details:", error);
      });
  };

  const handleSave = (editedData) => {
    // *Call your API to update the user details
    dispatch(adminEditUser({ editedData, id }))
      .then(() => {
        dispatch(getAdminUsersDetails());
        toast.success("User details updated successfully!");
        setOpenEditDialog(false);
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };

  console.log("editedUser", editedUser);

  return (
    <div className="col-md-12 user-details">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Full name</th>
            <th scope="col">Contact number</th>
            <th scope="col">Email address</th>
            <th scope="col">Package brought</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Delete user option</th>
            {/* <th scope="col">Add user option</th> */}
          </tr>
        </thead>
        <tbody>
          {userDetails.length > 0 ? (
            userDetails?.map((user, index) => (
              <tr>
                <td scope="row" key={user.id}>
                  {index + 1}
                </td>
                <td>{user.username}</td>
                <td>{user.number}</td>
                <td>{user.email}</td>
                <td>{user.package}</td>
                <td>{user.amount}</td>
                <td>{user.date}</td>
                <td>
                  <button className="btn" onClick={() => handleEdit(user.id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
                {/* <1td>Add</1td> */}
              </tr>
            ))
          ) : (
            <h4>No Data To Show</h4>
          )}
          {openEditDialog && editedUser && (
            <EditUserDialog
              open={openEditDialog}
              onClose={() => setOpenEditDialog(false)}
              onSave={handleSave}
              user={editedUser}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
