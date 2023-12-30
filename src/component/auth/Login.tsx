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
import * as yup from "yup";
import "../../App.css";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";

const defaultTheme = createTheme();

const initialValues = { email: "", password: "" };
const onSubmit = (event) => {
  console.log("THE VALUE OF USER INPUT", event);
  // event.preventDefault();
  // const navigate = useNavigate();
  // const data = new FormData(event.currentTarget);
  // console.log({
  //   email: data.get("email"),
  //   password: data.get("password")
  // });
  // console.log(formik.values, "formik values");

  // navigate("/home");
};
const validationSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Emall is required"),
  password: yup.string().required("Password is required")
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   validationSchema
  // });
  // console.log(formik.errors, "formik values");

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
          <Grid item xs={12} sm={4}>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Box
                    // component="form"
                    // noValidate
                    // onSubmit={formik.handleSubmit}
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
                    <Form>
                      <Grid container spacing={2} marginTop={"10px"}>
                        <Grid item xs={12}>
                          <Field name="email">
                            {({ field }) => (
                              <TextField
                                {...field}
                                autoComplete="email"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                autoFocus
                                // {...formik.getFieldProps("email")}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="errors-messg"
                          />
                          {/* {formik.touched.email && formik.errors.email ? (
                          <div style={errors}>{formik.errors?.email}</div>
                        ) : null} */}
                        </Grid>
                        <Grid item xs={12}>
                          {/* <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel> */}
                          <Field name="password">
                            {({ field }) => (
                              <TextField
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="password"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }}
                                {...field}
                                // {...formik.getFieldProps("password")}
                                // onChange={formik.handleChange}
                                // value={formik.values.password}
                                // onBlur={formik.handleBlur}
                              />
                            )}
                          </Field>
                          {/* {formik.touched.password && formik.errors.password ? (
                          <div style={errors}>{formik.errors?.password}</div>
                        ) : null} */}
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="errors-messg"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                value="allowExtraEmails"
                                color="primary"
                              />
                            }
                            label="Remember me."
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!formik.isValid}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Login
                      </Button>
                    </Form>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/register" variant="body2">
                          Not Have an account? Sign Up
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
        {/* </Container> */}
      </ThemeProvider>
    </>
  );
};

export default Login;
