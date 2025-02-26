import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation, useParams } from "react-router-dom";
import useCheckRole from "../Hooks/useCheckRole";
import Loader from "../Components/shared/Loader";
import Swal from "sweetalert2";

function EmployeeRoute({ children }) {
  let { user, loading, LogOut } = useContext(AuthContext);
  let { userRole, isRoleLoading } = useCheckRole();

  let location = useLocation();

  if (loading || isRoleLoading) {
    return <Loader />;
  }

  if (user && userRole?.role === "Employee") {
    return children;
  }

  async function handleLogout() {
    try {
      await LogOut();
    } catch (err) {
      console.log(err);
    }
  }
  //handleLogout();

  Swal.fire(
    "You don't have access to employee dashboard. Redirecting to login"
  );
  return <Navigate to="/login" />;
}
export default EmployeeRoute;
