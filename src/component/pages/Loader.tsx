import { Grid } from "@mui/material";
import React from "react";
const Loader = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          height: "100%"
          // width: "100wh"
        }}
      >
        <div className="loader"></div>;
      </Grid>
    </>
  );
};

export default Loader;
