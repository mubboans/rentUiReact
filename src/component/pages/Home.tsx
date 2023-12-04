import Chip from "@mui/material/Chip";
import Profile from "./Profile";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
const Home = () => {
  const dispatch = useDispatch();
  const addSurname = () => {
    dispatch({
      type: "addSurname",
      payload: "Ansari"
    });
  };
  const addValue = () => {
    dispatch({
      type: "increment",
      payload: 1
    });
  };
  const removeValue = () => {
    dispatch({
      type: "decrement",
      payload: 1
    });
  };
  const { a, b } = useSelector((state) => state.custom);
  //   const chipLabel = "hello";
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#ffffff",
    ...theme.typography.body2,
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    color: theme.palette.text.secondary
  }));
  return (
    <div>
      <Grid
        container
        columns={{ xs: 4, md: 12 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ margin: "10px" }}
      >
        <Grid
          item
          xs={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Item>
            <Chip label={`Your name ${b}`} variant="outlined" />
            <Chip label={a} variant="outlined" />
            <Button
              onClick={addSurname}
              variant="outlined"
              style={{ marginTop: "10px" }}
            >
              Add Surname
            </Button>
            <Button
              onClick={addValue}
              variant="outlined"
              style={{ marginTop: "10px" }}
            >
              Add 1
            </Button>
            <Button
              onClick={removeValue}
              variant="outlined"
              style={{ marginTop: "10px" }}
            >
              Remove 1
            </Button>
          </Item>
        </Grid>

        <Grid
          item
          xs={10}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Item>
            <Profile />
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
