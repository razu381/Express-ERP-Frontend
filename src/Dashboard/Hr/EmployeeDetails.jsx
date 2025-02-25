import React from "react";
import { useLoaderData } from "react-router-dom";
import useAuthData from "../../Hooks/useAuthData";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Loader from "../../Components/shared/Loader";

function EmployeeDetails() {
  let employeeData = useLoaderData();
  let axiosSecure = useAxiosSecure();
  //console.log(employeeData);

  let {
    isLoading,
    isError,
    data: paymentData,
  } = useQuery({
    queryKey: ["paymentData", employeeData?.email],
    queryFn: async () => {
      let payment = await axiosSecure.get(
        `/payment-by-hr/${employeeData?.email}`
      );
      return payment.data;
    },
  });
  console.log(paymentData);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading employee data</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-center">Employee Details</h2>

      <div className="stats shadow flex flex-col md:flex-row justify-center items-center">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Name</div>
          <div className="stat-value text-primary">{employeeData.name}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Designation</div>
          <div className="stat-value text-secondary">
            {employeeData.designation}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src={employeeData.photo} className="object-cover" />
              </div>
            </div>
          </div>
          <div className="stat-title">Salary</div>
          <div className="stat-value">{employeeData.salary}</div>
        </div>
      </div>

      <div>
        <h2 className="text-center py-7">Chart here</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={paymentData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="salary"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            >
              <LabelList dataKey="salary" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EmployeeDetails;
