import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide
} from "@mui/material";
import getRecords from "../api/getRecords";
import deleteRecord from "../api/deleteRecord";
import { TransitionProps } from "@mui/material/transitions";

type Props = {
  title: string;
  id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRecords: React.Dispatch<React.SetStateAction<RecordType[]>>;
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteDialog = ({title, id, open, setOpen, setRecords}: Props) => {
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    if (deleteRecord(title == "Expense" ? "expense" : "income", id)) {
      setRecords(
        getRecords(title == "Expense" ? "expense" : "income") || []
      );
      setOpen(false);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="add-record"
        disableScrollLock={true}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Delete This {title} Record?
        </DialogTitle>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialog;
