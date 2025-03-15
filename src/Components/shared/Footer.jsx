import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  let menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard/profile">Dashboard</Link>
      </li>
      <li>
        <Link to="/contact">Contact us</Link>
      </li>
    </>
  );
  return (
    <footer className="bg-gray-100 my-5">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <img
            src="https://i.ibb.co.com/PzGf5QgP/employeemanagement.png"
            alt=""
            className="max-w-44"
          />
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          Express ERP specializes in delivering comprehensive web development,
          digital marketing, and SEO services tailored to your business needs.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {menuItems}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
