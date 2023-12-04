import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();
const Login = () => {
  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // const navigate = useNavigate();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password")
      // contact: data.get("contact"),
      // firstname: data.get("firstname"),
      // lastname: data.get("lastname")
    });
    // navigate("/home");
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        {/* <Container component="main" maxWidth="xs"> */}
        {/* <CssBaseline /> */}
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px"
            // width: "100wh"
          }}
        >
          ̥
          <Grid item xs={12} sm={4}>
            <Box
              component="form"
              noValidate
              onSubmit={HandleSubmit}
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                height: "100%",
                width: "100wh"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <AccountBoxOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In / Login
              </Typography>

              <Grid container spacing={2} marginTop={"10px"}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="contact"
                    label="Contact Number"
                    name="contact"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I Aggred to all terms & condition."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/register" variant="body2">
                    Not Have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        {/* </Container> */}
      </ThemeProvider>
    </>
  );
};

export default Login;
