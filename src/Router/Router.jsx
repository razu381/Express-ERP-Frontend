import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../Root";
import Home from "../Pages/Home/Home";
import Signup from "../Components/SignUp";
import Login from "../Components/LogIn";
import UsersList from "../Components/shared/UsersList";
import Dashboard from "../Dashboard/Dashboard";
import worksheet from "../Dashboard/employee/Worksheet";
import Worksheet from "../Dashboard/employee/Worksheet";
import PaymentHistory from "../Dashboard/employee/PaymentHistory";
import EmployeeList from "../Dashboard/Hr/EmployeeList";
import EmployeeDetails from "../Dashboard/Hr/EmployeeDetails";
import WorkProgress from "../Dashboard/Hr/WorkProgress";
import AllEmployeeList from "../Dashboard/Admin/AllEmployeeList";
import Payroll from "../Dashboard/Admin/Payroll";
import EmployeeRoute from "../Auth/EmployeeRoute";
import HrRouter from "../Auth/HrRouter";
import AdminRouter from "../Auth/AdminRouter";

function Router() {
  const routersystem = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/users",
          element: <UsersList />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "worksheet",
          element: (
            <EmployeeRoute>
              <Worksheet />
            </EmployeeRoute>
          ),
        },
        {
          path: "payments-history",
          element: (
            <EmployeeRoute>
              <PaymentHistory />
            </EmployeeRoute>
          ),
        },
        {
          path: "employee-list",
          element: (
            <HrRouter>
              <EmployeeList />
            </HrRouter>
          ),
        },
        {
          path: "details/:email",
          element: (
            <HrRouter>
              <EmployeeDetails />
            </HrRouter>
          ),
          loader: ({ params }) =>
            fetch(`http://localhost:3000/users/${params.email}`),
        },
        {
          path: "progress",
          element: (
            <HrRouter>
              <WorkProgress />
            </HrRouter>
          ),
        },
        {
          path: "all-employee-list",
          element: (
            <AdminRouter>
              <AllEmployeeList />
            </AdminRouter>
          ),
        },
        {
          path: "payroll",
          element: (
            <AdminRouter>
              <Payroll />
            </AdminRouter>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routersystem} />;
}

export default Router;
