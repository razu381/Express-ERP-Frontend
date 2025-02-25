import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation, useParams } from "react-router-dom";
import useCheckRole from "../Hooks/useCheckRole";
import Loader from "../Components/shared/Loader";

function HrRouter({ children }) {
  let { user, loading } = useContext(AuthContext);
  let { userRole, isRoleLoading } = useCheckRole();
  console.log(userRole, isRoleLoading);

  let location = useLocation();

  if (loading || isRoleLoading) {
    return <Loader />;
  }

  if (user && userRole) {
    if (userRole?.role == "HR") {
      return children;
    }
  }

  return <Navigate to="/login" state={{ from: location }} />;
}
export default HrRouter;
