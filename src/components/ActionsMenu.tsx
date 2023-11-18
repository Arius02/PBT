import React from "react";
import { IconButton, ListItemIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import getRecords from "../api/getRecords";
type Props = {
  id: number;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setData: React.Dispatch<React.SetStateAction<{} | RecordType>>;
  selectedProp: string;
};

const ActionsMenu = ({
  id,
  setEditDialogOpen,
  setData,
  setId,
  setDeleteDialogOpen,
  selectedProp
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    setData(getRecords(selectedProp).find((item: any) => item.id == id));
    setEditDialogOpen(true);
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setId(id);
    setDeleteDialogOpen(true);
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="more"
        id="actions-button"
        aria-controls={open ? "actions-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions-menu"
        MenuListProps={{
          "aria-labelledby": "actions-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        sx={{ boxShadow: "0px 0xp 10px rgba(0,0,0,0.1)" }}
        disableScrollLock={true}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon color="info" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionsMenu;
