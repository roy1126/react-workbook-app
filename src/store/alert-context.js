import React from "react";

const AlertContext = React.createContext({
  isSuccess: null,
  isError: null,
  alertMessage: null,
  setIsSuccess: (value) => {},
  setIsError: (value) => {},
  setAlertMessage: (message) => {},
  resetAll: () => {},
});

export default AlertContext;
