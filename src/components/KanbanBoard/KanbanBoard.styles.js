import { Box, Grid, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

export const KanbanBoardContainer = styled(Box)({
  padding: "20px",
  backgroundColor: "#FFC0CB",
});

export const KanbanHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
});

export const StageContainer = styled(Grid)({
  backgroundColor: "#997379",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  padding: "16px",
  height: "100%",
});

export const KanbanTitle = styled(Typography)({
  fontWeight: "700",
});

export const CardContainer = styled(Box)({
  marginBottom: "10px",
});

export const ListContainer = styled("ul")({
  listStyleType: "none",
  margin: "10px",
  padding: "0",
});
