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
import { ChangeUserSession, LogoutUser } from "../../helper/localhelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLoginModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { session } = useSelector((state) => state.custom) || {};
  console.log(session, "session");
  //   const [show, setshow] = useState(false);
  useEffect(() => {
    console.log(session, "session");
    // setshow(session);
  }, [session]);
  const handleClose = () => {
    console.log("Logout user");
    ChangeUserSession(dispatch, false);
    LogoutUser(dispatch);
    navigate("/login");
    // setshow(false);
  };
  return (
    <>
      <Dialog
        open={session}
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
