import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn, setUserTaskData } from "../../redux/appSlice";
import { loginAsync } from "../../utility/api";
import { useFormik } from "formik";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

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
    navigate("dashboard", { replace: true });
  };

  const onChange = (value) => {
    formik.setFieldValue("recaptcha", value);
  };

  const onExpired = () => {
    formik.setFieldValue("recaptcha", "");
  };

  const onSignUp = () => {
    navigate("sign-up", { replace: true });
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
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
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
