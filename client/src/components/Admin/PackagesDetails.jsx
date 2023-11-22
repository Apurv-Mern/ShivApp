import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaymentHistories } from "../../redux/paymentSlice";

const PackagesDetails = () => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState();
  useEffect(() => {
    const handlePayment = async () => {
      const res = await dispatch(getAllPaymentHistories());
      // console.log(res);
      setPayment(res?.payload);
    };

    handlePayment();
  }, []);

  console.log("paymentHistory", payment);
  return (
    <div className="col-md-12 package-details">
      {/* {payment.length} */}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Packages sold</th>
            <th scope="col">Packages sold by date and time</th>
            <th scope="col">Amount</th>
            <th scope="col">Country / location brought in</th>
          </tr>
        </thead>
        <tbody>
          {payment?.map((pay) => (
            <>
              <tr>
                <td scope="row"> {pay?.package}</td>
                <td>{pay?.date}</td>
                <td>{pay?.amount}</td>
                <td>United Kingdom</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackagesDetails;
