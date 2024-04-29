import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeUserSession,
  // getValue,
  LogoutUser
} from "../../helper/localhelper";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
interface loginProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isUserLogin: any;
}
const UserLoginModal = ({ isUserLogin }: loginProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { tokenstatus } = useSelector((state) => state.custom) || {};
  console.log(isUserLogin, tokenstatus, "session data check");
  const [show, setshow] = useState(() =>
    isUserLogin && tokenstatus == "invalid" ? true : false
  );
  // useEffect(() => {
  //   console.log(isUserLogin, "session");
  //   const token = getValue("token");
  //   console.log(token, "toekn check");
  //   if (!token) {
  //     navigate("/login");
  //   }
  //   setshow(isUserLogin);
  // }, [isUserLogin, navigate]);
  const handleClose = () => {
    console.log("Logout user");
    ChangeUserSession(dispatch, false);
    setshow(false);
    LogoutUser(dispatch);
    navigate("/login");
    console.log(show, "sho check");

    // setshow(false);
  };
  return (
    <>
      <Dialog
        open={show}
        // onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {"Its Seem Your Token Has Expired"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please login Again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button variant="outlined" onClick={handleClose} autoFocus>
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserLoginModal;
