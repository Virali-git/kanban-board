import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  stagesSelector,
  allTasksSelector,
  deleteTask,
  deleteDataSelector,
  setAllTasks,
} from "../redux/dashboardSlice";
import { closeModal } from "../redux/dialogSlice";
import { Modal } from "./Modal";
import { TicketCard } from "./TicketCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { userTaskDataSelector } from "../redux/appSlice";
import { styled } from "@mui/material/styles";

const KanbanBoardContainer = styled(Box)({
  padding: "20px",
  backgroundColor: "#FFC0CB",
});

const KanbanHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
});

const StageContainer = styled(Grid)({
  backgroundColor: "#997379",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  padding: "16px",
  height: "100%",
});

const KanbanTitle = styled(Typography)({
  fontWeight: "700",
});

const CardContainer = styled(Box)({
  marginBottom: "10px",
});

const ListContainer = styled("ul")({
  listStyleType: "none",
  margin: "10px",
  padding: "0",
});

export const KanbanBoard = () => {
  const dispatch = useDispatch();
  const deleteData = useSelector(deleteDataSelector);
  const allTask = useSelector(allTasksSelector);
  const allStages = useSelector(stagesSelector);
  const [allTaskData, setAllTaskData] = useState([]);

  const userTaskData = useSelector(userTaskDataSelector);

  console.log("@@@", userTaskData);

  useEffect(() => {
    if (allTask?.length) {
      let tempAllData = allStages?.map((_, index) => {
        let stageData = allTask?.filter((task) => task?.stage === index);
        return stageData;
      });
      setAllTaskData(tempAllData);
    }
  }, [allTask]);

  const deleteHandler = () => {
    dispatch(deleteTask(deleteData));
    dispatch(closeModal());
  };

  const dragEndHandler = (result) => {
    console.log("Drag Result: ", result);
    const { source, destination, draggableId } = result;
    let allTaskData = [...allTask];
    allTaskData = allTaskData?.map((task) => {
      if (task?.id === draggableId)
        return { ...task, stage: mapStage(destination?.droppableId) };
      else return task;
    });
    dispatch(setAllTasks(allTaskData));
  };

  const mapStage = (stage) => {
    console.log("Stage: ", stage);
    switch (stage) {
      case "Backlog":
        return 0;
      case "To-Do":
        return 1;
      case "On Going":
        return 2;
      default:
        return 3;
    }
  };

  return (
    <KanbanBoardContainer>
      <KanbanHeader>
        <KanbanTitle>Kanban Board</KanbanTitle>
        <Typography>Created: {allTask?.length}</Typography>
        <Typography>
          Completed:{" "}
          {
            allTask?.filter(
              (task) => task?.stage === allStages?.indexOf("Done")
            ).length
          }
        </Typography>
        <Typography>
          Pending:{" "}
          {
            allTask?.filter(
              (task) => task?.stage !== allStages?.indexOf("Done")
            ).length
          }
        </Typography>
      </KanbanHeader>
      <Grid container spacing={2}>
        <DragDropContext onDragEnd={dragEndHandler}>
          {allTaskData?.map((stage, index) => (
            <Droppable droppableId={allStages[index]} key={allStages[index]}>
              {(provided) => {
                return (
                  <StageContainer
                    key={allStages[index]}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ mx: 2.5, mt: 1, fontWeight: "700" }}>
                        {allStages[index]}
                      </Typography>
                      <ListContainer>
                        {stage?.map((ticket, i) => (
                          <Draggable
                            key={ticket?.id}
                            draggableId={ticket?.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <CardContainer
                                  component={"li"}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TicketCard
                                    ref={provided.innerRef}
                                    data={ticket}
                                    index={i}
                                  />
                                </CardContainer>
                              );
                            }}
                          </Draggable>
                        ))}
                      </ListContainer>
                    </Box>
                    {provided?.placeholder}
                  </StageContainer>
                );
              }}
            </Droppable>
          ))}
        </DragDropContext>
      </Grid>
      <Modal>
        <DialogTitle id="alert-dialog-title">Remove Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={deleteHandler} autoFocus>
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={() => dispatch(closeModal())}
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Modal>
    </KanbanBoardContainer>
  );
};
