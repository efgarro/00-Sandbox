import * as React from "react";
import "./css/styles.css";
import styles from "./css/styles.module.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TodoList from "./components/TodoList";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <h1 className={styles.h1class}>Hello Bella</h1>
      <QueryClientProvider client={queryClient}>
        <TodoList />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default App;
