import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { getPaymentStatus } from "../redux/paymentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="View the details of the package you have purchased with your SHIV account for all your Wedding Events and Ceremonies."
        />
        <link
          rel="canonical"
          href="https://shiv-worldwide.com/package/purchase"
        ></link>
        <title>SHIV Purchases – Asian Wedding Specialist |SHIV</title>
      </Helmet>
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
    </>
  );
};

export default Purchase;
