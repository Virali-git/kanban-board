import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = "http://localhost:5000/users"; // URL of the mock API
// Create an async thunk to fetch data from the API
export const fetchDataFromServer = createAsyncThunk(
  "dashboard/fetchData",
  async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    allTasks: [
      {
        taskName: "buy milk",
        priority: "high",
        deadline: "2022-06-11T04:19:03.808Z",
        stage: 0,
        id: "1",
      },
      {
        taskName: "buy coffee",
        priority: "low",
        deadline: "2022-06-11T04:19:03.808Z",
        stage: 1,
        id: "2",
      },
      {
        taskName: "buy sugar",
        priority: "medium",
        deadline: "2022-06-11T04:19:03.808Z",
        stage: 2,
        id: "3",
      },
      {
        taskName: "bug wate bottle",
        priority: "high",
        deadline: "2022-06-11T04:19:03.808Z",
        stage: 2,
        id: "4",
      },
    ],
    isTaskEditable: false,
    editData: {},
    deleteData: {},
    stages: ["Backlog", "To-Do", "On Going", "Done"],
  },
  reducers: {
    setTaskData: (state, action) => {
      state.allTasks = action?.payload;
    },
    moveTaskForward: (state, action) => {
      state.allTasks = state?.allTasks?.map((task) => {
        if (task?.id === action?.payload?.id)
          return { ...task, stage: action?.payload?.stage + 1 };
        else return task;
      });
    },
    moveTaskBackward: (state, action) => {
      state.allTasks = state?.allTasks?.map((task) => {
        if (task?.id === action?.payload?.id)
          return { ...task, stage: action?.payload?.stage - 1 };
        else return task;
      });
    },
    deleteTask: (state, action) => {
      state.allTasks = state?.allTasks?.filter(
        (task) => task?.id !== action?.payload?.id
      );
      state.deleteData = {};
    },
    setTaskEditable: (state) => {
      state.isTaskEditable = true;
    },
    setTaskUnEditable: (state) => {
      state.isTaskEditable = false;
    },
    setEditData: (state, action) => {
      state.editData = action?.payload;
    },

    setUpdateData: (state, action) => {
      state.allTasks = state?.allTasks.map((task) => {
        if (action?.payload?.id === task?.id) return action?.payload;
        else return task;
      });
      state.editData = {};
    },
    setDeleteData: (state, action) => {
      state.deleteData = action?.payload;
    },
    clearDeleteData: (state, action) => {
      state.deleteData = {};
    },

    getDataFromServer:(state, action) => {
      console.log("@@@Payload", action?.payload);

      state.allTasks = action?.payload.allTasks;
    }
  },
  extraReducers: (builder) => {
    // When fetchDataFromServer is fulfilled, update the allTasks state with the fetched data
    builder.addCase(fetchDataFromServer.fulfilled, (state, action) => {
      console.log("@@@Payload", action?.payload.allTasks);
      state.allTasks = action?.payload.allTasks
    });}
});

export const {
  setTaskData,
  moveTaskForward,
  moveTaskBackward,
  deleteTask,
  setTaskEditable,
  setTaskUnEditable,
  setEditData,
  setUpdateData,
  setDeleteData,
  clearDeleteData,
} = dashboardSlice.actions;



export const allTasksSelector = (state) => state.dashboard.allTasks;
export const stagesSelector = (state) => state.dashboard.stages;
export const isTaskEditableSelector = (state) => state.dashboard.isTaskEditable;
export const editDataSelector = (state) => state.dashboard.editData;
export const deleteDataSelector = (state) => state.dashboard.deleteData;

export default dashboardSlice.reducer;
