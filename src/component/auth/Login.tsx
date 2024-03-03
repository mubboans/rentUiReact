/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import axiosConfig from "../../helper/authApi";
import { useMutation } from "@tanstack/react-query";
import { ChangeUserState, setValue } from "../../helper/localhelper";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../../helper/ToastHelper";
import { useDispatch } from "react-redux";
const defaultTheme = createTheme();
interface loginData {
  email?: string;
  password?: string;
}
const initialValues = { email: "", password: "",isTenant:true  };

const validationSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Emall is required"),
  password: yup.string().required("Password is required"),
  isTenant: yup.boolean().default(true)
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const LoginUser = async (obj: loginData) => {
    try {
      console.log("post");
      const response = await axiosConfig.post("auth/login", obj);

      console.log(response, "response");
      // const cookies = response?.headers?.get("Set-Cookie");
      // const cookies = response.headers?.get();
      setValue("token", response?.data?.data?.accessToken);
      setValue("userdetail", response?.data?.data);
      console.log("value set in local");
      ShowToast(dispatch, response?.data?.message, "success");
      console.log("Toast Show");
      ChangeUserState(dispatch, true);
      navigate("/houses");
      return response;
    } catch (error) {
      console.log(error, "error check");
      //@ts-ignore
      ShowToast(dispatch, error?.response?.data?.error, "error");
      return error;
    }
  };
  const mutation = useMutation({
    mutationFn: async (event: loginData) => {
      // event.preventDefault()
      return await LoginUser(event);
    }
  });
  const onSubmit = (event: loginData) => {
    console.log("THE VALUE OF USER INPUT", event);
    mutation.mutate(event);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px"
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
                            {({ field }: FieldProps) => (
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
                            {/* eslint-enable */}
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
                          {/* {formik.touched.password && formik.errors.password ? (
                          <div style={errors}>{formik.errors?.password}</div>
                        ) : null} */}
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="errors-messg"
                          />
                        </Grid>

                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
                          <Field name="isTenant">
                            {({ field }: FieldProps) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={field.value}
                                    onChange={(x) => {
                                      formik.setFieldValue(
                                        "isTenant",
                                        x.target.checked
                                      );
                                      // console.log(x.target.checked, "x check");
                                    }}
                                  />
                                }
                                {...field}
                                label="Tenant Login"
                              />
                            )}
                          </Field>
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
