/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axiosConfig from "../../helper/authApi";
import { User, Users } from "../../interface/users";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getValue } from "../../helper/localhelper";
import { CardHeader, Grid, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { CalendarMonthOutlined } from "@mui/icons-material";
import moment from "moment";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
// interface
const Profile = () => {
  const dispatch = useDispatch();
  const [userObj, setUserObj] = useState<User>({});
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "50px",
    maxHeight: "50px"
  });
  const userDetail = getValue("userdetail");
  const fetchDetail = async () => {
    try {
      const response = await axiosConfig.get(`/users?_id=${userDetail.id}`);
      const user = response?.data?.data as User[];
      console.log(response?.data, user, "response?.data");

      setUserObj(user[0]);
      console.log(user[0], "value check after assignment");
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ShowToast(dispatch, error?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    fetchDetail();
  }, []);
  function updateUser(obj: Users) {
    try {
      const d = ShowToast(dispatch, d?.response?.data?.message, "success");
    } catch (error) {
      ShowToast(dispatch, error?.response?.data?.message, "error");
    }
  }
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader
          style={{
            display: "flex",
            justifyContent: "center"
          }}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userObj.name?.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          action={<Img alt="Register Now" src={userObj.profileImg} />}
          title={userObj.name}
          subheader={userObj.role?.toUpperCase()}
        ></CardHeader>
        <CardContent>
          <Grid
            container
            columns={{ xs: 12, md: 12 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            // flexWrap={"nowrap"}
            // style={{ margin: "10px" }}
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                value={userObj.name}
                label="Name"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                // variant="standard"
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                value={userObj.email}
                label="Email"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                // variant="standard"
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                value={userObj.contact}
                label="Contact"
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                // variant="standard"
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled
                variant="filled"
                value={userObj.role?.toUpperCase()}
                label="Role"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Stack direction="row" spacing={1} justifyContent={"center"}>
                <Chip
                  icon={<CalendarMonthOutlined />}
                  label={moment(userObj.createdAt).format("DD.MM.YYYY")}
                  variant="outlined"
                />
                <Chip
                  label={userObj?.isActive ? "Active" : "InActive"}
                  color="success"
                  variant="filled"
                />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Button size="small" variant="outlined" onClick={updateUser}>
            Update
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Profile;
