import { styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

export const StyledTicketCard = styled("div")({
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
});

export const StyledTypography = styled(Typography)({
  fontWeight: "bold",
});
