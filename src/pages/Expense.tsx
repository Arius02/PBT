import React from "react";
import { Box } from "@mui/material";
import { addExpenseRecord } from "../api/addRecord";
import { SectionHeader, AddDialog, DeleteDialog } from "../components";
import EditDialog from "../components/EditDialog";
import RecordsTable from "../components/RecordsTable";
import { Helmet } from "react-helmet";

const Expense = () => {
  const [open, setOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [data, setData] = React.useState({});

  const [records, setRecords] = React.useState<RecordType[]>(
    JSON.parse(localStorage.getItem("PBT") || "{}")?.expense || []
  );

  return (
    <>
      <Helmet>
        <title>Expense</title>
      </Helmet>
      <Box mt={5}>
        <SectionHeader
          setOpen={setOpen}
          title="Expense Details"
          ButtonText="Add Expense"
        />
        <AddDialog
          open={open}
          setOpen={setOpen}
          addRecord={addExpenseRecord}
          title="Add Expense"
          setRecords={setRecords}
        />

        <RecordsTable
          records={records}
          setData={setData}
          setDeleteDialogOpen={setDeleteDialogOpen}
          setEditDialogOpen={setEditDialogOpen}
          setId={setId}
          selectedProp={"expense"}
        />
        <EditDialog
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
          title="Edit Expense"
          setRecords={setRecords}
          data={data}
        />
        <DeleteDialog
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          title="Expense"
          setRecords={setRecords}
          id={id}
        />
      </Box>
    </>
  );
};

export default Expense;
