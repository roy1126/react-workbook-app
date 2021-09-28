import classes from "./Alert.module.css";
import { AiFillCheckCircle } from "react-icons/ai";
import AlertContext from "../../../store/alert-context";
import { useContext } from "react";

const Alert = (props) => {
  const alertCtx = useContext(AlertContext);
  let content;
  if (alertCtx.isSuccess && alertCtx.alertMessage) {
    content = (
      <div className={`${classes.parent} ${props.className} `}>
        <div className={classes.successAlert + " " + classes.alert}>
          <p>
            <AiFillCheckCircle className={classes.icon} />
            {alertCtx.alertMessage}
          </p>
        </div>
      </div>
    );
  } else if (alertCtx.isError && alertCtx.alertMessage) {
    content = (
      <div className={`${classes.parent} ${props.className} `}>
        <div className={classes.errorAlert + " " + classes.alert}>
          <p>
            <AiFillCheckCircle className={classes.icon} />
            {alertCtx.alertMessage}
          </p>
        </div>
      </div>
    );
  }
  return <>{content}</>;
};

export default Alert;
