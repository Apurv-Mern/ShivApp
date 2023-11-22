import React from "react";

const Details = () => {
  const data = [
    { title: "Food", quantity: 100 },
    { title: "Tickets", quantity: 100 },
    { title: "Drinks", quantity: 100 },
  ];
  return (
    <div className="gap-10 flex flex-col">
      <div className="border rounded-md p-10 bg-[#003e44] text-white">
        {data.map((item) => (
          <div className="">
            {item.title} : {item.quantity}
          </div>
        ))}
      </div>
      <div className="border rounded-md p-10 bg-[#003e44] text-white">
        {data.map((item) => (
          <div className="">
            {item.title} : {item.quantity}
          </div>
        ))}
      </div>
      <div className="border rounded-md p-10 bg-[#003e44] text-white">
        {data.map((item) => (
          <div className="">
            {item.title} : {item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
