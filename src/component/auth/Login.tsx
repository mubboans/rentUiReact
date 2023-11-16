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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { deepPurple } from "@mui/material/colors";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();
const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      contact: data.get("contact"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname")
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Container component="main" maxWidth="xs"> */}
      {/* <CssBaseline /> */}
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid item xs={12} sm={4}>
          <Box
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
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
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </Container> */}
    </ThemeProvider>
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const handleSubmit = (event: any) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password")
  //     });
  //   };

  //   return (
  //     <Grid container justifyContent="center" alignItems="center" width={"100wh"}>
  //       <Grid item xs={12} sm={4}>
  //         {/* <Container component="main"> */}
  //         <Box
  //           sx={{
  //             marginTop: 8,
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //             margin: "auto",
  //             height: "100%",
  //             width: "100wh"
  //           }}
  //         >
  //           <Avatar sx={{ m: 1, bgcolor: deepPurple[500] }}>
  //             <AccountBoxOutlinedIcon />
  //           </Avatar>
  //           <Typography component="h1" variant="h5">
  //             Welcome to Rental App
  //           </Typography>
  //           <Typography component="h1" variant="h5">
  //             Sign In / Login
  //           </Typography>
  //           <Box
  //             component="form"
  //             onSubmit={handleSubmit}
  //             noValidate
  //             sx={{ mt: 1 }}
  //           >
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               id="email"
  //               label="Email Address"
  //               name="email"
  //               autoComplete="email"
  //               autoFocus
  //             />
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               name="password"
  //               label="Password"
  //               type="password"
  //               id="password"
  //               autoComplete="current-password"
  //             />
  //             <FormControlLabel
  //               control={<Checkbox value="remember" color="primary" />}
  //               label="Remember me"
  //             />
  //             <Button
  //               type="submit"
  //               fullWidth
  //               variant="contained"
  //               sx={{ mt: 3, mb: 2 }}
  //             >
  //               Login
  //             </Button>
  //             <Grid container>
  //               <Grid item xs>
  //                 <Link href="#" variant="body2">
  //                   Forgot password?
  //                 </Link>
  //               </Grid>
  //               <Grid item>
  //                 <Link href="#" variant="body2">
  //                   {"Don't have an account? Sign Up"}
  //                 </Link>
  //               </Grid>
  //             </Grid>
  //           </Box>
  //         </Box>
  //         {/* </Container> */}
  //       </Grid>
  //     </Grid>
  //   );
};

export default Login;
