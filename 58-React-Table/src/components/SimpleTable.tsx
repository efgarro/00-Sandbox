import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import * as jsonData from "/00-CodeShop/00-Sandbox/58-React-Table/data/MOCK_DATA2.json";

import DebouncedInput from "./DebouncedInput";

import { fuzzyFilter } from "./actionFns/actionFns"
// {
//   "id": 1,
//   "first_name": "Brier",
//   "last_name": "Huckerby",
//   "email": "bhuckerby0@miibeian.gov.cn",
//   "country": "Japan",
//   "dob": "7/29/2024"
// }

// import User from "../types/rtTypes"





const SimpleTable = () => {
  console.log(jsonData);

  const [globalFilter, setGlobalFilter] = React.useState("");

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
      cell: () => <button onClick={() => console.log("Del")}>Del</button>,
    },
  ];

  const table = useReactTable({
    data: jsonData,
    columns: columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy", //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <div>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => table.setPageIndex(0)}>First Page</button>
      <button onClick={() => table.previousPage()}>Previous Page</button>
      <button onClick={() => table.nextPage()}>Next Page</button>
      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
        Last Page
      </button>
    </div>
  );
};

export default SimpleTable;
