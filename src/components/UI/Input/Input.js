import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const input = props.input;

  return (
    <div className={classes.input}>
      <label htmlFor={input.name}>{input.label}</label>
      <input
        name={input.name}
        type={input.type}
        defaultValue={input.defaultValue}
        {...props.register(input.name)}
      />
      {props.errors[input.name] && props.errors[input.name]?.message && (
        <p>{props.errors[input.name].message}</p>
      )}
    </div>
  );
};

export default Input;
