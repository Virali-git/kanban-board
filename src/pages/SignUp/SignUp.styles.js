import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
  styled,
} from "@mui/material";

export const Input = styled("input")({
  display: "none",
});

export const AvatarContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: "1rem",
});

export const AvatarChip = styled(Avatar)({
  width: "9em",
  height: "9em",
  borderRadius: "20%",
});

export const SignUpContainer = styled(Grid)({
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const SectionTitle = styled(Typography)({
  paddingBottom: "20px",
  textAlign: "center",
  fontSize: 28,
  fontWeight: 700,
  textDecoration: "underline",
});

export const SignInTextContainer = styled(Grid)({
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

export const SignUpForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  margin: "0 auto",
});

export const LoginTextFields = styled(TextField)({
  paddingBottom: "2rem",
});

export const SignUpButton = styled(Button)({
  marginTop: "1rem",
});
