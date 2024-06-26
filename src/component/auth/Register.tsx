/* eslint-disable @typescript-eslint/ban-ts-comment */
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import "../../App.css";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { User } from "../../interface/users";
import axiosConfig from "../../helper/authApi";
// import { SuccesResponse, ErrorResponse } from "../../type/LoginResponse";
import { ChangeUserState, setValue } from "../../helper/localhelper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowToast } from "../../helper/ToastHelper";

const defaultTheme = createTheme();

const Register = () => {
  console.log("Register");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function RegisterUser(obj: User) {
    try {
      setBtnText("Loading");
      console.log("mutation hits");
      const response = await axiosConfig.post("auth/register", obj);
      setValue("token", response?.data?.accessToken);
      setValue("userdetail", response?.data);
      setBtnText("Register");
      ShowToast(dispatch, response?.data?.message, "success");
      ChangeUserState(dispatch, "userState", true);
      navigate("/houses");
      // return response.data;
    } catch (e) {
      setBtnText("Retry");
      //@ts-ignore
      ShowToast(dispatch, e?.response?.data?.message, "error");
      return e;
    }
  }
  const mutation = useMutation({
    mutationFn: async (event: User) => {
      // event.preventDefault()
      return await RegisterUser(event);
    }
  });
  const [BtnText, setBtnText] = useState("Register");
  // async (user: User) => {
  // };
  // }
  // );
  const initialValues = {
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    password: ""
  };
  //@ts-expect-error
  const onSubmit = (event) => {
    console.log("THE VALUE OF USER INPUT", event);
    mutation.mutate({ ...event, name: event.firstname + event.lastname });
  };
  const validationSchema = yup.object({
    firstname: yup.string().required("First Name Required"),
    lastname: yup.string().required("Last Name Required"),
    contact: yup.string().min(10).max(10).required("Contact Number Required"),
    email: yup.string().email("Invalid Email").required("Emall is required"),
    password: yup.string().required("Password is required"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Password Not Match")
      .required("Confirm Password is required")
  });
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, setCShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickCShowPassword = () => setCShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // };

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
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {(formik) => {
            // console.log(formik, "formik");

            return (
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
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up / Register
                  </Typography>
                  <Form>
                    <Box
                      // component="form"
                      // noValidate
                      // onSubmit={handleSubmit}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Field name="firstname">
                            {({ field }: FieldProps) => (
                              <TextField
                                {...field}
                                required
                                fullWidth
                                label="First Name"
                                autoFocus
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="firstname"
                            component={"div"}
                            className="errors-messg"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field name="lastname">
                            {({ field }: FieldProps) => (
                              <TextField
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                autoComplete="family-name"
                                {...field}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="lastname"
                            component={"div"}
                            className="errors-messg"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field name="email">
                            {({ field }: FieldProps) => (
                              <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                {...field}
                                autoComplete="email"
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="email"
                            component={"div"}
                            className="errors-messg"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field name="contact">
                            {({ field }: FieldProps) => (
                              <TextField
                                required
                                fullWidth
                                type="number"
                                id="contact"
                                label="Contact Number"
                                autoComplete="email"
                                {...field}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="contact"
                            component={"div"}
                            className="errors-messg"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field name="password">
                            {({ field }: FieldProps) => (
                              <TextField
                                required
                                fullWidth
                                label="Password"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
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
                              />
                            )}
                          </Field>

                          <ErrorMessage
                            name="password"
                            component={"div"}
                            className="errors-messg"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Field name="confirmpassword">
                            {({ field }: FieldProps) => (
                              <TextField
                                required
                                fullWidth
                                label="Confirm Password"
                                id="password"
                                type={cshowPassword ? "text" : "password"}
                                autoComplete="new-password"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickCShowPassword}
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
                              />
                            )}
                          </Field>

                          <ErrorMessage
                            name="confirmpassword"
                            component={"div"}
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
                            label="I Aggred to all terms & condition."
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        disabled={!formik.isValid}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        {BtnText}
                      </Button>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Link href="/login" variant="body2">
                            Already have an account? Sign in
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Form>
                </Box>
              </Grid>
            );
          }}
        </Formik>
      </Grid>
      {/* </Container> */}
    </ThemeProvider>
  );
};

export default Register;
