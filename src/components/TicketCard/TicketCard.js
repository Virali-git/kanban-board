import React from "react";
import {
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import { format } from "date-fns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  moveTaskForward,
  stagesSelector,
  moveTaskBackward,
  setTaskEditable,
  setEditData,
  setDeleteData,
} from "../../redux/dashboardSlice";
import { openModal } from "../../redux/dialogSlice";

import {
  StyledCard,
  StyledTicketCard,
  StyledTypography,
} from "./TicketCard.styles";

export const TicketCard = (props) => {
  const { data, index, isDialogOpen, setIsDialogOpen } = props;
  const dispatch = useDispatch();
  const allStages = useSelector(stagesSelector);
  /**
   * Determines the MUI theme color variant based on the priority value.
   * @function priorityStyle
   * @param {string} priority - The priority value (e.g., "low", "medium", or any other value).
   * @returns {string} The MUI theme color variant corresponding to the priority value.
   */
  const priorityStyle = (priority) => {
    switch (priority) {
      case "low":
        return "success.dark";
      case "medium":
        return "warning.dark";
      default:
        return "error.dark";
    }
  };

  return (
    <StyledTicketCard>
      <StyledCard>
        <CardContent>
          <StyledTypography variant="h6" component="h2">
            {data?.taskName}
          </StyledTypography>
          <StyledTypography
            sx={{
              color: priorityStyle(data?.priority),
            }}
          >
            {data?.priority}
          </StyledTypography>
          <Typography>
            {format(new Date(data?.deadline), "dd/MM/yyyy")}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            disabled={data?.stage === allStages?.indexOf("Backlog")}
            onClick={() => {
              dispatch(moveTaskBackward(data));
            }}
            color="primary"
            aria-label="change ticket to previous state"
            component="span"
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            disabled={data?.stage === allStages?.indexOf("Done")}
            onClick={() => {
              dispatch(moveTaskForward(data));
            }}
            color="primary"
            aria-label="change ticket to next state"
            component="span"
          >
            <ArrowForwardIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(openModal());
              dispatch(setDeleteData(data));
            }}
            color="error"
            aria-label="delete ticket"
            component="span"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setIsDialogOpen(true);
              dispatch(setTaskEditable());
              dispatch(setEditData(data));
            }}
            color="primary"
            aria-label="edit ticket"
            component="span"
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </StyledCard>
    </StyledTicketCard>
  );
};
