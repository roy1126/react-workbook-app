import "./App.css";
import AddUser from "./components/Users/AddUser/AddUser";
import UsersList from "./components/Users/UsersList/UsersList";
import UsersProvider from "./store/UserProvider";

function App() {
  return (
    <UsersProvider>
      <AddUser />
      <UsersList />
    </UsersProvider>
  );
}

export default App;
