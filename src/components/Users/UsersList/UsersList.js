import { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import UsersContext from "../../../store/users-context";
import Card from "../../UI/Card/Card";
import classes from "./UsersList.module.css";
import Button from "../../UI/Button/Button";
import Axios from "axios";
import AlertSuccessful from "../../UI/Alert/AlertSuccessful";

const UsersList = (props) => {
  const usersCtx = useContext(UsersContext);
  const [alertMessage, setAlertMessage] = useState("");
  const [isDeletedSuccess, setIsDeletedSuccess] = useState(false);
  const instance = Axios.create({
    baseURL:
      "https://react-workbook-app-5017d-default-rtdb.firebaseio.com/users/",
  });
  const deleteUser = (key) => {
    instance.delete(`/${key}.json`).then(() => {
      usersCtx.removeUser(key);
      setAlertMessage("User DELETED Successfully");
      setTimeout(() => {
        setIsDeletedSuccess(false);
      }, 3000);
      setIsDeletedSuccess(true);
    });
  };
  const startUpdating = (key) => {
    usersCtx.startUpdate(key);
  };

  return (
    <Card className={classes.list}>
      {isDeletedSuccess && <AlertSuccessful message={alertMessage} />}
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
                  <tr key={user.eid}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.eid}</td>
                    <td>{user.birthdate.toLocaleDateString()}</td>
                    <td>
                      <Button
                        size="small"
                        onClick={startUpdating.bind(null, user.key)}
                      >
                        Update
                      </Button>
                      <Button
                        size="small"
                        onClick={deleteUser.bind(null, user.key)}
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
        <div className={classes.noContent}>No content</div>
      )}
    </Card>
  );
};

export default UsersList;
