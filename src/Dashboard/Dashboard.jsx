import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuthData from "../Hooks/useAuthData";

function Dashboard() {
  let { user, LogOut } = useAuthData();
  let [displayLogOut, setDisplayLogOut] = useState(false);

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
      <div className="p-5 bg-blue-200 flex justify-between items-center">
        <ul className="flex  gap-5">
          <li>
            <Link
              to="/dashboard"
              className="uppercase font-medium text-xl text-blue-600 underline"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/worksheet"
              className="uppercase font-medium text-xl text-blue-600 underline"
            >
              Worksheet
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/payments-history"
              className="uppercase font-medium text-xl text-blue-600 underline"
            >
              Payments
            </Link>
          </li>
        </ul>
        <div>
          {user ? (
            <div className="flex gap-2 justify-center items-center">
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
