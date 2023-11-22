import { Dialog } from "@mui/material";
import React, { useState, useEffect } from "react";
const Popup = ({ children, visible, onClose }) => {
  const [isVisible, setIsVisisble] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const popupLink = document.getElementById("popupLink");
    if (popupLink) {
      popupLink.addEventListener("click", () => {
        setIsVisisble(true);
      });
    }

    return () => {
      popupLink?.removeEventListener("click", () => {
        setIsVisisble(true);
      });
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return visible && isVisible ? (
    <div className="popup">
      <div className="popup-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default Popup;
