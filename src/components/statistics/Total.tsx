import { Box, Grid, Paper, Stack, Typography,Link } from "@mui/material";
import { amountFormat } from "../../utils/amountFormat";
import { getTotal } from "../../api/statistics";
import { green, red } from "@mui/material/colors";
import {Link as LinkRouter} from "react-router-dom"
type Props = {
    title: string;
    selectedProp: string;
    img:string;
}

const Total = ({title,selectedProp,img}: Props) => {
const total = getTotal(selectedProp);

  return (
    <Grid item lg={3} sm={6} xs={12}>
              <Link component={LinkRouter} to={`/${selectedProp}`} underline="none">
      <Box sx={{ p: 2 }}>
        <Paper
          sx={{ minHeight: 190, py: 3, px: 4, transition: " all .4s ease " }}
        >
          <Stack flexDirection="row" justifyContent={"space-between"}>
            <Box>
                <Typography
                  variant="body1"
                  color={title === "Income" ? green[500] : red[300]}
                >
                  {title}
                </Typography>
              <Typography variant="h5" fontWeight={600} mt={3}>
                {amountFormat(total)}
              </Typography>
            </Box>
            <Box maxWidth="100px">
              <img src={img} alt="income" style={{ width: "100%" }} />
            </Box>
          </Stack>
        </Paper>
      </Box>
              </Link>
    </Grid>
  );
}

export default Total