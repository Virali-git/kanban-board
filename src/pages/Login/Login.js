import {  Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn, setUserTaskData } from "../../redux/appSlice";
import { loginAsync } from "../../utility/api";
import { useFormik } from "formik";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { ReCAPTCHA_KEY } from "../../config/config";

import {
  LoginContainer,
  LoginFormContainer,
  LoginTextFields,
  RecaptchaContainer,
  FormActions,
  LoginTitle,
  LoginForm,
} from "./Login.styles";

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

 

  // Formik configuration for the login form
  /**
   * Handles form submission and validation for the login form.
   * @const formik
   * @type {Object}
   * @param {Object} initialValues - The initial values for the form.
   * @param {boolean} validateOnChange - Enables validation on each change of form fields.
   * @param {Object} validationSchema - The validation schema for the form.
   * @param {function} onSubmit - The function to handle form submission.
   */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      recaptcha: "",
    },
    validateOnChange: true, // Enables validation on each change of form fields.
    validationSchema: validationSchema, // The validation schema for the login form fields.
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2)); // Displays an alert with the form values in a formatted JSON string.
      loginHandler(); // Calls the loginHandler function after form submission.
    },
  });
  
  /**
   * Handles user login and navigation to the dashboard.
   * @function loginHandler
   */
  const loginHandler = () => {
    dispatch(setIsLoggedIn()); // Dispatches the action to set the user as logged in.
    navigate("dashboard", { replace: true }); // Navigates to the dashboard page, replacing the current history entry.
  };
  
  /**
   * Handles the onChange event of the reCAPTCHA component.
   * @function onChange
   * @param {string} value - The value of the reCAPTCHA.
   */
  const onChange = (value) => {
    formik.setFieldValue("recaptcha", value); // Updates the formik form field value for the reCAPTCHA with the provided value.
  };
  
  /**
   * Handles the onExpired event of the reCAPTCHA component.
   * @function onExpired
   */
  const onExpired = () => {
    formik.setFieldValue("recaptcha", ""); // Resets the formik form field value for the reCAPTCHA to an empty string when it expires.
  };
  
  /**
   * Navigates to the sign-up page.
   * @function onSignUp
   */
  const onSignUp = () => {
    navigate("sign-up", { replace: true }); // Navigates to the sign-up page, replacing the current history entry.
  };
  
  return (
    <LoginContainer>
      <LoginFormContainer>
        <LoginTitle variant="h1">K'Ban Board Login</LoginTitle>
        <LoginForm component="form" onSubmit={formik.handleSubmit}>
          <LoginTextFields
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <LoginTextFields
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
          />
          <RecaptchaContainer>
            <ReCAPTCHA
              id="recaptcha"
              name="recaptcha"
              sitekey={ReCAPTCHA_KEY }
              onExpired={onExpired}
              onChange={onChange}
            />
            {formik.errors.recaptcha ? (
              <Typography sx={{ color: "error.main" }}>
                {formik.errors.recaptcha}
              </Typography>
            ) : null}
          </RecaptchaContainer>
          <FormActions>
            <Button variant="contained" type="submit">
              Login
            </Button>
            <Button variant="text" onClick={onSignUp}>
              Sign Up
            </Button>
          </FormActions>
        </LoginForm>
      </LoginFormContainer>
    </LoginContainer>
  );
};
