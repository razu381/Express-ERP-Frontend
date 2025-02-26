import React from "react";
import useAuthData from "../Hooks/useAuthData";
import useCheckRole from "../Hooks/useCheckRole";

function Profile() {
  let { user } = useAuthData();
  let { userRole, isRoleLoading } = useCheckRole();

  console.log(user);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 max-w-md">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              Hellllo, {user?.displayName}
            </h3>
            <p className="py-2">Role: {userRole?.role}</p>
          </div>

          <div className="hidden sm:block sm:shrink-0">
            <img
              alt=""
              src={user?.photoURL}
              referrerPolicy="no-referrer"
              className="size-16 rounded-lg object-cover shadow-xs"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-xl lg:text-2xl">
            Welcome to our Dashboard. Features
          </h3>
          <ul className="text-sm text-pretty text-gray-500">
            <li>
              1. If employee:
              <ul>
                <li> - You can view, add, edit, delete your worksheet</li>
                <li> - You can see your payment history</li>
              </ul>
            </li>
            <li>
              1. If employee:
              <ul>
                <li> - You can view, add, edit, delete your worksheet</li>
                <li> - You can see your payment history</li>
              </ul>
            </li>
            <li>
              1. If HR:
              <ul>
                <li>
                  {" "}
                  - You can mointor all works done by employee and filter
                </li>
                <li>
                  {" "}
                  - You can see all employees and request for payment to admin
                </li>
                <li> - You can see employee details</li>
              </ul>
            </li>
            <li>
              1. If Admin:
              <ul>
                <li> - You can see all employees and make them HR/Fire</li>
                <li> - You can pay all employess and increase their salary</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
