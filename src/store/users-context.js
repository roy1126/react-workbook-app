import React from "react";

const UsersContext = React.createContext({
  updatingKey: null,
  updatingUser: null,
  users: [],
  setUsers: (users) => {},
  addUser: (user) => {},
  removeUser: (id) => {},
  startUpdate: (key) => {},
  updateUser: (key, user) => {},
});

export default UsersContext;
