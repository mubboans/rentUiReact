// import { Link } from "react-router-dom";
import image from "../../assets/images/404_not_found.jpeg";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

const RouteNotFound = () => {
  const navigate = useNavigate();
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
      <Grid item xs={12} md={10}>
        <ButtonBase sx={{ width: "100%", height: "100%" }}>
          <Img alt="complex" src={image} />
        </ButtonBase>
        {/* <Chip
          style={{
            margin: "auto",
            alignSelf: "center"
          }}
          avatar={<ArrowBackRoundedIcon />}
          onClick={() => {
            navigate(-1);
          }}
          label="Back"
        /> */}
      </Grid>
      <Grid item xs={12} md={2}>
        {/* <Link to="/login"> */}
        <Chip
          avatar={<ArrowBackRoundedIcon />}
          onClick={() => {
            navigate(-1);
          }}
          label="Back"
        />
        {/* </Link> */}
      </Grid>
    </Grid>
  );
};

export default RouteNotFound;
