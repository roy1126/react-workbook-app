import classes from "./Button.module.css";

const Button = (props) => {
  const className = `${classes.button} ${props.className} ${
    props.size ? classes.small : ""
  } ${
    props.class === "update"
      ? classes.update
      : props.class === "delete"
      ? classes.delete
      : ""
  }`;
  return (
    <button className={className} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
