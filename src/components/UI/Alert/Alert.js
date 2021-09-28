import classes from "./Alert.module.css";
import { AiFillCheckCircle } from "react-icons/ai";
import AlertContext from "../../../store/alert-context";
import { useContext } from "react";

// const AlertSuccessful = (props) => {
//   return (
//     <>
//       {props.message && (
//         <div className={`${classes.parent} ${props.className}`}>
//           {
//             <div className={classes.successAlert + " " + classes.alert}>
//               <p>
//                 <AiFillCheckCircle className={classes.icon} />
//                 {props.message}
//               </p>
//             </div>
//           }
//         </div>
//       )}
//     </>
//   );
// };

const Alert = (props) => {
  const alertCtx = useContext(AlertContext);
  return (
    <>
      {/* SUCCESS */}
      {alertCtx.isSuccess && alertCtx.alertMessage && (
        <div className={`${classes.parent} ${props.className} `}>
          <div className={classes.successAlert + " " + classes.alert}>
            <p>
              <AiFillCheckCircle className={classes.icon} />
              {alertCtx.alertMessage}
            </p>
          </div>
        </div>
      )}
      {/* ERROR */}
      {/* {!alertCtx.isSuccess && alertCtx.alertMessage && (
        <div className={`${classes.parent} ${props.className} `}>
          <div className={classes.errorAlert + " " + classes.alert}>
            <p>
              <AiFillCheckCircle className={classes.icon} />
              {alertCtx.alertMessage}
            </p>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Alert;
