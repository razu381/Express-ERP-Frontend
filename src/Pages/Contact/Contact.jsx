import React from "react";
import Swal from "sweetalert2";

function Contact() {
  function handleContact(e) {
    e.preventDefault();
    let name = e.target.name.value;
    Swal.fire(`Thank you ${name},
            We will contact you asap
        `);
  }
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 my-10 justify-center items-center mx-[5%]">
        <div className="">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Contact us today!
            </h1>

            <p className="mt-4 text-gray-500">
              Contact us for any information and quotes. One of our
              representative will provide quote within 72 hours of your request.
            </p>
          </div>

          <form
            action="#"
            className="mx-auto mt-8 mb-0 max-w-md space-y-4"
            onSubmit={handleContact}
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-sm border-gray-200 p-4 pe-12 text-sm shadow-xs"
                  placeholder="Your name"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-sm border-gray-200 p-4 pe-12 text-sm shadow-xs"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="OrderNotes" className="sr-only">
                Message
              </label>

              <div className="overflow-hidden rounded-sm border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <textarea
                  id="message"
                  className="w-full rounded-sm border-gray-200 p-4 pe-12 text-sm shadow-xs"
                  rows="4"
                  placeholder="Your message"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full rounded-sm bg-violet-500 px-5 py-3 text-sm font-medium text-white"
              >
                Send message
              </button>
            </div>
          </form>
        </div>

        <div className=" ">
          <img
            alt=""
            src="https://i.ibb.co.com/7tg00PBt/pexels-marcus-aurelius-4064230.jpg"
            className="w-full max-h-[600px] object-cover rounded-sm mt-10"
          />
        </div>
      </section>
    </div>
  );
}

export default Contact;
