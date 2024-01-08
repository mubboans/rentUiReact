/* eslint-disable @typescript-eslint/ban-ts-comment */
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "./component/pages/Loader";
const Account = lazy(() => import("./component/pages/Account"));
const Profile = lazy(() => import("./component/pages/Profile"));
const Payment = lazy(() => import("./component/pages/Payment"));
const HouseType = lazy(() => import("./component/pages/HouseType"));
const Tenants = lazy(() => import("./component/pages/Tenants"));
const Home = lazy(() => import("./component/pages/Home"));
const Dashboard = lazy(() => import("./component/pages/Dashboard"));
import "./styles/app.scss";
import Toast from "./component/pages/Toast";
import Navbar from "./component/pages/Navbar";
import { isUserLogined } from "./helper/localhelper";
import { useSelector } from "react-redux";
const App = () => {
  //@ts-expect-error
  const { isUserLogin } = useSelector((state) => state.custom) || {};
  useEffect(() => {
    console.log(isUserLogin, "userState");

    setuserLoggedin(isUserLogin);
  }, [isUserLogin]);
  const [userLoggedin, setuserLoggedin] = useState<boolean>(isUserLogined());
  // const userLoggedin = isUserLogined();

  return (
    <>
      <Toast />
      <Navbar userLoggedin={userLoggedin} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/housetype" element={<HouseType />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/tenant" element={<Tenants />}></Route>
        </Routes>
      </Suspense>
      {/* <Login />
      <Register />; */}
    </>
  );
};

export default App;
