import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { getPaymentStatus } from "../redux/paymentSlice";
import { useDispatch, useSelector } from "react-redux";

const Purchase = () => {
  const dispatch = useDispatch();
  const paymentStatus = useSelector((state) => state.payment.paymentStatus);
  useEffect(() => {
    dispatch(getPaymentStatus());
  }, []);

  console.log(paymentStatus);
  const paymentHandling = paymentStatus["payment status: "];
  console.log(paymentHandling);
  return (
    <div>
      <Navbar />
      <div className="container card-b-1">
        <div className="row">
          <h6 className="col-md-12 welcome-text">
            <h4 className="heading">Purchases</h4>
            <h6>Here you can view the details of your package.</h6>
          </h6>
          <div className="payment-0">
            <div className="payment-1">{paymentHandling?.package}</div>
            <div className="payment-2">{paymentHandling?.amount}</div>
            <div className="payment-3">{paymentHandling?.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
