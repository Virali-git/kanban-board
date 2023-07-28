import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { format } from "date-fns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  moveForward,
  stagesSelector,
  moveBackward,
  deleteTask,
  setTaskEditable,
  setEditData,
  setDeleteData,
} from "../redux/dashboardSlice";
import PropTypes from "prop-types";
import { openModal } from "../redux/dialogSlice";

export const TicketCard = (props) => {
  const { data, index } = props;
  const dispatch = useDispatch();
  const allStages = useSelector(stagesSelector);
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
    <Box>
      <Card>
        <CardContent>
          <Typography>{data?.taskName}</Typography>
          <Typography
            sx={{
              color: priorityStyle(data?.priority),
              fontWeight: "bold",
            }}
          >
            {data?.priority}
          </Typography>
          <Typography>
            {format(new Date(data?.deadline), "dd/MM/yyyy")}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            disabled={data?.stage === allStages?.indexOf("Backlog")}
            onClick={() => {
              dispatch(moveBackward(data));
            }}
            color="primary"
            aria-label="change tciket to previous state"
            component="span"
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            disabled={data?.stage === allStages?.indexOf("Done")}
            onClick={() => {
              dispatch(moveForward(data));
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
              // dispatch(deleteTask(data));
            }}
            color="error"
            aria-label="delete ticket"
            component="span"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
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
      </Card>
    </Box>
  );
};

TicketCard.propTypes = {
  data: PropTypes.object.isRequired,
};
