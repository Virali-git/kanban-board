import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/appSlice";
import {
  Input,
  AvatarChip,
  AvatarContainer,
  SignUpButton,
  LoginTextFields,
  SignUpForm,
  SignInTextContainer,
  SectionTitle,
  SignUpContainer,
} from "./SignUp.styles";

const phoneRegExp = /^[6-9]\d{9}$/;

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  username: yup.string("Enter your username").required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter your contact number"),
});

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      contact: "",
      profilePic: "",
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      signUpHandler();
    },
  });

  const signUpHandler = () => {
    dispatch(setIsLoggedIn());
    navigate("/", { replace: true });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      formik.setFieldValue("profilePic", URL.createObjectURL(img));
    }
  };

  const goToSignIn = () => {
    navigate("/", { replace: true });
  };

  return (
    <Container maxWidth="sm">
      <Grid container>
        <SignUpContainer item xs={12} md={12}>
          <SectionTitle>Sign Up Form</SectionTitle>
          <SignUpForm component="form" onSubmit={formik.handleSubmit}>
            <AvatarContainer>
              <AvatarChip src={formik.values.profilePic} />
              <label htmlFor="icon-button-file">
                <Input
                  defaultValue={""}
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={onImageChange}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AddIcon />
                </IconButton>
              </label>
            </AvatarContainer>
            <LoginTextFields
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <LoginTextFields
              fullWidth
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
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
            <LoginTextFields
              fullWidth
              id="contact"
              name="contact"
              label="Contact Number"
              type="tel"
              variant="outlined"
              value={formik.values.contact}
              onChange={formik.handleChange}
              error={formik.touched.contact && Boolean(formik.errors.contact)}
              helperText={formik.touched.contact && formik.errors.contact}
            />
            <SignUpButton variant="outlined" type="submit">
              Sign Up
            </SignUpButton>
          </SignUpForm>
        </SignUpContainer>
        <Grid
          item
          xs={12}
          md={12}
          style={{
            color: "#ffff",
          }}
        >
          <SignInTextContainer>
            <Typography variant="h5" styles={{ color: "#fff" }}>
              Already Have an Account?
            </Typography>
            <Button variant="text" onClick={goToSignIn}>
              Login In
            </Button>
          </SignInTextContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

//export default SignUp;
