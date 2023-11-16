import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      {/* <Login />
      <Register />; */}
    </>
  );
};

export default App;
