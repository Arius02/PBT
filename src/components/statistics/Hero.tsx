import {
  getBalence,
} from "../../api/statistics";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { blue,red} from "@mui/material/colors";
import { amountFormat } from "../../utils/amountFormat";
import welcoming from "../../assets/welcome.svg";

const Hero = () => {
  const totalBalence = getBalence();

  return (
    <Grid item xs={12} lg={6}>
      <Box sx={{ p: 2 }}>
        <Paper
          sx={{ minHeight: 190, py: 3, px: 4, transition: " all .4s ease " }}
        >
          <Stack
            flexDirection={{ md: "row", xs: "column-reverse" }}
            justifyContent={"space-between"}
          >
            <Box>
              <Typography variant="h6" fontWeight={600} color={blue[500]}>
                Good Morning Mohamed!
              </Typography>
              <Typography variant="body2" color="grey">
                This is Your Balence
              </Typography>
              <Typography
                variant="h4"
                fontWeight={600}
                mt={3}
                color={totalBalence < 1 ? red[500] : ""}
              >
                {amountFormat(totalBalence)}
              </Typography>
            </Box>
            <Box maxWidth={{ md: "150px", xs: "100%" }}>
              <img src={welcoming} alt="welcome" style={{ width: "100%" }} />
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Grid>
  );
};

export default Hero;
