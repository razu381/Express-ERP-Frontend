import React from "react";
import { Link } from "react-router-dom";
import { easeOut, motion } from "motion/react";

function Hero() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl  px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <motion.h1
            className="text-3xl font-extrabold sm:text-5xl"
            initial={{ scale: 0.7 }}
            whileInView={{ scale: 1 }}
            transition={{
              duration: 1,
              ease: easeOut,
            }}
          >
            Manage employees with
            <strong className="font-extrabold text-indigo-600 sm:block py-2">
              {" "}
              EXPRESS ERP.{" "}
            </strong>
          </motion.h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Track work hours, payment schedule, monitoring, payment direct to
            the employees bank account. We provide essential tools and payment
            gateways ourself.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded-sm bg-indigo-500 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700  focus:ring-3 focus:outline-hidden sm:w-auto"
              to="/contact"
            >
              Contact us
            </Link>

            <Link
              className="block w-full rounded-sm px-12 py-3 text-sm font-medium border border-indigo-500 text-indigo-500 shadow-sm hover:text-white hover:bg-indigo-500 focus:ring-3 focus:outline-hidden sm:w-auto"
              to="/dashboard/profile"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
