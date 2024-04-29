/* eslint-disable @typescript-eslint/ban-ts-comment */
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
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
const Highlights = lazy(() => import("./component/pages/Highlights"));
const Pricing = lazy(() => import("./component/pages/Pricing"));
const Users = lazy(() => import("./component/pages/Users"));
const House = lazy(() => import("./component/pages/House"));
import "./styles/app.scss";
import Toast from "./component/pages/Toast";
import Navbar from "./component/pages/Navbar";
import {
  ChangeUserSession,
  ChangeUserState
  // isUserLogined
} from "./helper/localhelper";
import { useDispatch, useSelector } from "react-redux";
import UserLoginModal from "./component/pages/UserLoginModal";
import axiosConfig from "./helper/authApi";
import ProtectedRoute from "./component/auth/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  const { isUserLogin, tokenstatus } =
    //@ts-expect-error9
    useSelector((state) => state.custom) || {};
  // const [userLoggedin, setuserLoggedin] = useState<boolean>(isUserLogined());
  useEffect(() => {
    console.log(isUserLogin, "isUserLogin");
    //   console.log(userLoggedin, "userLoggedin checkk");
    if (isUserLogin && tokenstatus == "invalid") {
      (async () => {
        try {
          await axiosConfig.get("/users/status");
          // setShow(false);
          ChangeUserSession(dispatch, false);
          ChangeUserState(dispatch, "userTokenStatus", "valid");
          ChangeUserState(dispatch, "userState", true);
        } catch (error) {
          console.log(error, "error");
          // setShow(true);
          ChangeUserState(dispatch, "userTokenStatus", "invalid");
          ChangeUserState(dispatch, "userState", false);
          ChangeUserSession(dispatch, false);
        }
      })();
    }
    //   if (userLoggedin) {
    //     setuserLoggedin(isUserLogin);
  }, [isUserLogin]);

  // const userLoggedin = isUserLogined();

  return (
    <>
      <Toast />
      <UserLoginModal isUserLogin={isUserLogin} />
      <Navbar userLoggedin={isUserLogin} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isUserLogin} Component={Home} />
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isUserLogin}
                Component={Dashboard}
              />
            }
          ></Route>
          <Route
            path="/account"
            element={
              <ProtectedRoute
                isAuthenticated={isUserLogin}
                Component={Account}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isAuthenticated={isUserLogin}
                Component={Profile}
              />
            }
          ></Route>
          <Route
            path="/payment"
            element={
              <ProtectedRoute
                isAuthenticated={isUserLogin}
                Component={Payment}
              />
            }
          ></Route>
          <Route
            path="/housetype"
            element={
              <ProtectedRoute
                isAuthenticated={isUserLogin}
                Component={HouseType}
              />
            }
          ></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute isAuthenticated={isUserLogin} Component={Home} />
            }
          ></Route>
          <Route
            path="/houses"
            element={
              <ProtectedRoute isAuthenticated={isUserLogin} Component={House} />
            }
          ></Route>

          <Route
            path="/tenant"
            element={
              <ProtectedRoute
                // path="/tenant"
                isAuthenticated={isUserLogin}
                Component={Tenants}
              />
            }
          ></Route>
          {/* </ProtectedRoute> */}
          <Route
            path="/tenantsignup"
            element={
              <ProtectedRoute
                isAuthenticated={isUserLogin}
                Component={TenantSignUp}
              />
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute
                isAuthenticated={isUserLogin}
                Component={Report}
              />
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute isAuthenticated={isUserLogin} Component={Users} />
            }
          />
          <Route
            path="/tenantuser"
            element={
              <ProtectedRoute
                isAuthenticated={isUserLogin}
                Component={TenantsUser}
              />
            }
          />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      </Suspense>
      {/* <Login />~
      <Register />; */}
    </>
  );
};

export default App;
