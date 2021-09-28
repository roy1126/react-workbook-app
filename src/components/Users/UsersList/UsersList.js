import { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import UsersContext from "../../../store/users-context";
import Card from "../../UI/Card/Card";
import classes from "./UsersList.module.css";
import Button from "../../UI/Button/Button";
import Axios from "axios";
import AlertContext from "../../../store/alert-context";
import { User } from "../../model/user.model";

const UsersList = (props) => {
  const usersCtx = useContext(UsersContext);
  const alertCtx = useContext(AlertContext);

  const instance = Axios.create({
    baseURL: "https://react-workbook-app-5017d-default-rtdb.firebaseio.com/",
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
  
  const deleteUser = (key) => {
    instance.delete(`users/${key}.json`).then(() => {
      usersCtx.removeUser(key);
      alertCtx.setAlertMessage("User DELETED Successfully!");
      setTimeout(() => {
        alertCtx.setIsSuccess(false);
      }, 3000);
      alertCtx.setIsSuccess(true);
    });
  };
  const startUpdating = (key) => {
    usersCtx.startUpdate(key);
  };

  return (
    <Card className={classes.list}>
      {usersCtx.users.length !== 0 && (
        <div>
          <Table hover responsive>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>EID</th>
                <th>BirthDate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usersCtx.users.map((user) => {
                return (
                  <tr key={user.key}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.eid}</td>
                    <td>{user.birthdate.toLocaleDateString()}</td>
                    <td>
                      <Button
                        size="small"
                        onClick={startUpdating.bind(null, user.key)}
                        class="update"
                      >
                        Update
                      </Button>
                      <Button
                        size="small"
                        onClick={deleteUser.bind(null, user.key)}
                        class="delete"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {usersCtx.users.length === 0 && (
        <div className={classes.noContent}>
          <h3>Loading...</h3>
        </div>
      )}
    </Card>
  );
};

export default UsersList;
