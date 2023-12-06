import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteAGroups, getGroupsByUserId } from "../redux/GroupSlice";
import EditRowDialog from "./EditRowData";
import AddGroupDialog from "./AddGroupData";
import AddContactForm from "./AddGuestData";
import {
  deleteGuestByGuesrId,
  getAdditionalGuest,
  getAllGuestForAUser,
  getGuestForAGroup,
  setGuestId,
} from "../redux/guestSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { ExportToExcelForTemplate } from "../Utils/GenerateExcel";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MdDelete } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const Contacts = () => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user"));
  const guestId = useSelector((state) => state.guest.guestId);
  const groups = useSelector((state) => state.groups.groupWithId);
  const [addContactOpen, setAddContactOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editedRowData, setEditedRowData] = useState({});
  const [rows, setRows] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [fileBuffer, setFileBuffer] = useState("");
  const [isAddContactDisabled, setAddContactDisabled] = useState(false);
  const eventName = JSON.parse(localStorage.getItem("eventName"));
  const additionalGuest = useSelector((state) => state.guest.additionalGuest);
  const [selectedValue, setSelectedValue] = useState(100); // Initial selected value
  const [cost, setCost] = useState(0); // Initial cost
  const [packageId, setPackageId] = useState(1);
  const [popupShown, setPopupShown] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [canUpdateList, setCanUpdateList] = useState(true);

  // ?here enter filename for your excel file
  const fileName = "Shiv Contact Template";
  const apiData = [];

  useEffect(() => {
    const handleRowData = async () => {
      const res = await dispatch(getAllGuestForAUser());
      // console.log("getAllGuestForAUser", res);
      const data = res?.payload?.map((guest, index) => ({
        id: index + 1,
        guest_name: guest.guest_name,
        mobile_number: guest.mobile_number,
        email: guest.email,
        group: guest.group_name,
        guest_id: guest.id,
      }));
      setRows(data);
    };

    handleRowData();
  }, []);

  const handleAllGuestData = async () => {
    const res = await dispatch(getAllGuestForAUser());
    // console.log("getAllGuestForAUser", res);
    const data = res?.payload?.map((guest, index) => ({
      id: index + 1,
      guest_name: guest.guest_name,
      mobile_number: guest.mobile_number,
      email: guest.email,
      group: guest.group_name,
      guest_id: guest.id,
    }));
    setRows(data);
  };

  const handleAddContact = (newContactData) => {
    // ?Check if the length of the rows array is greater than or equal to 3
    if (rows.length === additionalGuest?.data?.additional_guests) {
      toast.error(
        `You can't add more than ${additionalGuest?.data?.additional_guests} contacts. You have Upgrade your package`
      );
    } else {
      const newContact = {
        ...newContactData,
      };

      // ?Add the new contact to the rows array
      setRows((prevRows) => [...prevRows, newContact]);
      toast.success("Contact added successfully");
    }
  };

  const handleEdit = (rowData) => {
    setSelectedRowData(rowData);
    setEditedRowData({ ...rowData });
    setSelectedGuestId(rowData.guest_id);
    setEditOpen(true);
    // console.log(rowData);
  };
  const handleDelete = (guestId) => {
    console.log(guestId);
    dispatch(deleteGuestByGuesrId(guestId))
      .then(() => {
        toast.success("Contact delete successfully");
        handleAllGuestData();
      })
      .catch(() => toast.error("Try Again"));
  };

  const handleSaveEdit = (editedData) => {
    const editedRowIndex = rows.findIndex((row) => row.id === editedData.id);

    if (editedRowIndex !== -1) {
      // Update the 'rows' data with the editedData for the selected row
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[editedRowIndex] = editedData;
        return updatedRows;
      });
    }

    setEditOpen(false);
  };

  const handleAddGroup = (groupName) => {
    setAddGroupOpen(false);
  };

  useEffect(() => {
    dispatch(getGroupsByUserId());
  }, [dispatch, addGroupOpen]);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "guest_name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "mobile_number", headerName: "Number", width: 200 },
    { field: "group", headerName: "Group", width: 250 },

    {
      field: "edit",
      headerName: "Edit",
      width: 250,
      renderCell: (params) => {
        dispatch(setGuestId(params.row?.guest_id));
        return <button onClick={() => handleEdit(params.row)}>Edit</button>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        dispatch(setGuestId(params.row?.guest_id));
        // console.log(params.row?.guest_id);
        return (
          <button onClick={() => handleDelete(params.row?.guest_id)}>
            Delete
          </button>
        );
      },
    },
  ];

  const handleGroupData = async (groupName) => {
    try {
      const res = await dispatch(getGuestForAGroup(groupName));
      // console.log(res);
      const data = res?.payload?.map((guest, index) => ({
        id: index + 1,
        guest_name: guest.guest_name,
        mobile_number: guest.mobile_number,
        email: guest.email,
        group: guest.group_name,
        guest_id: guest.guest_id,
      }));
      setRows(data);
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const buffer = e.target.result;
        setFileBuffer(buffer);

        // Create a FormData object to send the file to the server
        const formData = new FormData();
        formData.append("file", file); // Use the desired field name
        const id = JSON.parse(localStorage.getItem("user"));

        try {
          // Send the file to the server using an HTTP request (e.g., POST)
          await axios.post(
            `https://shivappdev.24livehost.com:3004/api/guest/import/${id}`,
            formData
          );

          // After successful upload, fetch the updated data from the server
          dispatch(getGroupsByUserId());
          const res = await dispatch(getAllGuestForAUser());
          const data = res?.payload?.map((guest, index) => ({
            id: index + 1,
            guest_name: guest.guest_name,
            mobile_number: guest.mobile_number,
            email: guest.email,
            group: guest.group_name,
            guest_id: guest.id,
          }));
          setRows(data);

          // Display a success message
          toast.success("Contact upload successfully");
        } catch (error) {
          toast.error("Guest limit exceeded the allowed limit", error);
          console.error("Guest limit exceeded the allowed limit", error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    // ?For Button Disable
    setAddContactDisabled(
      rows.length === additionalGuest?.data?.additional_guests
    );

    if (
      rows.length === additionalGuest?.data?.additional_guests &&
      !popupShown
    ) {
      setOpen(true);
      setCanUpdateList(false);
      setPopupShown(true);
    }
  }, [rows.length, popupShown, rows]);

  useEffect(() => {
    dispatch(getAdditionalGuest());
    // Define the cost calculation logic based on the selected value
    let calculatedCost = 0;

    if (selectedValue === 100) {
      calculatedCost = 25;
      setPackageId(1);
    } else if (selectedValue === 200) {
      calculatedCost = 40;
      setPackageId(2);
    } else if (selectedValue === 300) {
      calculatedCost = 55;
      setPackageId(3);
    } else if (selectedValue === 400) {
      calculatedCost = 70;
      setPackageId(4);
    } else if (selectedValue === 500) {
      calculatedCost = 85;
      setPackageId(5);
    } else if (selectedValue === 600) {
      calculatedCost = 100;
      setPackageId(6);
    } else if (selectedValue === 700) {
      calculatedCost = 155;
      setPackageId(7);
    } else if (selectedValue === 800) {
      calculatedCost = 130;
      setPackageId(8);
    } else if (selectedValue === 900) {
      calculatedCost = 145;
      setPackageId(9);
    } else if (selectedValue === 1000) {
      calculatedCost = 160;
      setPackageId(10);
    }

    // Set the cost state with the calculated value
    setCost(calculatedCost);
  }, [selectedValue]);

  const handlePayment = (id) => {
    // Open the child window with your payment URL
    const paymentUrl = `https://shivappdev.24livehost.com:3004/api/payment/additionalGuests/user/${userId}/${packageId}`;
    window.open(paymentUrl, "_blank");
  };

  const handleClose = () => {
    setOpen(false);
    setCanUpdateList(true);
  };

  const handleGroupDelete = (groupId) => {
    dispatch(deleteAGroups(groupId))
      .then(() => {
        toast.success("Group Delete successfully");
        dispatch(getGroupsByUserId());
      })
      .catch(() => toast.error("Try Again"));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Add all your Wedding contacts in your personal SHIV account to send out e-cards and e-invitations with digital RSVP collection in your personal dashboard."
        />
        <link rel="canonical" href="https://shiv-worldwide.com/contacts"></link>
        <title>SHIV Platform Contacts – Asian Wedding Specialist |SHIV</title>
      </Helmet>
      <div>
        <Navbar />
        <div className="crl"></div>
        <div className="container card-b-1">
          <div className="row">
            <h6 className="col-md-12 welcome-text">
              <h4 className="heading">Contacts</h4>
              All your guests and their contact details will appear here.
              <br></br> <br></br>
              Guests should be placed into groups to determine what invitation
              they should receive.
              <br></br> <br></br>
              Download our excel file and fill in your guest’s name, email,
              phone number and group you wish to set them in or simply add them
              straight into your contacts from the Add Guest button.
              <br></br> <br></br>
              Ensure you set up your groups first to make it easier when adding
              your contacts.
              <br></br> <br></br>
              <div className="contact-refer">
                Please note you must send ALL your guest invitations at the same
                time.
              </div>
              <br></br>
              <div className="refer">
                Please refer to our downloadable Welcome Pack and Guide in the
                Dashboard to ensure that you set up your Ceremonies and guest
                contacts correctly to send out your invitations.
              </div>
              <br></br>
            </h6>
          </div>
          <div className="add-eventapp-btn ">
            <ExportToExcelForTemplate fileName={fileName} apiData={apiData} />

            <button
              htmlFor="fileUpload"
              className="btn me-2"
              onClick={() => document.getElementById("fileUpload").click()}
            >
              Excel Upload
            </button>
            <input
              key={new Date()} // Add a key attribute with a unique value (e.g., timestamp)
              type="file"
              id="fileUpload"
              accept=".xlsx, .xls, .csv" // Define the accepted file types
              style={{ display: "none" }} // Hide the input element
              onChange={handleFileUpload} // Call the handleFileUpload function on file selection
            />

            <button className="btn " onClick={() => setAddGroupOpen(true)}>
              Add New Group
            </button>
            <button
              className="btn ms-2 new-Guest"
              onClick={() => setAddContactOpen(true)}
              disabled={isAddContactDisabled}
            >
              Add New Guest
            </button>
          </div>
          <div className="crl"></div>
        </div>
        <div className="crl"></div>
        <div className="main-container">
          <div className="container bg-w">
            <div className="row contact-us-page">
              <div className="col-md-9">
                {" "}
                <h4> Groups :</h4>{" "}
              </div>
              <div className="col-md-3 ">
                <Link
                  className="flot-tight-btn contact-right"
                  // to={"/add/group/ceremonies"}
                  to={
                    eventName === "Wedding"
                      ? "/add/group/ceremonies"
                      : "/couples"
                  }
                >
                  Next
                  <svg
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </Link>

                <Link className="flot-left-btn contact-left" to={"/template"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                    />
                  </svg>{" "}
                  Back
                </Link>
              </div>
              <div className="totle-guest  col-md-12">
                Total guest : {rows.length}/
                {additionalGuest?.data?.additional_guests
                  ? additionalGuest?.data?.additional_guests
                  : 0}
              </div>

              <div className="col-md-1">
                <button className="btn all-btn" onClick={handleAllGuestData}>
                  All
                </button>
              </div>

              {groups &&
                groups?.map((item) => (
                  <div className="col-md-3" style={{ cursor: "pointer" }}>
                    <div
                      onClick={() => handleGroupData(item.groupname)}
                      className="group-box"
                    >
                      {item.groupname}
                      <MdDelete
                        size={20}
                        onClick={() => handleGroupDelete(item.id)}
                      />{" "}
                    </div>
                  </div>
                ))}
            </div>
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid rows={rows} columns={columns} />
            </Box>
          </div>

          <div>
            <EditRowDialog
              open={editOpen}
              rowData={editedRowData}
              handleClose={() => setEditOpen(false)}
              handleSave={handleSaveEdit}
            />

            <AddGroupDialog
              open={addGroupOpen}
              handleClose={() => setAddGroupOpen(false)}
              handleAdd={handleAddGroup}
            />
            <AddContactForm
              open={addContactOpen}
              handleClose={() => setAddContactOpen(false)}
              handleAddContact={handleAddContact}
            />
          </div>

          <div className="popup-content">
            <Dialog
              className="popup-content-in"
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle className="pack" id="alert-dialog-title">
                {"Packages"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <div className="row popup-width">
                    <div className="col-md-6 popup-pakname">
                      {additionalGuest?.data?.package_name}
                    </div>
                    <div className="col-md-6 popup-option">
                      <select
                        name="cars"
                        className="form-select"
                        id="cars"
                        value={selectedValue}
                        onChange={(e) =>
                          setSelectedValue(Number(e.target.value))
                        }
                      >
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                        <option value="1000">1000</option>
                      </select>
                    </div>

                    <div className="col-md-6 cost-popup">Cost</div>
                    <div className="col-md-6 popup-eur">
                      £ {cost.toFixed(2)}
                    </div>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <div className="cost-btn">
                  <Button className="btn" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button className="btn" onClick={handlePayment} autoFocus>
                    Upgrade
                  </Button>
                </div>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
