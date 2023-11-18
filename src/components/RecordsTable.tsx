import React from "react";
import { Typography, Tooltip, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { amountFormat } from "../utils/amountFormat";
import ActionsMenu from "./ActionsMenu";

type Props = {
  records: RecordType[];
  setId: React.Dispatch<React.SetStateAction<number>>;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<any>>;
  selectedProp:string
};

const RecordsTable = ({
  records,
  setEditDialogOpen,
  setId,
  setData,
  setDeleteDialogOpen,
  selectedProp,
}: Props) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <ActionsMenu
          setId={setId}
          setData={setData}
          setEditDialogOpen={setEditDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          id={params.id as number}
          selectedProp={selectedProp}
        />
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 250,
      renderCell: (params) => (
        <Typography fontWeight="bold">
          {amountFormat(params.value as number)}
        </Typography>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 250,
      renderCell: (params) => (
        <Chip
          variant="filled"
          label={params.value}
          sx={{
            backgroundColor: params.row.color,
            px: 1,
            py: 0.5,
            color: "white",
          }}
        />
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 195,
    },
    {
      field: "description",
      headerName: "description",
      width: 395,
      renderCell: (params) =>
        params.value.length > 50 ? (
          <Tooltip title={params.value}>
            <Typography color="grey">{params.value.slice(0, 45)}...</Typography>
          </Tooltip>
        ) : (
          <Typography color="grey">{params.value}</Typography>
        ),
    },
  ];
  return (
   records.length? <DataGrid
      rows={records}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
      sx={{ maxWidth: "lg", mx: "auto", mt: 5 }}
    />:<Typography color="grey" textAlign="center" mt={10}>
      No Data To Display
    </Typography>
  );
};

export default RecordsTable;
