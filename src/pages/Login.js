import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setIsLoggedIn, setUserTaskData } from "../redux/appSlice";
import { loginAsync } from "../utility/api";
import { useFormik } from "formik";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
//import { DASHBOARD, SIGNUP } from "../navigation/ROUTES";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
  recaptcha: yup.string("Pleasae verify").required("Please Verify"),
});

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      recaptcha: "",
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
    
      alert(JSON.stringify(values, null, 2));
      loginHandler();
    },
  });

  const loginHandler = () => {
    dispatch(setIsLoggedIn());
   // dispatch(setUserTaskData());
    
   // dispatch(loginAsync(dispatch ,formik.values.email,formik.values.password));
    navigate('dashboard', { replace: true });
    
  };

  const onChange = (value) => {
    // console.log("Captcha value:", value);
    formik.setFieldValue("recaptcha", value);
  };

  const onExpired = () => {
    formik.setFieldValue("recaptcha", "");
  };

  const onSignUp = () => {
    navigate('sign-up', { replace: true });
  };

  return (
    <Box sx={styles.LoginContainer}>
      <Box sx={styles.LoginFormContainer}>
        <Typography variant="h1" sx={styles.LoginTitle}>
          K'Ban Board Login
        </Typography>
        <Box
          sx={styles.LoginForm}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={styles.LoginTextFields}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={styles.LoginTextFields}
          />
          <Box sx={styles.RecaptchaContainer}>
            <ReCAPTCHA
              id="recaptcha"
              name="recaptcha"
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onExpired={onExpired}
              onChange={onChange}
            />
            {formik.errors.recaptcha ? (
              <Typography sx={{ color: "error.main" }}>
                {formik.errors.recaptcha}
              </Typography>
            ) : null}
          </Box>
          <Box sx={styles.FormActions}>
            <Button variant="contained" type="submit">
              Login
            </Button>
            <Button variant="text" onClick={onSignUp}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  LoginContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "500px",
    margin: "auto",
    minHeight: "100vh",
  },
  LoginFormContainer: {
    border: "1px solid",
    borderColor: "secondary.main",
    p: 2,
  },
  LoginForm: {
    display: "flex",
    justifyContent: "ceter",
    flexDirection: "column",
    alignItems: "center",
  },
  LoginTitle: {
    fontSize: 30,
    pb: 2,
    fontWeight: 700,
    textAlign: "center",
  },
  LoginTextFields: {
    pb: 2,
  },
  RecaptchaContainer: {
    pb: 2,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  FormActins: {
    display: "flex",
    justifyContent: "space-between",
  },
};
