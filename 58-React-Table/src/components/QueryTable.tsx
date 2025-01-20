import * as React from "react";

import { useQueryUsers, useDeleteUser } from "../apiRequests/apiFns";
import MuiPagTable from "./MuiPagTable";

const QueryTable = () => {
  const { isLoading, isError, error, data } = useQueryUsers();
  //   const deleteUser = useDeleteUser();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return <MuiPagTable data={data} />;
};

export default QueryTable;
