import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

function Header() {
  let { user, LogOut } = useContext(AuthContext);
  let [displayLogOut, setDisplayLogOut] = useState(false);
  //console.log(user?.email, user?.displayName);

  let menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard/profile">Dashboard</Link>
      </li>
      <li>
        <Link to="/contact">Contact us</Link>
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
    <div className="navbar bg-california-50">
      <div className="navbar-start">
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
        <a className="btn text-california-600 btn-ghost text-xl lg:text-2xl italic">
          Express ERP
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
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
  );
}

export default Header;
