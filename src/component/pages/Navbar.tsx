import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../helper/localhelper";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AddchartTwoToneIcon from "@mui/icons-material/AddchartTwoTone";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useDispatch } from "react-redux";

const pages = ["Home", "Product", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];
const settings = [
  { label: "Profile", icons: <AccountCircleOutlinedIcon /> },
  { label: "Account", icons: <AssignmentIndOutlinedIcon /> },
  { label: "Dashboard", icons: <AddchartTwoToneIcon /> },
  { label: "Logout", icons: <ExitToAppOutlinedIcon /> }
];
type loginCheck = {
  userLoggedin?: boolean;
};
const Navbar = ({ userLoggedin }: loginCheck) => {
  // const location = useLocation();
  // console.log(userLoggedin, "userLoggedin check");

  const dispatch = useDispatch();
  // const [userLoggedin,setuserLoggedin] = React.useState<boolean>(isUserLogined())

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (data?: string) => {
    console.log(data, "data log");
    navigate(`/${data?.toLowerCase()}`);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (values: string) => {
    if (typeof values == "object") {
      return setAnchorElUser(null);
    }
    console.log(values, "values", typeof values, "typeof values");
    values = values?.toLowerCase();
    if (values == "logout") {
      LogoutUser(dispatch);
      navigate("/login");
    } else {
      navigate(`/${values}`);
    }

    // switch (values) {
    //   case "Profile":
    //     navigate("profile");
    //     break;
    //   case "Dashboard":
    //     navigate("dashboard");
    //     break;
    //   case "Account":
    //     navigate("account");
    //     break;
    //   case "Logout":
    //     navigate("login");
    //     console.log("clear token from local storage");
    //     break;
    // }
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DomainAddIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              //   letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            Apna Rent
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <DomainAddIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />
              {/* <AccountCircleIcon /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {userLoggedin &&
                pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          <DomainAddIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            Apna Rent
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {userLoggedin &&
              pages.map((page) => {
                return (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    // onClick={handleCloseNavMenu(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                );
              })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings"> */}
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
              size="large"
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            {/* </Tooltip> */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu(setting);
                  }}
                >
                  <Typography key={setting} textAlign="center">
                    {setting}
                  </Typography>
                </MenuItem>
              ))} */}
              {userLoggedin ? (
                <>
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.label}
                      onClick={() => {
                        handleCloseUserMenu(setting.label);
                      }}
                    >
                      {setting.icons}
                      <Typography key={setting.label} textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu("Login");
                    }}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
