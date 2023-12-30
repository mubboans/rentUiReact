import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./component/pages/Home";
import { Dashboard } from "@mui/icons-material";
import Account from "./component/pages/Account";
import Profile from "./component/pages/Profile";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>

      {/* <Login />
      <Register />; */}
    </>
  );
};

export default App;
