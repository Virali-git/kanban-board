import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog, isDialogOpenSelector } from "../redux/dialogSlice";

export const CustomDialog = (props) => {
  const openDialog = useSelector(isDialogOpenSelector);
  const dispatch = useDispatch();
  const { children } = props;
  return (
    <Dialog
      open={openDialog}
      onClose={() => dispatch(closeDialog())}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
};
