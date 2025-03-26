import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";

function Header() {
  let { user, LogOut } = useContext(AuthContext);
  let [displayLogOut, setDisplayLogOut] = useState(false);

  let menuItems = (
    <>
      <li>
        <Link to="/" className="font-semibold ">
          Home
        </Link>
      </li>
      <li>
        <Link to="/dashboard/profile" className="font-semibold ">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/contact" className="font-semibold ">
          Contact us
        </Link>
      </li>
    </>
  );

  function handleLogOut() {
    LogOut()
      .then(() => {
        toast.success("Logged out successfully");
        localStorage.removeItem("access-token");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex flex-col justify-center items-center  bg-gray-100">
      <div className="navbar max-w-[1140px] mx-auto ">
        <div className="navbar-start w-full">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {menuItems}
            </ul>
          </div>
          <a className="text-california-600 font-bold text-indigo-600 text-xl lg:text-2xl italic">
            EXPRESS ERP
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
        <div className="navbar-end w-full">
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
                  className="btn bg-indigo-500 hover:bg-indigo-700 text-white"
                >
                  LogOut
                </Link>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-indigo-500 hover:bg-indigo-700 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
