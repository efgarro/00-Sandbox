import * as React from "react";

import { useQueryUsers } from "../apiRequests/apiFns";
import MuiPagTable from "./MuiPagTable";

const QueryTable = () => {
  const { isLoading, isError, error, data } = useQueryUsers();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return <MuiPagTable data={data} />;
};

export default QueryTable;
