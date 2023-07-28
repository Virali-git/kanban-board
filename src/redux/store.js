import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import dialogReducer from "./dialogSlice";
import dashboardReducer from "./dashboardSlice";
import thunk from "redux-thunk";

export default configureStore({
  reducer: {
    app: appReducer,
    dashboard: dashboardReducer,
    dialog: dialogReducer,
  },
  middleware: [thunk],
});
