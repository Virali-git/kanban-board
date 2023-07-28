import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    isDialogOpen: false,
  },
  reducers: {
    handleDialogOpen: (state) => {
      console.log("Dialog open called:");
      state.isDialogOpen = true;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
    },
  },
});

export const { handleDialogOpen, closeDialog } = dialogSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const isDialogOpenSelector = (state) => state.dialog.isDialogOpen;

export default dialogSlice.reducer;
