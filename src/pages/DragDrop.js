import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const itemsFromBackend = [
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: "To Do",
    items: itemsFromBackend,
  },
};

export const DragDrop = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <Box>
      <DragDropContext onDragEnd={(result) => console.log("Result: ", result)}>
        {Object.entries(columns).map(([id, column]) => {
          console.log("DragDrop > Columns : ", id, column);
          return (
            <Droppable droppableId={id} key={id.toString()}>
              {(provided, snapshot) => {
                return (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      height: "80vh",
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "lightgrey",
                      p: 4,
                      width: "250px",
                      minheight: "500px",
                    }}
                  >
                    {column?.items?.map((item, index) => {
                      return (
                        <Draggable
                          key={item?.id}
                          draggableId={item?.id}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <Card
                                sx={{ mb: 2 }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CardContent>
                                  <Typography>{item?.content}</Typography>
                                </CardContent>
                              </Card>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided?.placeholder}
                  </Box>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    </Box>
  );
};
