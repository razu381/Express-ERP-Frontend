import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

function useAuthData() {
  let auth = useContext(AuthContext);
  return auth;
}

export default useAuthData;
