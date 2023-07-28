import { Container } from "@mui/material";
import { TaskForm } from "../../components/TaskForm/TaskForm";
import { KanbanBoard } from "../../components/KanbanBoard/KanbanBoard";

export const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <TaskForm />
      <KanbanBoard />
    </Container>
  );
};
