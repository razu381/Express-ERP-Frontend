import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuthData from "../Hooks/useAuthData";
import useCheckRole from "../Hooks/useCheckRole";

function Dashboard() {
  let { user, LogOut } = useAuthData();
  let [displayLogOut, setDisplayLogOut] = useState(false);
  let { userRole, isRoleLoading } = useCheckRole();

  let li = null;

  if (userRole?.role === "Employee") {
    li = (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard/worksheet">Worksheet</Link>
        </li>
        <li>
          <Link to="/dashboard/payments-history">Payment history</Link>
        </li>
      </>
    );
  } else if (userRole?.role === "HR") {
    li = (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard/employee-list">Employee list</Link>
        </li>
        <li>
          <Link to="/dashboard/progress">Progress</Link>
        </li>
      </>
    );
  } else if (userRole?.role === "Admin") {
    li = (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard/all-employee-list">All Employees</Link>
        </li>
        <li>
          <Link to="/dashboard/payroll">Payroll</Link>
        </li>
      </>
    );
  }

  function handleLogOut() {
    LogOut()
      .then(() => {
        toast.success("Logged out successfully");
        localStorage.removeItem("access-token");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <ToastContainer />
      <div className="p-5  flex justify-between items-center">
        <ul className="flex  gap-5">{isRoleLoading ? "loading...." : li}</ul>
        <div>
          {user ? (
            <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
              <img
                onClick={() => setDisplayLogOut(!displayLogOut)}
                src={user?.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              {displayLogOut && (
                <Link
                  onClick={handleLogOut}
                  className="btn bg-california-500 hover:bg-california-800"
                >
                  LogOut
                </Link>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-california-500 hover:bg-california-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
