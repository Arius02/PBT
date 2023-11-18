import { Box, Grid, Paper, Typography } from "@mui/material";
import { amountFormat } from "../../utils/amountFormat";
import { getTopCategories } from "../../api/statistics";

type Props = {
  title: string;
  selectedProp: string;
};

const TopCategories = ({ title, selectedProp }: Props) => {
  const topCategories = getTopCategories(selectedProp);

  return (
    <Grid item lg={3} sm={6} xs={12}>
      <Box sx={{ p: 2 }}>
        <Paper
          sx={{ minHeight: 195, py: 3, px: 4, transition: " all .4s ease " }}
        >
          <Typography variant="body1" fontWeight={600} mb={2}>
            Top {title} Categories
          </Typography>
          {topCategories.length > 0 ? (
            topCategories.map((category: RecordType, index: number) => (
              <Typography
                variant="body1"
                fontWeight="bold"
                key={index + selectedProp + "Top"}
                mb={1}
              >
                {1 + index} - {category.name}: {amountFormat(category.amount)}
              </Typography>
            ))
          ) : (
            <Typography
              variant="subtitle1"
              color="grey"
              mt={3}
              textAlign="center"
            >
              Add Your {title} Details to get a wonderful Statistics
            </Typography>
          )}
        </Paper>
      </Box>
    </Grid>
  );
};

export default TopCategories;
