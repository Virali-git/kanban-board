import { styled } from "@mui/material/styles";

import { Box, Button, TextField, Typography } from "@mui/material";

export const LoginContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "500px",
  margin: "auto",
  minHeight: "100vh",
}));

export const LoginFormContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.main}`,
  padding: theme.spacing(2),
}));

export const LoginForm = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
}));

export const LoginTitle = styled(Typography)(({ theme }) => ({
  fontSize: 30,
  paddingBottom: theme.spacing(2),
  fontWeight: 700,
  textAlign: "center",
}));

export const LoginTextFields = styled(TextField)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
}));

export const RecaptchaContainer = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

export const FormActions = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
