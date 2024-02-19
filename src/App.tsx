/* eslint-disable @typescript-eslint/ban-ts-comment */
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "./component/pages/Loader";
const Account = lazy(() => import("./component/pages/Account"));
const Profile = lazy(() => import("./component/pages/Profile"));
const Payment = lazy(() => import("./component/pages/Payment"));
const HouseType = lazy(() => import("./component/pages/HouseType"));
const Tenants = lazy(() => import("./component/pages/Tenants"));
const TenantsUser = lazy(() => import("./component/pages/TenantUser"));
const Home = lazy(() => import("./component/pages/Home"));
const Dashboard = lazy(() => import("./component/pages/Dashboard"));
const TenantSignUp = lazy(() => import("./component/pages/TenantSignUp"));
const RouteNotFound = lazy(() => import("./component/pages/RouteNotFound"));
const Report = lazy(() => import("./component/pages/Report"));
const Users = lazy(() => import("./component/pages/Users"));
const House = lazy(() => import("./component/pages/House"));
import "./styles/app.scss";
import Toast from "./component/pages/Toast";
import Navbar from "./component/pages/Navbar";
import { ChangeUserSession, isUserLogined } from "./helper/localhelper";
import { useDispatch, useSelector } from "react-redux";
import UserLoginModal from "./component/pages/UserLoginModal";
import axiosConfig from "./helper/authApi";
// import axiosConfig from "./helper/authApi";
// import UserLoginModal from "./component/pages/UserLoginModal";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [show, setShow] = useState(false);
  //@ts-expect-error
  const { isUserLogin } = useSelector((state) => state.custom) || {};
  useEffect(() => {
    //  async function checkUserStatus() {
    //   try {

    //   } catch (error) {

    //   }
    //  }
    //  checkUserStatus()

    if (!isUserLogin) {
      navigate("/login");
    } else {
      (async () => {
        try {
          await axiosConfig.get("/users/status");
          // setShow(false);
          ChangeUserSession(dispatch, false);
        } catch (error) {
          console.log(error, "error");
          // setShow(true);
          ChangeUserSession(dispatch, true);
        }
      })();
    }
    setuserLoggedin(isUserLogin);
  }, [isUserLogin]);
  const [userLoggedin, setuserLoggedin] = useState<boolean>(isUserLogined());
  // const userLoggedin = isUserLogined();

  return (
    <>
      <Toast />
      <UserLoginModal />
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
          <Route path="/houses" element={<House />}></Route>
          <Route path="/tenant" element={<Tenants />}></Route>
          <Route path="/tenantsignup" element={<TenantSignUp />} />
          <Route path="/report" element={<Report />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tenantuser" element={<TenantsUser />} />
          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      </Suspense>
      {/* <Login />~
      <Register />; */}
    </>
  );
};

export default App;
