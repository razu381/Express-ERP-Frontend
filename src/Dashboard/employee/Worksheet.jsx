import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import WorkTable from "./WorkTable";
import { useQueryClient } from "@tanstack/react-query";
import useAuthData from "../../Hooks/useAuthData";

function Worksheet() {
  let queryClient = useQueryClient();
  const [startDate, setStartDate] = useState(new Date());
  let axiosSecure = useAxiosSecure();
  let { user } = useAuthData();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (work) => {
    let email = user?.email;
    let name = user?.displayName;
    let date = startDate.toISOString();
    let workData = {
      ...work,
      date,
      email,
      name,
    };

    try {
      let workPostData = await axiosSecure.post("worksheet", workData);
      console.log("after submission", workPostData.data);

      if (workPostData.data.insertedId) {
        toast.success("Work added successfully");
        reset();
        queryClient.invalidateQueries({ queryKey: ["workTable"] });
      } else {
        toast.error("work couldn't be added successfully");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An error occurred while adding work");
    }
  };
  return (
    <div>
      <h2>Worksheet</h2>
      <div className="w-full">
        <form
          className="flex flex-col  md:flex-row items-center justify-between gap-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control w-full">
            <select {...register("Tasks")} className="select select-bordered">
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
            <DatePicker
              className="input input-bordered w-full"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="form-control w-full">
            <button className="btn bg-green-800 text-white w-full">
              Submit
            </button>
          </div>
        </form>
        <WorkTable />
      </div>
    </div>
  );
}

export default Worksheet;
