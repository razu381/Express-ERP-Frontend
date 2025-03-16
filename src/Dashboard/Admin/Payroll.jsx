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
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Modal from "react-modal";
import Payment from "./Payment";
import Loader from "../../Components/shared/Loader";
import Divider from "../../Components/shared/Divider";

function Payroll() {
  let axiosSecure = useAxiosSecure();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  let [currRowData, setCurrentRowData] = useState();

  let {
    refetch,
    isLoading,
    isError,
    data: payroll = [],
  } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      let result = await axiosSecure.get("/payment-by-hr");
      return result.data;
    },
  });

  function handleAdminPay(data) {
    setCurrentRowData(data);
    console.log("data before axios ------- ", data);
    axiosSecure
      .post("/payment-check-paid", data)
      .then((res) => {
        if (res.data?.isPaid) {
          let isoString = res.data?.paidByAdminDate;
          let newDate = new Date(isoString);
          let date = newDate.toLocaleString();
          Swal.fire(
            `
            You have already paid this at ${date} with transaction id of ${res.data?.transactionId}
            `
          );
        } else {
          setIsOpen(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function onSuccessPay(id, transactionId) {
    console.log("transaction id from successpay function", transactionId);
    setIsOpen(false);
    axiosSecure
      .patch(`/paid-by-admin/${id}`, { transactionId })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast("Payment successfull");
          refetch();
        }
      })
      .catch((err) => toast(err.message));
  }

  //   ------------------ Table starts from here ------------------

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Name</span>,
    }),
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
    columnHelper.accessor("paidByAdminDate", {
      cell: (info) => {
        let isoString = info.getValue();
        if (isoString != null) {
          let date = new Date(isoString);
          let localDate = date.toLocaleString();
          return localDate;
        }
      },
      header: () => <span className="flex items-center  gap-2">Date</span>,
    }),
    columnHelper.display({
      id: "pay",
      cell: (info) => {
        let isPaid = info.row.original?.isPaidByAdmin;

        return (
          <button
            disabled={isPaid}
            className="btn bg-indigo-500 text-white"
            onClick={() => handleAdminPay(info.row.original)}
          >
            Pay
          </button>
        );
      },

      header: () => <span className="flex items-center  gap-2">Pay</span>,
    }),
  ];

  const table = useReactTable({
    data: payroll,
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
    <div className="flex flex-col items-center justify-center mx-[3%] py-5">
      <div className="w-full">
        <h2 className="font-bold text-center text-xl md:text-2xl lg:text-3xl pt-10 lg:pt-10 ">
          Payment History
        </h2>
        <Divider />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full my-5">
          <thead className=" text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-1 border-indigo-200">
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
              <tr key={row.id} className="border-b-1 border-indigo-200">
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

      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsOpen(false)}
        // style={customStyles}
        contentLabel="Example Modal"
        // className="mx-28 bg-red-700"
      >
        <div>
          <button
            onClick={() => setIsOpen(false)}
            className="btn flex flex-col ml-auto"
          >
            close
          </button>
          <h2 className="text-center font-bold ">Pay here</h2>

          <Payment salary={currRowData} onSuccessPay={onSuccessPay} />
        </div>
      </Modal>
    </div>
  );
}

export default Payroll;
