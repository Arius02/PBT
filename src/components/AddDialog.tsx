import * as React from "react";
import { Dialog, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recordSchema } from "../validation/Record.validator";
import getRecords from "../api/getRecords";
import dayjs from "dayjs";
import FormGrid from "./FormGrid";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRecords: React.Dispatch<React.SetStateAction<RecordType[]>>;
  addRecord: (payload: RecordType) => void;
  title: string;
};
const AddDialog = ({ open, setOpen, addRecord, title, setRecords }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<RecordType>({
    resolver: yupResolver(recordSchema) as any,
  });
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data: RecordType) => {
    try {
      addRecord({ ...data, date: dayjs(data.date).format("DD/MM/YYYY") });
      reset();
      setOpen(false);
      setRecords(
        getRecords(title == "Add Expense" ? "expense" : "income") || []
      );
    } catch (error) {
      console.error(error);
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
        <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
        <FormGrid
          onSubmit={onSubmit}
          errors={errors}
          control={control}
          register={register}
          action="Add"
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </Dialog>
    </React.Fragment>
  );
};

export default AddDialog;
