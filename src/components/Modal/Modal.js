import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, isModalOpenSelector } from "../../redux/dialogSlice";

export const Modal = (props) => {
  const openDialog = useSelector(isModalOpenSelector);
  const dispatch = useDispatch();
  const { children } = props;
  return (
    <Dialog
      open={openDialog}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
};
