import { useReducer } from "react";
import UsersContext from "./users-context";

const defaultUsersState = {
  updatingKey: null,
  updatingUser: null,
  users: [],
};

const usersReducer = (state, action) => {
  if (action.type === "SET_USERS") {
    return {
      updatingKey: state.updatingKey,
      updatingUser: state.updatingUser,
      users: action.users,
    };
  }
  if (action.type === "ADD_USER") {
    return {
      updatingKey: state.updatingKey,
      updatingUser: state.updatingUser,
      users: [action.user, ...state.users],
    };
  }

  if (action.type === "START_UPDATE") {
    const index = state.users.findIndex((user) => user.key === action.key);
    return {
      updatingKey: action.key,
      updatingUser: state.users[index],
      users: state.users,
    };
  }

  if (action.type === "UPDATE_USER") {
    const editingIndex = state.users.findIndex(
      (user) => user.key === state.updatingKey
    );
    const oldUser = state.users[editingIndex];
    const updatedUser = {
      ...oldUser,
      ...action.user,
    };
    const updatedUsers = [...state.users];
    updatedUsers[editingIndex] = updatedUser;
    console.log("UPDATED USERS:", updatedUsers);

    return {
      updatingKey: null,
      updatingUser: null,
      users: updatedUsers,
    };
  }

  if (action.type === "REMOVE_USER") {
    const newUsers = state.users.filter((user) => user.key !== action.key);
    return {
      updatingKey: state.updatingKey,
      updatingUser: state.updatingUser,
      users: newUsers,
    };
  }
  return defaultUsersState;
};

const UsersProvider = (props) => {
  const [usersState, dispatchUsersAction] = useReducer(
    usersReducer,
    defaultUsersState
  );

  const setUsersHandler = (users) => {
    dispatchUsersAction({ type: "SET_USERS", users: users });
  };

  const addUserHandler = (user) => {
    dispatchUsersAction({ type: "ADD_USER", user: user });
  };

  const removeUserHandler = (key) => {
    dispatchUsersAction({ type: "REMOVE_USER", key: key });
  };

  const startUpdate = (key) => {
    dispatchUsersAction({ type: "START_UPDATE", key: key });
  };

  const updateUserHandler = (user) => {
    dispatchUsersAction({ type: "UPDATE_USER", user: user });
  };

  const usersContext = {
    updatingKey: usersState.updatingKey,
    updatingUser: usersState.updatingUser,
    users: usersState.users,
    setUsers: setUsersHandler,
    addUser: addUserHandler,
    removeUser: removeUserHandler,
    startUpdate: startUpdate,
    updateUser: updateUserHandler,
  };

  return (
    <UsersContext.Provider value={usersContext}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
