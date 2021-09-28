import "./App.css";
import Alert from "./components/UI/Alert/Alert";
import AddUser from "./components/Users/AddUser/AddUser";
import UsersList from "./components/Users/UsersList/UsersList";
import AlertProvider from "./store/AlertContext";
import UsersProvider from "./store/UserProvider";

function App() {
  return (
    <UsersProvider>
      <AlertProvider>
        <Alert />
        <AddUser />
        <UsersList />
      </AlertProvider>
    </UsersProvider>
  );
}

export default App;
