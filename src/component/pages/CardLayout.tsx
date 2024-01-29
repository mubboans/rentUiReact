import * as React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import { Grid, Stack, Button } from "@mui/material";
type CardProps = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (event: any) => void;
  tableComponent: React.ReactNode;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CardLayout = ({ title, onSubmit, tableComponent }: CardProps) => {
  return (
    <Grid container columns={{ xs: 12, md: 10 }}>
      <Grid item xs={12} md={10}>
        <Card variant="outlined">
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            alignContent={"center"}
            flexWrap="wrap"
            justifyContent={"space-around"}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button variant="outlined" size="small" onClick={onSubmit}>
                Add New
              </Button>
            </div>
            <div>
              <h1>{title}</h1>
            </div>
          </Stack>

          {/* </CardActions> */}
          {/* </CardHeader> */}
          <CardContent>{tableComponent}</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CardLayout;
