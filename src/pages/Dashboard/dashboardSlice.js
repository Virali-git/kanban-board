import { createSlice } from "@reduxjs/toolkit";

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
    stages: ["Backlog", "To-Do", "On Going", "Done"],
    isTaskEditable: false,
    editData: {},
    deleteData: {},
  },
  reducers: {
    setAllTasks: (state, action) => {
      // console.log("Set task Action Called: ----------->", action.payload);
      state.allTasks = action?.payload;
    },
    moveForward: (state, action) => {
      state.allTasks = state?.allTasks?.map((task) => {
        if (task?.id === action?.payload?.id)
          return { ...task, stage: action?.payload?.stage + 1 };
        else return task;
      });
    },
    moveBackward: (state, action) => {
      state.allTasks = state?.allTasks?.map((task) => {
        if (task?.id === action?.payload?.id)
          return { ...task, stage: action?.payload?.stage - 1 };
        else return task;
      });
    },
    deleteTask: (state, action) => {
      console.log("Delete Task Called: ", action?.payload);
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
    // clearEditData: (state, action) => {
    //   state.editData = {};
    // },
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
  },
});

export const {
  setAllTasks,
  moveForward,
  moveBackward,
  deleteTask,
  setTaskEditable,
  setTaskUnEditable,
  setEditData,
  setUpdateData,
  // clearEditData,
  setDeleteData,
  clearDeleteData,
} = dashboardSlice.actions;

export const allTasksSelector = (state) => state.dashboard.allTasks;
export const stagesSelector = (state) => state.dashboard.stages;
export const isTaskEditableSelector = (state) => state.dashboard.isTaskEditable;
export const editDataSelector = (state) => state.dashboard.editData;
export const deleteDataSelector = (state) => state.dashboard.deleteData;

export default dashboardSlice.reducer;
