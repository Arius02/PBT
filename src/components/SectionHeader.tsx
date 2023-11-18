import React from 'react'
import {  Stack,  Typography, Button } from "@mui/material";

type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title:string;
    ButtonText:string
}

const SectionHeader = ({setOpen,title,ButtonText}: Props) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h5" component="h2" fontWeight="bold">
        {title}
      </Typography>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        {ButtonText}
      </Button>
    </Stack>
  );
}

export default SectionHeader