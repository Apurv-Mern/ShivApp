import React, { useEffect } from "react";

const ChildWindowComponent = () => {
  useEffect(() => {
    // Send a message to the parent window
    const parentOrigin = "https://your-parent-website.com"; // Replace with your parent website's origin
    const dataToSend = {
      /* your data here */
    };
    window.parent.postMessage(dataToSend, parentOrigin);
  }, []);

  return <div>hello</div>;
};

export default ChildWindowComponent;
