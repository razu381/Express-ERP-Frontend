import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "react-toastify";
import Loader from "../../Components/shared/Loader";
import useAuthData from "../../Hooks/useAuthData";

function PaymentHistory() {
  let axiosSecure = useAxiosSecure();
  let { user } = useAuthData();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  let {
    refetch,
    isLoading,
    isError,
    data: payments = [],
  } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      let result = await axiosSecure.get(
        `/payment-by-hr-for-employee/${user?.email}`
      );
      return result.data;
    },
  });

  console.log(payments);

  //   ------------------ Table starts from here ------------------

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("salary", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Salary</span>,
    }),
    columnHelper.accessor("month", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Month</span>,
    }),
    columnHelper.accessor("year", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Year</span>,
    }),
    columnHelper.accessor("transactionId", {
      cell: (info) => info.getValue() || "-",
      header: () => (
        <span className="flex items-center  gap-2">Transaction Id</span>
      ),
    }),
  ];

  const table = useReactTable({
    data: payments,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  //   ------------------ Table ends from here ------------------

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading employee data</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mx-[3%]">
      <h2 className="text-center py-5  text-3xl font-bold">Payroll</h2>
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

export default PaymentHistory;
