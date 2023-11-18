import React from "react";
import { Box } from "@mui/material";
import { addIncomeRecord } from "../api/addRecord";
import { SectionHeader, AddDialog, DeleteDialog } from "../components";
import EditDialog from "../components/EditDialog";
import RecordsTable from "../components/RecordsTable";
import { Helmet } from "react-helmet";
const Income = () => {
  const [open, setOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [data, setData] = React.useState({});

  const [records, setRecords] = React.useState<RecordType[]>(
    JSON.parse(localStorage.getItem("PBT") || "{}")?.income || []
  );

  return (
    <>
      <Helmet>
        <title>Income</title>
      </Helmet>
      <Box mt={5}>
        <SectionHeader
          setOpen={setOpen}
          title="Income Details"
          ButtonText="Add Income"
        />
        <AddDialog
          open={open}
          setOpen={setOpen}
          addRecord={addIncomeRecord}
          title="Add Income"
          setRecords={setRecords}
          key={387}
        />

        <RecordsTable
          records={records}
          setData={setData}
          setDeleteDialogOpen={setDeleteDialogOpen}
          setEditDialogOpen={setEditDialogOpen}
          setId={setId}
          selectedProp={"income"}
        />
        <EditDialog
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
          title="Edit Income"
          setRecords={setRecords}
          data={data}
        />
        <DeleteDialog
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          title="Income"
          setRecords={setRecords}
          id={id}
        />
      </Box>
    </>
  );
};

export default Income;
