import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { addGuest } from "../redux/guestSlice";
import { toast } from "react-toastify";

const AddContactForm = ({ open, handleClose, handleAddContact }) => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);

  const [contactData, setContactData] = useState({
    id: 1, // Start the counter at 1
    guest_name: "",
    email: "",
    mobile_number: "",
    group: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    dispatch(addGuest(contactData))
      .then((response) => {
        if (response.meta.requestStatus === "rejected") {
          toast.error("This email is already in use.");
          handleClose();
        } else if (response.meta.requestStatus === "fulfilled") {
          // Handle the success case here
          setContactData((prevData) => ({
            id: prevData.id + 1, // Increment the counter for the next contact
            guest_name: "",
            email: "",
            mobile_number: "",
            group: "",
          }));
          handleAddContact(contactData);
          toast.success("Contact Added Successfully");
          handleClose();
          // setContactData()
        }
      })
      .catch((err) => {
        // Handle other errors here
        console.log("Error:", err);
      });
  };

  // console.log("Guest", contactData);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Contact</DialogTitle>
      <DialogContent>
        <DialogContentText>Please add contact details</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="guest_name"
          name="guest_name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={contactData.guest_name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={contactData.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="mobile_number"
          name="mobile_number"
          label="Number"
          type="number"
          fullWidth
          variant="standard"
          value={contactData.mobile_number}
          onChange={handleInputChange}
        />

        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="group">Group</InputLabel>
          <Select
            id="group"
            name="group"
            value={contactData.group}
            onChange={handleInputChange}
          >
            {groups &&
              groups?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddContactForm;
