import React from "react";
import { PhotoCamera } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
  styled,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
//import { LOGIN } from "../navigation/ROUTES";
import { useDispatch } from "react-redux";
import {setIsLoggedIn, setUserTaskData } from "../redux/appSlice";


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

const Input = styled("input")({
  display: "none",
});

const AvatarContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: "1rem",
});

const AvatarChip = styled(Avatar)({
  width: "9em",
  height: "9em",
  borderRadius: "20%",
});

const SignUpContainer = styled(Grid)({
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const SectionTitle = styled(Typography)({
  paddingBottom: "20px",
  textAlign: "center",
  fontSize: 28,
  fontWeight: 700,
  textDecoration: "underline",
});

const SignInTextContainer = styled(Grid)({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  "& .MuiTypography-root": {
    fontSize: 24,
    color: "#997379",
    marginBottom: "1rem",
  },
  "& button": {
    color: "#000",
  },
});

const SignUpForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  margin: "0 auto",
});

const LoginTextFields = styled(TextField)({
  paddingBottom: "2rem",
});

const SignUpButton = styled(Button)({
  marginTop: "1rem",
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

  const signUpHandler = () =>{
    dispatch(setIsLoggedIn());
    navigate('/', { replace: true });
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      formik.setFieldValue("profilePic", URL.createObjectURL(img));
    }
  };

  const goToSignIn = () => {
    console.log("@@@testing");
   
  };

  return (
    <Container maxWidth="sm">
      <Grid container>
        <SignUpContainer item xs={12} md={12}>
          <SectionTitle>Sign Up Form</SectionTitle>
          <SignUpForm   
            component="form"	
            onSubmit={formik.handleSubmit}>
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
                <IconButton color="primary" aria-label="upload picture" component="span">
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
            color: '#ffff',
          }}
        >
          <SignInTextContainer>
            <Typography variant="h5" styles={{color:"#fff"}}>Already Have an Account?</Typography>
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
