import React from "react";
import Divider from "../../Components/shared/Divider";

function Features() {
  return (
    <div>
      <h2 className="font-bold text-center text-xl md:text-2xl lg:text-3xl pt-10 lg:pt-20">
        Features
      </h2>
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* service 1 */}
        <div className="rounded-xl bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8">
          <div>
            {/* <strong className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
              Web
            </strong> */}

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              Self-Service Worksheet Management
            </h3>

            <p className="mt-1 text-sm text-gray-700">
              Empower employees to take control of their work records. Employees
              can effortlessly view, add, edit, and delete their own worksheets,
              ensuring accurate tracking of tasks and time. This streamlined
              process promotes transparency and efficiency, allowing employees
              to manage their contributions effectively. Additionally, they can
              access their complete payment history, providing a clear overview
              of their earnings
            </p>
          </div>
        </div>
        {/* //service 2 */}
        <div className="rounded-xl bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8">
          <div>
            {/* <strong className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
              Web
            </strong> */}

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              Comprehensive Employee Oversight
            </h3>

            <p className="mt-1 text-sm text-gray-700">
              Enable HR professionals to effectively monitor and manage the
              workforce. HR users gain the ability to review all employee
              worksheets, filter data for specific insights, and access detailed
              employee profiles. This comprehensive view facilitates performance
              evaluation and resource allocation. Furthermore, HR can
              efficiently manage payment requests to the admin, ensuring timely
              compensation for employees.
            </p>
          </div>
        </div>
        {/* //service 3 */}
        <div className="rounded-xl bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8">
          <div>
            {/* <strong className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
              Graphic
            </strong> */}

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              Centralized Administrative Control
            </h3>

            <p className="mt-1 text-sm text-gray-700">
              Provide administrators with the tools necessary for overarching
              management of the organization. Administrators have full access to
              employee data, allowing them to designate HR roles and manage
              personnel changes, including terminations. The system simplifies
              payroll processes, enabling administrators to process payments and
              adjust salaries with ease. This central control point ensures
              efficient and accurate management of the entire employee
              lifecycle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
