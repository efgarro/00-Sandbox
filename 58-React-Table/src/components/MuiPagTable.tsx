import * as React from "react";

import { useDeleteUser } from "../apiRequests/apiFns";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import TablePaginationActions from "./TablePaginationActions";
import DebouncedInput from "./DebouncedInput";
import { fuzzyFilter } from "./actionFns/actionFns";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { IUser } from "../types/rtTypes";

let renderCount = 0;

const MuiPagTable = ({ data }: { data: any }) => {
  const deleteUser = useDeleteUser();

  renderCount++;

  const [globalSearchTerm, setGlobalSearchTerm] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "First Name",
      accessorKey: "first_name",
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Country",
      accessorKey: "country",
    },
    {
      header: "Date of Birth",
      accessorKey: "dob",
    },
    {
      header: "Delete",
      cell: ({ row }: { row: any }) => {
        return (
          <button onClick={() => deleteUser.mutate({ id: row.original.id })}>
            Del
          </button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data,
    columns: columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      globalFilter: globalSearchTerm,
      pagination: pagination,
    },
    onGlobalFilterChange: setGlobalSearchTerm,
    globalFilterFn: "fuzzy", //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <span>{renderCount}</span>
      <div>
        <DebouncedInput
          value={globalSearchTerm ?? ""}
          onChange={(value) => setGlobalSearchTerm(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
        <Box sx={{ width: "100%" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableCell key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              { label: "All", value: data.length },
            ]}
            component="div"
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={pagination.pageSize}
            page={pagination.pageIndex}
            slotProps={{
              select: {
                inputProps: { "aria-label": "rows per page" },
                native: true,
              },
            }}
            onPageChange={(_, page) => {
              setPagination({ ...pagination, pageIndex: page });
              table.setPageIndex(page);
            }}
            onRowsPerPageChange={(e) => {
              const size = e.target.value ? Number(e.target.value) : 10;
              setPagination({ ...pagination, pageSize: size });
              table.setPageSize(size);
            }}
            ActionsComponent={TablePaginationActions}
          />
          <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
        </Box>
      </div>
    </>
  );
};

export default MuiPagTable;
