import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuthData from "./useAuthData";

function useCheckRole() {
  let { user, loading: userLoading } = useAuthData();
  let axiosSecure = useAxiosSecure();

  // if (!user === false && !userLoading) {
  //   return { userRole: null, isRoleLoading: false };
  // }

  const { data: userRole, isLoading: isRoleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      let res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(userRole);

  return { userRole, isRoleLoading };
}

export default useCheckRole;
