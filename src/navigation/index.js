import { Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Login } from "../pages/Login/Login";
import { SignUp } from "../pages/SignUp/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";



export const RootNavigation = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Login />} />
      <Route path={'sign-up'} element={<SignUp />} />
      <Route
        path={'dashboard'}
        element={<ProtectedRoute component={Dashboard} />}
      />
    </Routes>
  );
};
