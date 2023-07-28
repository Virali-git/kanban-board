import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    isDialogOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isDialogOpen = true;
    },
    closeModal: (state) => {
      state.isDialogOpen = false;
    },
  },
});

export const { openModal, closeModal } = dialogSlice.actions;
export const isModalOpenSelector = (state) => state.dialog.isDialogOpen;

export default dialogSlice.reducer;
