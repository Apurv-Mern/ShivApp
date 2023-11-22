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
      <div className="payment-0">
        <div className="payment-1">{paymentHandling?.package}</div>
        <div className="payment-2">{paymentHandling?.amount}</div>
        <div className="payment-3">{paymentHandling?.date}</div>
      </div>
    </div>
  );
};

export default Purchase;
