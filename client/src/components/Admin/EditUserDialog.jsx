import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditUserDialog = ({ open, onClose, onSave, user }) => {
  const [editedData, setEditedData] = useState(user);
  console.log(user);

  useEffect(() => {
    // Reset the edited data when the user prop changes
    setEditedData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit User Details</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Full Name"
            name="username"
            value={editedData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email Address"
            name="email"
            value={editedData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Number"
            name="number"
            value={editedData.number}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* Add other fields as needed */}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
