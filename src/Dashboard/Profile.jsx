import React from "react";
import useAuthData from "../Hooks/useAuthData";
import useCheckRole from "../Hooks/useCheckRole";
import Loader from "../Components/shared/Loader";

function Profile() {
  let { user, loading } = useAuthData();
  let { userRole, isRoleLoading } = useCheckRole();

  console.log(user);

  if (loading || isRoleLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center  my-10">
      <div className="bg-gray-100 relative block overflow-hidden rounded-sm border border-gray-100 p-8 md:p-10 lg:pb-20 lg:px-10 max-w-md">
        <h3 className="font-bold text-xl lg:text-2xl text-center py-10 text-indigo-500">
          Welcome to our Dashboard
        </h3>
        <div className="flex justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              Hellllo, {user?.displayName}
            </h3>
            <p className=" bg-indigo-900 text-white w-fit px-5 py-1 my-2 rounded-sm">
              {userRole?.role}
            </p>
          </div>

          <div className=" ">
            <img
              alt=""
              src={user?.photoURL}
              referrerPolicy="no-referrer"
              className="size-16 rounded-sm object-cover shadow-xs"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Capabitlities: </h3>
          {userRole?.role === "Admin" && (
            <ul>
              <li> - You can see all employees and make them HR/Fire</li>
              <li> - You can pay all employess and increase their salary</li>
            </ul>
          )}
          {userRole?.role === "HR" && (
            <ul>
              <li>- You can mointor all works done by employee and filter</li>
              <li>
                - You can see all employees and request for payment to admin
              </li>
              <li> - You can see employee details</li>
            </ul>
          )}
          {userRole?.role === "Employee" && (
            <ul>
              <li> - You can view, add, edit, delete your worksheet</li>
              <li> - You can see your payment history</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
