import classes from "./AlertSuccessful.module.css";
import { AiFillCheckCircle } from "react-icons/ai";

const AlertSuccessful = (props) => {
  return (
    <>
      {props.message && (
        <div className={`${classes.parent} ${props.className}`}>
          {
            <div className={classes.successAlert + " " + classes.alert}>
              <p>
                <AiFillCheckCircle className={classes.icon} />
                {props.message}
              </p>
            </div>
          }
        </div>
      )}
    </>
  );
};

export default AlertSuccessful;
