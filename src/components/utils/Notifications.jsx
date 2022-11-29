import React from "react";
import { ToastContainer } from "react-toastify";

const Notification = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
  />
);

const NotificationSuccess = ({ text }) => (
  <div style={{ backgroundColor: "green" }}>
    <i className="material-icons">check</i>
    <span className="white-text ">{text}</span>
  </div>
);

const NotificationError = ({ text }) => (
  <div style={{ backgroundColor: "red" }}>
    <i className="material-icons">clear</i>
    <span className="red-text ">{text}</span>
  </div>
);

export { Notification, NotificationSuccess, NotificationError };
