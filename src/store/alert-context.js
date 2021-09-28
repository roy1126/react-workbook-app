import React from "react";

const AlertContext = React.createContext({
  isSuccess: null,
  alertMessage: null,
  setIsSuccess: (value) => {},
  setAlertMessage: (message) => {},
  resetAll: () => {},
});

export default AlertContext;
