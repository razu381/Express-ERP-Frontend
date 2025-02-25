import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCheckRole from "../../Hooks/useCheckRole";
import dummyData from "./dummy.json";
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

function UsersList() {
  let axiosSecure = useAxiosSecure();
  let [users, setUsers] = useState([]);
  let userRole = useCheckRole();
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(users);

  function Filter({ column }) {
    const { filterVariant } = column.columnDef.meta ?? {};
    if (filterVariant === "select") {
      const columnFilterValue = column.getFilterValue();
      const sortedUniqueValues = React.useMemo(() => {
        return Array.from(column.getFacetedUniqueValues().keys())
          .sort()
          .slice(0, 50000);
      }, [column.getFacetedUniqueValues()]);

      return (
        <select
          onChange={(e) => column.setFilterValue(e.target.value)}
          value={columnFilterValue ?? ""}
        >
          <option value="">All</option>
          {sortedUniqueValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      );
    }

    return null;
  }

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center  gap-2">
          <FaUser /> Name
        </span>
      ),
      meta: { filterVariant: "select" },
    }),
    columnHelper.accessor("email", {
      cell: (info) => (
        <span className="italic text-blue-600">{info.getValue()}</span>
      ),
      header: () => (
        <span className="flex items-center  gap-2">
          <FaUser /> Email
        </span>
      ),
      meta: { filterVariant: "select" },
    }),
    columnHelper.accessor("role", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center  gap-2">
          <FaUser /> Role
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data: users,
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

  return (
    <div className="flex flex-col items-center justify-center mx-[3%]">
      <h2 className="text-center py-5  text-3xl font-bold">Tanstack Table</h2>
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

export default UsersList;
