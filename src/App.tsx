import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Dashboard, Expense, Home, Income } from "./pages";
import { useEffect, useState } from "react";
import dummy from "./constants/data";

const App = () => {

  // set the theme that stored in local storage if there is no theme put brower theme
const [mode, setMode] = useState<"dark" | "light">(
  (localStorage.getItem("mode") as "dark" | "light") ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
);
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);
  // ============= this is a dummy data added to local storage for testing and demo purpose , 
  //you can remove easily it's just for tsting and better ui ux for demo ========================
  // ============= to be sure that data will not overwrite in local storage for each render i'll use a flag in local storage to
  // check if data exist or not and to make the changes you did in local storage ======================================

    if (!JSON.parse(localStorage.getItem("dataExist") || "false")) {
      localStorage.setItem("dataExist", "true");
      localStorage.setItem("PBT", JSON.stringify(dummy));
    }
  const router = createHashRouter([
    {
      path: "/",
      element: <Home mode={mode} setMode={setMode} />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/income",
          element: <Income />,
        },
        {
          path: "/expense",
          element: <Expense />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
