import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState, useEffect } from "react";
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
import Loader from "../../Components/shared/Loader";

function AllEmployeeList() {
  let axiosSecure = useAxiosSecure();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  console.log(pagination);

  let {
    refetch,
    data: workListHR = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["AllEmployeeList"],
    queryFn: async () => {
      let result = await axiosSecure.get("/employees-admin");
      return result.data;
    },
    retry: 1,
  });

  console.log(workListHR);

  //Handle Fire or make HR
  function handleFireHR(id, role) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/change-role/${id}`, { role: role })
          .then((res) => {
            console.log(res);
            if (res.data.modifiedCount > 0) {
              refetch();
              if (role === "HR") {
                toast.success("User has been successfully promoted to HR");
              } else {
                toast.success("User has been fired successfully");
              }
            }
          })
          .catch((err) => Swal.fire(err.message));
      }
    });
  }

  //Handle salary increment
  function handleSalaryIncrement(id, salary) {
    console.log(salary);
    Swal.fire({
      title: "Increase salary",
      input: "number",
      inputValue: salary,
      inputAttributes: {
        autocapitalize: "off",
      },
      preConfirm: (value) => {
        const newSalary = parseFloat(value);
        if (newSalary < salary) {
          Swal.showValidationMessage(
            "You can't decrease salary, you must increase the salary"
          );
        }
        return newSalary;
      },
      showCancelButton: true,
      confirmButtonText: "Increase",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let newSalary = result.value;
        axiosSecure
          .patch(`/users/salary/${id}`, { salary: newSalary })
          .then((res) => {
            console.log(res.data);
            if (res.data?.modifiedCount > 0) {
              Swal.fire("Salary updated successfully");
              refetch();
            }
          });
      }
    });
  }

  //   ------------------ Table starts from here ------------------

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Name</span>,
      meta: { filterVariant: "select" },
    }),
    columnHelper.accessor("designation", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center  gap-2">Designation</span>
      ),
    }),
    columnHelper.display({
      id: "makeHR",
      cell: (info) => {
        let isHR = info.row.original?.role === "HR" ? true : false;

        return isHR ? (
          <h2 className="font-bold">HR</h2>
        ) : (
          <button
            className="btn bg-purple-600 text-white"
            onClick={() => handleFireHR(info.row.original?._id, "HR")}
          >
            Make HR
          </button>
        );
      },
      header: () => <span className="flex items-center  gap-2">Make HR</span>,
    }),
    columnHelper.display({
      id: "fire",
      cell: (info) => {
        let isFired = info.row.original?.role === "fired" ? true : false;

        return isFired ? (
          <h2 className="font-bold  text-red-600">Fired</h2>
        ) : (
          <button
            className="btn bg-red-600 text-white"
            onClick={() => handleFireHR(info.row.original?._id, "fired")}
          >
            Fire
          </button>
        );
      },
      header: () => <span className="flex items-center  gap-2">Fire</span>,
    }),
    columnHelper.display({
      id: "incSal",
      cell: (info) => (
        <button
          className="btn bg-purple-600 text-white"
          onClick={() =>
            handleSalaryIncrement(
              info.row.original?._id,
              info.row.original?.salary
            )
          }
        >
          Increase Salary
        </button>
      ),
      header: () => (
        <span className="flex items-center  gap-2">Increase Salary</span>
      ),
    }),
  ];

  const table = useReactTable({
    data: workListHR,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  //   ------------------ Table ends here ------------------

  // Early return for loading or error state
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading employee data</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mx-[3%]">
      <h2 className="text-center py-5  text-3xl font-bold">
        All Employee List
      </h2>
      <div className="overflow-x-auto w-full">
        {workListHR.length > 0 ? (
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No employees found.</div>
        )}
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

export default AllEmployeeList;
