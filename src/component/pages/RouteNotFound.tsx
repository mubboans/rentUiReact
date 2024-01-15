import { Link } from "react-router-dom";
import image from "../../assets/images/404_not_found.jpeg";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import { Chip } from "@mui/material";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

const RouteNotFound = () => {
  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 4, md: 12 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Grid item xs={12} md={6}>
        <ButtonBase sx={{ width: "100%", height: "100%" }}>
          <Img alt="complex" src={image} />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} md={6}>
        <Link to="/login">
          <Chip avatar={<Avatar>Login</Avatar>} label="Go to Login" />
        </Link>
      </Grid>
    </Grid>
  );
};

export default RouteNotFound;
