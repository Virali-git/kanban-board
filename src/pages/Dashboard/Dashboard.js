import { Container } from "@mui/material";
import { TaskForm } from "../../components/TaskForm/TaskForm";
import { KanbanBoard } from "../../components/KanbanBoard/KanbanBoard";
import { useState } from "react";

export const Dashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Container maxWidth="xl">
      <TaskForm isDialogOpen= {isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      <KanbanBoard isDialogOpen= {isDialogOpen} setIsDialogOpen={setIsDialogOpen}  />
    </Container>
  );
};
