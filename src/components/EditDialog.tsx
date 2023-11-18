import * as React from "react";
import { Dialog, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recordSchema } from "../validation/Record.validator";
import getRecords from "../api/getRecords";
import editRecord from "../api/editRecord";
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
  title: string;
  data: RecordType | any;
};
const EditDialog = ({ open, setOpen, title, setRecords, data }: Props) => {
    console.log(data);

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
  const onSubmit = (formData: RecordType) => {
    // check if there are any changes in data or not
    const updatedData: any = {};
    console.log(data.id)
    updatedData.id = data.id;
    const keys = ["amount", "category", "description", "color"];
    for (const key of keys) {
      if (formData[key] !== data[key]) {
        updatedData[key] = formData[key];
      }
    }
    console.log(updatedData, data, formData);
    // date is special case
    if (dayjs(formData.date).format("DD/MM/YYYY") != data.date) {
      updatedData.date = dayjs(formData.date).format("DD/MM/YYYY");
    }
    //if there are no data just close the dialog without update
    if (Object.keys(updatedData).length === 1 && updatedData.id === data.id) {
      handleClose();
      return;
    }
    try {
      editRecord(title == "Edit Expense" ? "expense" : "income", updatedData);
      setOpen(false);
      setRecords(
        getRecords(title == "Edit Expense" ? "expense" : "income") || []
      );
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    reset({ ...data, date: dayjs(data?.date, "DD/MM/YYYY") });
  }, [data]);
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
          action="Edit"
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </Dialog>
    </React.Fragment>
  );
};

export default EditDialog;
