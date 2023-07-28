import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../redux/appSlice";

export const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector(isLoggedInSelector);
  const { component: Component, ...restProps } = props;
  return isAuthenticated ? <Component /> : <Navigate replace to="/" />;
};
