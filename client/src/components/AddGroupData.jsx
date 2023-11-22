import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { addAGroups, getGroupsByUserId } from "../redux/GroupSlice";
import { toast } from "react-toastify";
const AddGroupDialog = ({ open, handleClose, handleAdd }) => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user"));
  const user_id = parseInt(userId, 10);
  const [groupName, setGroupName] = useState("");
  const [randomCode, setRandomCode] = useState("");

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  // const generateRandomCode = () => {
  //   // Generate a 6-digit random code

  //   const code = Math.floor(1000 + Math.random() * 9000);
  //   const concatenatedCode = `${user_id}${code}`;
  //   setRandomCode(concatenatedCode.toString());
  // };

  const handleAddGroup = () => {
    // Implement your logic to add the new group here
    dispatch(
      addAGroups({
        user_id,
        groupname: groupName,
      })
    )
      .then(() => toast.success("Group added successfully"))
      .catch(() => toast.error("Group Not added"));
    handleAdd(groupName);
    setTimeout(() => {
      dispatch(getGroupsByUserId());
    }, 500);
    setGroupName("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Group</DialogTitle>
      <DialogContent>
        <DialogContentText>Please add a group name</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Group Name"
          type="text"
          fullWidth
          variant="standard"
          value={groupName}
          onChange={handleInputChange}
        />
        {/* <Button onClick={generateRandomCode} variant="outlined" color="primary">
          Generate Random Code
        </Button>
        <TextField
          margin="dense"
          id="code"
          label="Random Code"
          type="text"
          fullWidth
          variant="standard"
          value={randomCode}
          disabled
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddGroup}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGroupDialog;
