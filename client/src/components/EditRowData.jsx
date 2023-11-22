import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGuestByGuestId,
  updateGuestDetailsByGuestId,
} from "../redux/guestSlice";

const EditRowDialog = ({ open, rowData, handleClose, handleSave }) => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const guestId = useSelector((state) => state.guest.guestId);

  const [editedData, setEditedData] = useState({});
  // console.log("guestId", guestId);
  useEffect(() => {
    setEditedData({ ...rowData });
  }, [rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    handleSave(editedData);
    handleClose();
  };
  const fieldsToEdit = Object.entries(rowData).filter(
    ([key]) => key !== "group" && key !== "id" && key !== "guest_id"
  );
  // console.log("editedData", editedData);

  const updateGuestDetails = () => {
    // const { id, ...dataWithoutId } = editedData;
    const mappedData = {
      guest_name: editedData.guest_name,
      mobile_number: editedData.mobile_number,
      email: editedData.email,
      group_name: editedData.group,
    };
    console.log("editedData", mappedData);

    dispatch(updateGuestDetailsByGuestId({ guestId, mappedData }));
    console.log(guestId);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Row</DialogTitle>
      <DialogContent>
        <DialogContentText>Please edit the row details</DialogContentText>
        {fieldsToEdit.map(([key, value]) => (
          <TextField
            key={key}
            autoFocus
            margin="dense"
            id={key}
            name={key}
            label={key}
            type="text"
            fullWidth
            variant="standard"
            value={editedData[key] || ""}
            onChange={handleInputChange}
          />
        ))}
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="group">Group</InputLabel>
          <Select
            id="group"
            name="group"
            value={editedData.group || ""}
            onChange={handleInputChange}
          >
            {groups.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleSaveEdit();
            updateGuestDetails();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRowDialog;
