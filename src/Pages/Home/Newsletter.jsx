import React from "react";
import Swal from "sweetalert2";
import { easeOut, motion } from "motion/react";

function Newsletter() {
  function handleNewsletter(e) {
    e.preventDefault();
    console.log("Hi");
    Swal.fire({
      title: "Success",
      text: " You have subscribed successfully to Recommendme weekly newsletter",
      icon: "success",
      confirmButtonText: "Cool",
    });
  }
  return (
    <section className="bg-gray-100 my-10 lg:my-20 rounded-sm">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <motion.h2
            className="text-2xl font-bold text-california-900 md:text-3xl"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut }}
          >
            Stay Updated with the Best Recommendations!
          </motion.h2>

          <p className="hidden text-gray-500 sm:mt-4 sm:block">
            Subscribe to our newsletter and never miss out on top product
            recommendations, expert tips, and community insights. Join now and
            make smarter choices!
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-xl">
          <form
            onSubmit={handleNewsletter}
            action="#"
            className="sm:flex sm:gap-4"
          >
            <div className="sm:flex-1">
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-sm border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                required
              />
            </div>

            <button
              type="submit"
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-sm bg-indigo-500 px-5 py-3 text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
            >
              <span className="text-sm font-medium"> Sign Up </span>

              <svg
                className="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
