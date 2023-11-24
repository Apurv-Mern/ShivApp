import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setEventName } from "../redux/eventSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const PackagesPopupTemplate = ({ popupOpen }) => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user"));
  const eventName = JSON.parse(localStorage.getItem("eventName"));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const packages = [
    { id: 1, name: "BRONZE PACKAGE", price: "£300" },
    { id: 2, name: "SILVER PACKAGE", price: "£450" },
    { id: 3, name: "GOLD PACKAGE", price: "£575" },
    { id: 4, name: "PLATINUM PACKAGE", price: "£675" },
    { id: 5, name: "DIAMOND PACKAGE", price: "£775" },
  ];

  const handlePayment = (id) => {
    // Open the child window with your payment URL
    window.location.href = `https://shivappdev.24livehost.com:3004/api/payment/createpaymentlink/user/${userId}/${id}/event/template`;
  };

  return (
    <div className="buy-now-5">
      <Button className="btn" onClick={handleClickOpen}>
        Buy Now
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Package</DialogTitle>
        <DialogContent>
          <div className="row row-px-2 packageItem-box">
            {packages.map((packageItem, index) => (
              <div className="col packageItem" key={index}>
                <div className="packageItemin">
                  <h4 className="packname"> {packageItem.name}</h4>

                  <div className="text-base text-center ">
                    {packageItem.price}
                  </div>
                  <div className="two-btn">
                    <button
                      className="btn btn-1"
                      onClick={() => handlePayment(packageItem.id)}
                    >
                      Buy Now
                    </button>
                  </div>
                  <div className="crl"></div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    // <h1>hellow orlds</h1>
  );
};

export default PackagesPopupTemplate;
