import Card from "../../UI/Card/Card";
import classes from "./AddUser.module.css";
import Button from "../../UI/Button/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../UI/Input/Input";
import { Fragment, useContext, useEffect, useState } from "react";
import UsersContext from "../../../store/users-context";
import { User } from "../../model/user.model";
import Axios from "axios";
import AlertContext from "../../../store/alert-context";
const contents = {
  inputs: [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      defaultValue: null,
    },
    { label: "Last Name", name: "lastName", type: "text", defaultValue: null },
    { label: "Email", name: "email", type: "email", defaultValue: null },
    { label: "Enterprise ID", name: "eid", type: "number", defaultValue: null },
    {
      label: "BirthDate",
      name: "birthdate",
      type: "date",
      defaultValue: `${new Date().getFullYear()}-${
        new Date().getMonth() > 8
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1)
      }-${new Date().getDate()}`,
    },
  ],
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("This field is required.")
    .matches(/^[aA-zZ\s]+$/, "Input must be LETTERS only."),
  lastName: yup
    .string()
    .trim()
    .required("This field is required.")
    .matches(/^[aA-zZ\s]+$/, "Input must be LETTERS only."),
  email: yup
    .string()
    .email("Please input a valid email.")
    .required("This field is required."),
  eid: yup
    .string()
    .required("This field is required.")
    .matches(/^[+]?\d+([.]\d+)?$/, '"Input must be WHOLE NUMBERS only."'),
  birthdate: yup.date().required("This field is required."),
});

const AddUser = (props) => {
  const usersCtx = useContext(UsersContext);
  const alertCtx = useContext(AlertContext);
  const instance = Axios.create({
    baseURL: "https://react-workbook-app-5017d-default-rtdb.firebaseio.com/",
    headers: { "Content-type": "application/json" },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchData = async () => {
    if (usersCtx.users.length === 0) {
      const response = await instance.get("users.json");
      const usersData = response.data;

      if (usersData?.length === 0 || usersData === null) {
        usersCtx.setUsers([]);
        return;
      }

      const newUsersData = [];

      for (const key in usersData) {
        const val = usersData[key].data;
        const user = new User(
          key,
          val.firstName,
          val.lastName,
          val.email,
          val.eid,
          new Date(val.birthdate)
        );
        newUsersData.push(user);
      }
      usersCtx.setUsers(newUsersData);
    }
  };
  useEffect(() => {
    fetchData();
  });

  const onSubmitForm = (data, e) => {
    const key = isEditing ? usersCtx.updatingKey : null;

    const user = new User(
      key,
      data.firstName,
      data.lastName,
      data.email,
      data.eid,
      new Date(data.birthdate)
    );

    console.log(user);

    if (isEditing) {
      instance
        .put(`users/${key}.json`, { data: user })
        .then((res) => {
          user.key = res.data.name;
          usersCtx.updateUser(user);
          alertCtx.setAlertMessage("User EDITED Successfully!");
          setTimeout(() => {
            alertCtx.setIsSuccess(false);
          }, 3000);
          alertCtx.setIsSuccess(true);
        })
        .catch((error) => {
          alertCtx.setAlertMessage(error);
          setTimeout(() => {
            alertCtx.setIsError(false);
          }, 3000);
          alertCtx.setIsError(true);
        });
    } else {
      instance
        .post("users.json", {
          data: user,
        })
        .then((res) => {
          user.key = res.data.name;
          usersCtx.addUser(user);
          alertCtx.setAlertMessage("User ADDED Successfully!");
          setTimeout(() => {
            alertCtx.setIsSuccess(false);
          }, 3000);
          alertCtx.setIsSuccess(true);
        })
        .catch((error) => {
          alertCtx.setAlertMessage(error);
          setTimeout(() => {
            alertCtx.setIsError(false);
          }, 3000);
          alertCtx.setIsError(true);
        });
    }

    e.target.reset();
    onResetForm();
  };

  const onResetForm = () => {
    reset("", { keepErrors: false });
    setIsEditing(false);
    // usersCtx.startUpdate(null);
  };

  useEffect(() => {
    if (usersCtx.updatingUser) {
      setIsEditing(true);
      const user = usersCtx.updatingUser;
      setValue("firstName", user.firstName, { shouldValidate: true });
      setValue("lastName", user.lastName, { shouldValidate: true });
      setValue("email", user.email, { shouldValidate: true });
      setValue("eid", user.eid, { shouldValidate: true });
      setValue(
        "birthdate",
        `${user.birthdate.getFullYear()}-${
          user.birthdate.getMonth() > 8
            ? user.birthdate.getMonth() + 1
            : "0" + (user.birthdate.getMonth() + 1)
        }-${
          user.birthdate.getDate() > 9
            ? user.birthdate.getDate()
            : "0" + user.birthdate.getDate()
        }`,
        { shouldValidate: true }
      );
    }
  }, [usersCtx.updatingUser, setValue]);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Fragment>
      <Card className={classes.input}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className={classes.inputGroups}>
            {contents.inputs.map((input) => (
              <Input
                key={input.name}
                input={input}
                register={register}
                errors={errors}
              />
            ))}
          </div>
          <div className={classes.actions}>
            <Button
              type="submit"
              className={isEditing ? classes.isEditing : ""}
            >
              {isEditing ? "Save User" : "Add User"}
            </Button>
            <Button type="button" onClick={onResetForm}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
