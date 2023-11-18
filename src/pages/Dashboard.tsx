import { Grid } from "@mui/material";
import income from "../assets/income.png";
import expense from "../assets/expense.png";
import { Hero, LatestCategories, TopCategories, Total } from "../components";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (

    <>
    <Helmet>
    <title>
      Dashboard
    </title>
    </Helmet>
      <Grid container mt={5}>
        <Hero />
        <Total title="Income" img={income} selectedProp="income" />
        <Total title="Expense" img={expense} selectedProp="expense" />
        <TopCategories title="Income" selectedProp="income" />
        <LatestCategories title="Income" selectedProp="income" />
        <TopCategories title="Expense" selectedProp="expense" />
        <LatestCategories title="Expense" selectedProp="expense" />
      </Grid>
    </>
  );
};

export default Dashboard;
