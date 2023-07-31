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
  setTaskData,
  setDeleteData,
  fetchDataFromServer,
} from "../../redux/dashboardSlice";
import { closeModal, openModal } from "../../redux/dialogSlice";
import { Modal } from "../Modal/Modal";
import { TicketCard } from "../TicketCard/TicketCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  KanbanBoardContainer,
  ListContainer,
  CardContainer,
  KanbanHeader,
  KanbanTitle,
  StageContainer,
} from "./KanbanBoard.styles";
import DeleteIcon from "@mui/icons-material/Delete";

export const KanbanBoard = ({ isDialogOpen, setIsDialogOpen }) => {
  const dispatch = useDispatch();
  const deleteData = useSelector(deleteDataSelector);
  const allTask = useSelector(allTasksSelector);
  const allStages = useSelector(stagesSelector);
  const [allTaskData, setAllTaskData] = useState([]);
  const [deletedTickets, setDeletedTickets] = useState([]);

  useEffect(() => {
    if (allTask?.length) {
      let tempAllData = allStages?.map((_, index) => {
        let stageData = allTask?.filter((task) => task?.stage === index);
        return stageData;
      });
      setAllTaskData(tempAllData);
    }
  }, [allTask]);

  useEffect(() => {
    // Dispatch the async thunk to fetch data from the server
    dispatch(fetchDataFromServer());
  }, [dispatch]);

  {
    console.log("@@@@VIROAI", allTask);
  }
  /**
   * Deletes a task and closes the modal.
   * @function deleteHandler
   */
  const deleteHandler = () => {
    console.log("@@@@@@DELTETE", deleteData);

    dispatch(deleteTask(deleteData)); // Dispatches the action to delete the task using the provided `deleteData`.
    dispatch(closeModal()); // Dispatches the action to close the modal.
  };

  /**
   * Handles the end of a task drag and drop operation.
   * @function dragEndHandler
   * @param {Object} result - The result object containing information about the drag and drop operation.
   */
  const dragEndHandler = (result) => {
    const { source, destination, draggableId } = result;
    const ticketToDelete = allTask.find((task) => task.id === draggableId);

    // If dropped outside of a droppable area, do nothing
    if (!destination) {
      return;
    }

    // If dropped into the "Delete" area
    if (destination.droppableId === "deleteArea") {
      console.log("@@@inside delete area", ticketToDelete);
      //dispatch(openModal());
      dispatch(deleteTask(ticketToDelete));
      //   dispatch(setDeleteData(ticketToDelete));

      console.log("@@@DATA", allTask);
      // setDeletedTickets((prevDeletedTickets) => [
      //   ...prevDeletedTickets,
      //   ticketToDelete,
      // ]);
    } else {
      // If dropped into a stage, update the task's stage
      const updatedTasks = allTask.map((task) =>
        task.id === draggableId
          ? { ...task, stage: mapStage(destination.droppableId) }
          : task
      );
      dispatch(setTaskData(updatedTasks));
    }
  };

  /**
   * Maps stage names to their corresponding indexes.
   * @function mapStage
   * @param {string} stage - The name of the stage.
   * @returns {number} The corresponding index of the stage.
   */
  const mapStage = (stage) => {
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
                                    isDialogOpen={isDialogOpen}
                                    setIsDialogOpen={setIsDialogOpen}
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

          {/* Add the new "Delete" area */}
          <Droppable droppableId="deleteArea" key="deleteArea">
            {(provided) => (
              <StageContainer
                item
                xs={12}
                sm={6}
                md={3}
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                 // margin: "90px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100px",
                  width: "100px",
                  "&:hover": {
                    cursor: "pointer",
                    background: "#f0f0f0",
                  },
                }}
              >
                <Box
                  sx={{
                    height: "30px",
                    width: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #000", // Add a border for visual reference
                  }}
                >
                  <DeleteIcon />
                </Box>

                {provided?.placeholder}
              </StageContainer>
            )}
          </Droppable>
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
