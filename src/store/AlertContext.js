import { useReducer } from "react";
import AlertContext from "./alert-context";

const defaultAlertState = {
  isSuccess: null,
  isError: null,
  alertMessage: null,
};

const alertReducer = (state, action) => {
  if (action.type === "SET_IS_SUCCESS") {
    return {
      isSuccess: action.value,
      isError: state.isError,
      alertMessage: state.alertMessage,
    };
  }
  if (action.type === "SET_IS_ERROR") {
    return {
      isSuccess: state.isSuccess,
      isError: action.value,
      alertMessage: state.alertMessage,
    };
  }

  if (action.type === "SET_ALERT_MESSAGE") {
    return {
      isSuccess: state.value,
      isError: state.isError,
      alertMessage: action.message,
    };
  }

  if (action.type === "RESET") {
    return {
      isSuccess: null,
      isError: null,
      alertMessage: null,
    };
  }
};

const AlertProvider = (props) => {
  const [alertState, dispatchAlertAction] = useReducer(
    alertReducer,
    defaultAlertState
  );

  const setIsSuccessHandler = (value) => {
    dispatchAlertAction({ type: "SET_IS_SUCCESS", value: value });
  };
  const setIsErrorHandler = (value) => {
    dispatchAlertAction({ type: "SET_IS_ERROR", value: value });
  };

  const setAlertMessageHandler = (message) => {
    dispatchAlertAction({ type: "SET_ALERT_MESSAGE", message: message });
  };

  const resetAllHandler = () => {
    dispatchAlertAction({ type: "RESET" });
  };

  const alertContext = {
    isSuccess: alertState.isSuccess,
    isError: alertState.isError,
    alertMessage: alertState.alertMessage,
    setIsSuccess: setIsSuccessHandler,
    setIsError: setIsErrorHandler,
    setAlertMessage: setAlertMessageHandler,
    resetAll: resetAllHandler,
  };

  return (
    <AlertContext.Provider value={alertContext}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
