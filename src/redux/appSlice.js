import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT = "http://localhost:3001/users";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isLoggedIn: false,
    userTaskData: null,
  },
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    onLogout: (state) => {
      state.isLoggedIn = false;
    },
    setUserTaskData: (state) => {
      state.userTaskData = "2323";
    },
  },
});

export const { setIsLoggedIn, onLogout, setUserTaskData} = appSlice.actions;

export const isLoggedInSelector = (state) => state.app.isLoggedIn;
export const userTaskDataSelector = (state) => state.app.userTaskData;

export default appSlice.reducer;
