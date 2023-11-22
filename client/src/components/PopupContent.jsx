import React, { useState } from "react";
import Popup from "./Popup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const PopupContent = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
  });

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to the server
    console.log("Form Data:", formData);

    // Close the popup after form submission
    handleClose();
  };

  return (
    <div>
      {/* <a id="popupLink" onClick={handleClickOpen}>
        Open popup
      </a> */}

      <Popup visible={handleClickOpen} onClose={handleClose}>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Number"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </form>
      </Popup>
    </div>
  );
};

export default PopupContent;
