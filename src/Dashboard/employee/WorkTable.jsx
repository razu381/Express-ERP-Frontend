import React, { useEffect, useMemo, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCheckRole from "../../Hooks/useCheckRole";
import Modal from "react-modal";

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
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import useAuthData from "../../Hooks/useAuthData";
import Loader from "../../Components/shared/Loader";

function WorkTable() {
  let axiosSecure = useAxiosSecure();
  let { user } = useAuthData();
  //let userRole = useCheckRole();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  let [currColumnData, setCurrColumnData] = useState();
  console.log("console from the currColumnData ", currColumnData);

  // Log on every render with a render counter
  const renderCount = React.useRef(0);
  renderCount.current += 1;
  console.log("Component rendered:", renderCount.current);

  let {
    refetch,
    isError,
    isLoading,
    data: work = [],
  } = useQuery({
    queryKey: ["workTable"],
    queryFn: async () => {
      let result = await axiosSecure.get(`/worksheet-employee/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
    retry: 0,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    control,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    if (currColumnData) {
      reset({
        _id: currColumnData?._id,
        Tasks: currColumnData?.Tasks,
        hours: currColumnData?.hours,
        date: currColumnData?.date,
      });
    }
  }, [currColumnData, reset]);

  const onSubmit = async (updatedWork) => {
    console.log("console from the form ", updatedWork);
    let { _id, ...updatedWorkWithoutId } = updatedWork;
    try {
      let workPostData = await axiosSecure.put(
        `/worksheet/${updatedWork._id}`,
        updatedWorkWithoutId
      );
      console.log("after submission", workPostData.data);

      if (workPostData.data.modifiedCount) {
        toast.success("Work updated successfully");
        setIsOpen(false);
        refetch();
      }
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("An error occurred while updating work");
    }
  };

  function handleDelete(id) {
    axiosSecure
      .delete(`/worksheet/${id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          console.log(res.data);
          toast.success("Work deleted successfully");
          refetch();
        }
      })
      .catch((err) => toast.error((err) => toast.error(err.message)));
  }

  // let workTemp = [
  //   {
  //     _id: "67bab3fd801d76dffae814e5",
  //     Tasks: "sales",
  //     email: "roman@gmail.com",
  //     date: "2025-02-23T05:36:55.730+00:00",
  //     hours: 2,
  //   },
  //   {
  //     _id: "67bab3fd801d76dffae81465",
  //     Tasks: "sales",
  //     email: "roman@gmail.com",
  //     date: "2025-02-23T05:36:55.730+00:00",
  //     hours: 5,
  //   },
  // ];
  let stableData = useMemo(() => work, [work]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("Tasks", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center  gap-2">Task</span>,
    }),
    columnHelper.accessor("hours", {
      cell: (info) => (
        <span className="italic text-blue-600">{info.getValue()}</span>
      ),
      header: () => (
        <span className="flex items-center  gap-2">Hours worked</span>
      ),
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
    }),
    columnHelper.display({
      id: "edit",
      cell: (info) => (
        <div>
          <button
            onClick={() => {
              setIsOpen(true);
              setCurrColumnData(info.row.original);
            }}
          >
            <FaEdit size={25} />
          </button>
        </div>
      ),
      header: () => <span className="flex items-center  gap-2">Edit</span>,
    }),
    columnHelper.display({
      id: "delete",
      cell: (info) => (
        <button onClick={() => handleDelete(info.row.original._id)}>
          <MdDelete size={25} color="red" />
        </button>
      ),
      header: () => <span className="flex items-center  gap-2">Delete</span>,
    }),
  ];

  const table = useReactTable({
    data: stableData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (isError) {
    return <div>Error loading employee data</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mx-[3%]">
      <h2 className="text-center py-5  text-3xl font-bold">Work log</h2>
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
            <h2>Hello</h2>

            <div className="w-full">
              <form
                className="flex  flex-col md:flex-row items-center justify-between gap-5 w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input type="hidden" {...register("_id")}></input>
                <div className="form-control w-full">
                  <select
                    {...register("Tasks")}
                    className="select select-bordered"
                  >
                    <option value="sales">Sales</option>
                    <option value="support">Support</option>
                    <option value="content">Content</option>
                    <option value="paper work">Paper work</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <input
                    type="number"
                    placeholder="Hours Worked"
                    className="input input-bordered"
                    {...register("hours", { required: true })}
                  />
                </div>
                <div className="form-control w-full">
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        className="input input-bordered w-full"
                        selected={field.value}
                        onChange={(date) => field.onChange(date.toISOString())}
                      />
                    )}
                  />
                </div>
                <div className="form-control w-full">
                  <button className="btn bg-green-800 text-white w-full">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default WorkTable;
