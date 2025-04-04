import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuthData from "../Hooks/useAuthData";
import useCheckRole from "../Hooks/useCheckRole";
import Footer from "../Components/shared/Footer";

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
    <div className="">
      <ToastContainer />
      <div className=" bg-gray-100 px-[3%]">
        <div className="p-5  flex justify-between items-center max-w-full px-5 lg:max-w-[1140px] mx-auto">
          <ul className="flex  gap-5 font-medium text-sm">
            {isRoleLoading ? "loading...." : li}
          </ul>
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
      </div>
      <div className="max-w-full px-5 lg:max-w-[1140px] mx-auto min-h-[600px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
