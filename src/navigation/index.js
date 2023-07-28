import { Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";
//import { DASHBOARD, SIGNUP, LOGIN } from "./ROUTES";



// export const LOGIN = "/";
// export const SIGNUP = "sign-up";
// export const DASHBOARD = "dashboard";


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
