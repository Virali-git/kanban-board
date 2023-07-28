import { Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { DragDrop } from "../pages/DragDrop";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";
import { DASHBOARD, SIGNUP, LOGIN } from "./ROUTES";

export const RootNavigation = () => {
  return (
    <Routes>
      <Route path={LOGIN} element={<Login />} />
      <Route path={SIGNUP} element={<SignUp />} />
      <Route path={"drag-drop"} element={<DragDrop />} />
      <Route
        path={DASHBOARD}
        element={<ProtectedRoute component={Dashboard} />}
      />
    </Routes>
  );
};
