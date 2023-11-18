import {
  getLatestCategories,
} from "../../api/statistics";
import { Box, Grid, Paper, Stack, Typography, Chip } from "@mui/material";
import { amountFormat } from "../../utils/amountFormat";


type Props ={
  selectedProp:string,
  title:string
}
const LatestCategories = ({selectedProp,title}: Props) => {
  const latestCategories = getLatestCategories(selectedProp);

  return (
    <Grid item lg={3} sm={6} xs={12}>
      <Box sx={{ p: 2 }}>
        <Paper
          sx={{ minHeight: 195, py: 3, px: 4, transition: " all .4s ease " }}
        >
          <Typography variant="body1" fontWeight={600}>
            Latest {title}
          </Typography>
          {latestCategories.length > 0 ? (
            latestCategories.map((category: RecordType, index: number) => {
              return (
                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  mt={1}
                  key={index + selectedProp + "latest"}
                >
                  <Chip
                    variant="filled"
                    sx={{ color: "white", backgroundColor: category.color }}
                    label={category.category}
                  />
                  <Typography key={index} variant="subtitle1" fontWeight={600}>
                    {amountFormat(category.amount)}
                  </Typography>
                </Stack>
              );
            })
          ) : (
            <Typography
              variant="subtitle1"
              color="grey"
              mt={3}
              textAlign="center"
            >
              Add Your {title} Details to get a wonderful
              Statistics
            </Typography>
          )}
        </Paper>
      </Box>
    </Grid>
  );
};

export default LatestCategories;
