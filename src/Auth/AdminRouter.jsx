import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation, useParams } from "react-router-dom";
import useCheckRole from "../Hooks/useCheckRole";
import Loader from "../Components/shared/Loader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AdminRouter({ children }) {
  let { user, loading, LogOut } = useContext(AuthContext);
  let { userRole, isRoleLoading } = useCheckRole();
  console.log(userRole, isRoleLoading);

  let location = useLocation();

  if (loading || isRoleLoading) {
    return <Loader />;
  }

  if (user && userRole) {
    if (userRole?.role == "Admin") {
      return children;
    }
  }

  async function handleLogout() {
    try {
      await LogOut();
    } catch (err) {
      console.log(err);
    }
  }
  handleLogout();

  Swal.fire("You don't have access to admin Dashboard. Redirecting to login");
  return <Navigate to="/login" state={{ from: location }} />;
}
export default AdminRouter;
