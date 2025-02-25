import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation, useParams } from "react-router-dom";
import useCheckRole from "../Hooks/useCheckRole";
import Loader from "../Components/shared/Loader";

function EmployeeRoute({ children }) {
  let { user, loading } = useContext(AuthContext);
  let { userRole, isRoleLoading } = useCheckRole();
  console.log(userRole, isRoleLoading);

  let location = useLocation();

  console.log("user loading = ", loading);
  console.log("Roleloading = ", isRoleLoading);

  if (loading || isRoleLoading) {
    return <Loader />;
  }

  if (user && userRole?.role === "Employee") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
}
export default EmployeeRoute;
