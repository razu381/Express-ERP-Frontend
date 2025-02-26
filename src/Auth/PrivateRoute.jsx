import { Navigate } from "react-router-dom";
import Loader from "../Components/shared/Loader";
import useAuthData from "../Hooks/useAuthData";

function PrivateRoute({ children }) {
  let { loading, user } = useAuthData();
  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
}

export default PrivateRoute;
