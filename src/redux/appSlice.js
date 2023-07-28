import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT = "http://localhost:3001/users";

// export const loginAsync = async (dispatch, email, password) => {
//   try {
//     const response = await axios.get(API_ENDPOINT);

//     const users = response.data;
//     const user = users.find(
//       (user) => user.email === email && user.password === password
//     );
//     console.log("@@@@VIRALI Response", user);

//     console.log("@@@@VIRALI-TODS", user.todos);
//     console.log("@@@@@@Dispatch", dispatch);

//     if (response.status === 200) {
//       dispatch(setIsLoggedIn());
//       dispatch(setUserTaskData());
//     } else {
//       console.log("Login failed");
//     }
//   } catch (error) {
//     console.error("API call failed:", error);
//   }
// };

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
