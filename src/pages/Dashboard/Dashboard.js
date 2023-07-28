import { Container } from "@mui/material";
import { AddTask } from "../../components/AddTask";
import { KanbanBoard } from "../../components/KanbanBoard";

export const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <AddTask />
      <KanbanBoard />
    </Container>
  );
};
