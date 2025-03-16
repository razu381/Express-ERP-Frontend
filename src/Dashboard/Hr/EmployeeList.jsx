import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
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
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../Components/shared/Loader";
import Divider from "../../Components/shared/Divider";

function EmployeeList() {
  let axiosSecure = useAxiosSecure();
  //let userRole = useCheckRole();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  let [currColumnData, setCurrColumnData] = useState({});
  //console.log(currColumnData);

  let {
    refetch,
    isLoading,
    isError,
    data: employees = [],
  } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      let result = await axiosSecure.get("/employees-hr");
      return result.data;
    },
  });
  console.log(employees);

  function handleVerification(email, isVerified) {
    let changedVerification = !isVerified;
    console.log("changed", changedVerification);
    axiosSecure
      .patch(`/users/${email}`, { isVerified: changedVerification })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("User verification status updated successfully");
        }
        refetch();
      })
      .catch((err) => console.log(err));
  }

  function handleHrPayment(e) {
    e.preventDefault();
    let salary = parseFloat(e.target.salary.value);
    let month = e.target.month.value;
    let year = e.target.year.value;
    let email = currColumnData?.email;
    let name = currColumnData?.name;
    let paymentDetail = {
      salary,
      month,
      year,
      email,
      name,
      isPaidByAdmin: false,
      paidByAdminDate: null,
      transactionId: null,
    };

    //console.log(paymentDetail);
    axiosSecure
      .post("/payment-by-hr", paymentDetail)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Payment sent to admin for approval");
        }
      })
      .catch((err) => console.log(err));
  }

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Name</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => (
        <span className="italic text-blue-600">{info.getValue()}</span>
      ),
      header: () => <span className="flex items-center  gap-2">Email</span>,
    }),
    columnHelper.accessor("isVerified", {
      cell: (info) => {
        {
          let verified = info.getValue();

          return (
            <button
              onClick={() =>
                handleVerification(info.row.original?.email, verified)
              }
            >
              {verified ? (
                <IoShieldCheckmarkSharp color="green" size={25} />
              ) : (
                <FaRegTimesCircle color="red" size={25} />
              )}
            </button>
          );
        }
      },
      header: () => <span className="flex items-center  gap-2">Verified</span>,
    }),
    columnHelper.accessor("bank_account", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center  gap-2">Bank Account</span>
      ),
    }),
    columnHelper.accessor("salary", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Salary</span>,
    }),
    columnHelper.display({
      id: "pay",
      cell: (info) => {
        let isVerified = info.row.original.isVerified;

        return (
          <button
            disabled={!isVerified}
            className="btn bg-indigo-500 text-white"
            onClick={() => {
              setIsOpen(true);
              setCurrColumnData(info.row.original);
            }}
          >
            Pay
          </button>
        );
      },
      header: () => <span className="flex items-center gap-2">Pay</span>,
    }),
    columnHelper.display({
      id: "details",
      cell: (info) => (
        <Link
          className="btn bg-indigo-600 text-white"
          to={`/dashboard/details/${info.row.original?.email}`}
        >
          Details
        </Link>
      ),
      header: () => <span className="flex items-center  gap-2">Delete</span>,
    }),
  ];

  const table = useReactTable({
    data: employees,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
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
      <div className="w-full">
        <h2 className="font-bold text-center text-xl md:text-2xl lg:text-3xl pt-10 lg:pt-10">
          List of employees
        </h2>
        <Divider />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table  w-full">
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
      {/* Modal for edit work */}
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
          <h2 className="text-center font-bold ">
            <form onSubmit={handleHrPayment}>
              <div className="flex flex-col md:flex-row gap-2 mb-5 justify-between">
                <div className="flex-1">
                  <div className="label mb-2">
                    <span className="label-text">Salary</span>
                  </div>
                  <input
                    defaultValue={currColumnData.salary}
                    disabled
                    type="number"
                    placeholder="Salary"
                    className="input input-bordered w-full !text-black !border-gray-100"
                    name="salary"
                  />
                </div>
                <div className="flex-1">
                  <div className="label mb-2">
                    <span className="label-text">Month</span>
                  </div>
                  <select
                    required
                    className="select select-bordered w-full"
                    name="month"
                    defaultValue="January"
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="flex-1">
                  <div className="label mb-2">
                    <span className="label-text">Year</span>
                  </div>
                  <select
                    required
                    className="select select-bordered w-full justify-center items-center"
                    name="year"
                    defaultValue="2025"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                    <option value="2036">2036</option>
                    <option value="2037">2037</option>
                    <option value="2038">2038</option>
                    <option value="2039">2039</option>
                    <option value="2040">2040</option>
                  </select>
                </div>
              </div>
              <input
                type="submit"
                value="Pay"
                className="btn  bg-indigo-500  text-white w-full"
              />
            </form>
          </h2>
        </div>
      </Modal>
    </div>
  );
}

export default EmployeeList;
