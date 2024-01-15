import { useNavigate, useSearchParams } from "react-router-dom";
import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import RegImage from "../../assets/images/regiter.jpeg";
import { styled } from "@mui/material/styles";
import * as yup from "yup";
import { Formik, Field, ErrorMessage, FieldProps, Form } from "formik";
import { useDispatch } from "react-redux";
import { Users } from "../../interface/users";

import { useMutation } from "@tanstack/react-query";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { ShowToast } from "../../helper/ToastHelper";
import axiosConfig from "../../helper/authApi";

const TenantSignUp = () => {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  });
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const initialValues = { email: "", password: "", confirmpassword: "" };
  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Emall is required"),
    password: yup.string().required("Password is required"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Confirm Password Not Match")
      .required("Confirm Password is required")
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [confirmshowPassword, setconfirmShowPassword] = React.useState(false);
  const handleConfirmClickShowPassword = () =>
    setconfirmShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const ConfirgureTenant = async (obj: Users) => {
    try {
      const response = await axiosConfig.patch("auth/tenantsignup", obj, {
        params: { token }
      });
      console.log(response, "response");
      // const cookies = response?.headers?.get("Set-Cookie");
      // const cookies = response.headers?.get();
      //   setValue("token", response?.data?.data?.accessToken);
      //   setValue("userdetail", response?.data);
      //   console.log("value set in local");
      ShowToast(dispatch, response?.data?.message, "success");
      //   console.log("Toast Show");
      //   ChangeUserState(dispatch, true);
      navigate("/login");
    } catch (error) {
      console.log(error, "error check");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ShowToast(dispatch, error?.response?.data?.error, "error");
      //   return error;
    }
  };
  const mutation = useMutation({
    mutationFn: async (event: Users) => {
      // event.preventDefault()
      return await ConfirgureTenant(event);
    }
  });
  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
          //   backgroundImage: { RegImage },
          //   backgroundRepeat: "no-repeat",
          //   backgroundColor: (t) =>
          //     t.palette.mode === "light"
          //       ? t.palette.grey[50]
          //       : t.palette.grey[900],
          //   backgroundSize: "cover",
          //   backgroundPosition: "center"
        }}
      >
        <Img alt="Register Now" src={RegImage} />
        {/* <img src={RegImage}  alt="Register Now"/> */}
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={mutation.mutate}
        >
          {(formik) => {
            return (
              <Form>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Configure Account
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Field name="email">
                      {({ field }: FieldProps) => (
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          autoComplete="email"
                          autoFocus
                          {...field}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="errors-messg"
                    />
                    <Field name="password">
                      {({ field }: FieldProps) => (
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
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="errors-messg"
                    />
                    <Field name="confirmpassword">
                      {({ field }: FieldProps) => (
                        <TextField
                          required
                          margin="normal"
                          fullWidth
                          label="Confirm Password"
                          type={confirmshowPassword ? "text" : "password"}
                          autoComplete="confirmpassword"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleConfirmClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {confirmshowPassword ? (
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
                    <ErrorMessage
                      name="confirmpassword"
                      component="div"
                      className="errors-messg"
                    />
                    {/* <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                          /> */}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={!formik.isValid}
                    >
                      Change
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="login" variant="body2">
                          Already Configure Login
                        </Link>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => {
                            console.log("mail shoot");
                            ShowToast(dispatch, "mail shoot", "success");
                          }}
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Link Expire Shoot Again
                        </Button>
                        {/* {""}
                              </Link> */}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};
export default TenantSignUp;
