import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaUser } from "react-icons/fa";
import Loader from "../../Components/shared/Loader";

function WorkProgress() {
  let axiosSecure = useAxiosSecure();
  const [columnFilters, setColumnFilters] = useState([]);
  const [dateQuery, setDateQuery] = useState("latest");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  let {
    isLoading,
    isError,
    refetch,
    data: workListHR = [],
  } = useQuery({
    queryKey: ["AllWorkListHR"],
    queryFn: async () => {
      let result = await axiosSecure.get(`/query/search/date/?q=${dateQuery}`);
      return result.data;
    },
  });

  console.log(workListHR);

  function Filter({ column }) {
    const { filterVariant } = column.columnDef.meta ?? {};
    const columnFilterValue = column.getFilterValue();

    let uniqueValues = Array.from(column.getFacetedUniqueValues().keys());

    if (column.id === "date") {
      uniqueValues = uniqueValues
        .map((value) =>
          new Date(value).toLocaleDateString(undefined, { month: "long" })
        )
        .filter((value, idx, arr) => arr.indexOf(value) === idx)
        .sort();
    } else {
      uniqueValues = uniqueValues.sort();
    }

    if (filterVariant === "select") {
      return (
        <select
          onChange={(e) => column.setFilterValue(e.target.value)}
          value={columnFilterValue ?? ""}
        >
          <option value="">All</option>
          {uniqueValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      );
    }

    return null;
  }

  function handleDateFilter(e) {
    e.preventDefault();
    setDateQuery(e.target.value);
    refetch();
  }

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Name</span>,
      meta: { filterVariant: "select" },
    }),
    columnHelper.accessor("date", {
      cell: (info) => {
        const iSODate = info.getValue();
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        return (
          <span>
            {new Date(iSODate).toLocaleDateString(undefined, options)}
          </span>
        );
      },
      header: () => <span className="flex items-center  gap-2">Date</span>,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        // Extract the month from the row's date.
        const month = new Date(row.original.date).toLocaleDateString(
          undefined,
          { month: "long" }
        );
        return month === filterValue;
      },
      meta: { filterVariant: "select" },
    }),

    columnHelper.accessor("Tasks", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Task</span>,
    }),
    columnHelper.accessor("hours", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Hours</span>,
    }),
  ];

  const table = useReactTable({
    data: workListHR,
    columns,
    state: { columnFilters, pagination },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading employee data</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mx-[3%]">
      <div className="w-full flex justify-between items-center gap-2">
        <h2 className=" py-5  text-3xl font-bold">Work Progress</h2>
        <div className="w-full md:w-fit ">
          <form className="w-full  max-w-xs">
            <select
              value={dateQuery}
              onChange={handleDateFilter}
              name="dateFilter1"
              className="select select-bordered w-full max-w-xs h-4 md:h-12"
            >
              <option>latest</option>
              <option>oldest</option>
            </select>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          <thead className=" text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="py-3 px-5 text-black">
                      <div className=" mb-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                      {header.column.getCanFilter() && (
                        <Filter column={header.column} />
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between">
          <div className="pagination-controls flex gap-3">
            <button
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-blue-600 font-bold"
            >
              {"<"}
            </button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-blue-600 font-bold"
            >
              {">"}
            </button>
            <button
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>

          {/* Step 5: Page Size Selector */}
          <div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkProgress;
