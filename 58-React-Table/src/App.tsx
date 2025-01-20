import * as React from "react";
import "./css/styles.css";
import styles from "./css/styles.module.css";
import SimpleTable from "./components/SimpleTable";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";

import MuiPagTable from "./components/MuiPagTable";
import QueryTable from "./components/QueryTable";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <h1 className={styles.h1class}>Hello Bella</h1> */}
        {/* <SimpleTable /> */}
        {/* <MuiPagTable /> */}
        <QueryTable />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default App;
