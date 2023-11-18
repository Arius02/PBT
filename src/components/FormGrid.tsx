import * as React from "react";
import {
  Button,
  DialogActions,
  Box,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MuiColorInput } from "mui-color-input";
import { UseFormRegister, Control, UseFormHandleSubmit } from "react-hook-form";
type Props = {
  register: UseFormRegister<RecordType>;
  handleSubmit: UseFormHandleSubmit<RecordType, undefined>;
  control: Control<RecordType, any>;
  errors: any;
  onSubmit: (data: RecordType) => void;
  handleClose: () => void;
  action: string;
};

const FormGrid = ({
  register,
  handleSubmit,
  control,
  errors,
  onSubmit,
  handleClose,
  action,
}: Props) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowGap={2} px={2.5}>
        <Grid item lg={6} xs={12}>
          <Box px={1}>
            <TextField
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              label="Amount"
              {...register("amount")}
              sx={{ width: "100%" }}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          </Box>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Box px={1}>
            <TextField
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              label="Category"
              {...register("category")}
              sx={{ width: "100%" }}
              error={!!errors.category}
              helperText={errors.category?.message}
            />
          </Box>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="date"
            control={control}
            defaultValue={action==="Add"&& null}
            render={({ field }) => {
              return (
                <FormControl
                  error={!!errors.date}
                  sx={{ width: "100%", px: 1 }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        value={field.value}
                        onChange={(date) => {
                          field.onChange(date);
                        }}
                        label="Date"
                        sx={{ width: "100%" }}
                        format="DD/MM/YYYY"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {errors.date && (
                    <FormHelperText>
                      {errors.date.message as React.ReactNode}
                    </FormHelperText>
                  )}
                </FormControl>
              );
            }}
          />
        </Grid>{" "}
        <Grid item lg={6} mt={1} xs={12}>
          <Box px={1}>
            <Controller
              name="color"
              control={control}
              render={({ field }) => {
                return (
                  <FormControl
                    error={!!errors.color}
                    sx={{ width: "100%" }}
                  >
                    <MuiColorInput
                      sx={{ width: "100%" }}
                      label="Color"
                      value={field.value}
                      onChange={(color) => {
                        field.onChange(color);
                      }}
                    />
                    {errors.color && (
                      <FormHelperText>
                        {errors.color.message as React.ReactNode}
                      </FormHelperText>
                    )}
                  </FormControl>
                );
              }}
              
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box px={1}>
            <TextField
              variant="outlined"
              multiline
              rows={4}
              InputLabelProps={{
                shrink: true,
              }}
              label="Description"
              {...register("description")}
              sx={{ width: "100%" }}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Box>
        </Grid>
      </Grid>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          {action}
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormGrid;
