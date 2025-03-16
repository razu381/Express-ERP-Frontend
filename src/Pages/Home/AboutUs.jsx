import React from "react";
import Divider from "../../Components/shared/Divider";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="">
      <h2 className="font-bold text-center text-xl md:text-2xl lg:text-3xl pt-10 lg:pt-20">
        About us
      </h2>
      <Divider />

      <section className="overflow-hidden  sm:grid sm:grid-cols-1 lg:grid-cols-2 sm:items-center sm:justify-center">
        <div className="p-8 md:p-12 lg:pl-0 lg:pr-20 lg:py-24">
          <div className="mx-auto max-w-xl ">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Streamlining Workforce Management, Empowering Your Team.
            </h2>

            <p className=" text-gray-500 mt-4">
              We offer a comprehensive employee management platform designed to
              streamline your HR processes and empower your team. Our software
              provides self-service tools for employees, in-depth oversight for
              HR, and centralized control for administrators, fostering
              transparency and efficiency. But we go beyond standard HR
              solutions. To support your complete business needs, we also
              provide professional web development, search engine optimization
              (SEO), and graphic design services. We craft engaging online
              experiences, enhance your digital visibility, and create
              compelling visual assets. Our goal is to be your all-in-one
              solution for both internal management and external brand
              development. We believe in building lasting partnerships, adapting
              to your evolving needs, and ensuring seamless integration across
              all our services.
            </p>

            <div className="mt-4 md:mt-8">
              <Link
                to="/contact"
                className="inline-block rounded-sm bg-indigo-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <img
          alt=""
          src="https://i.ibb.co.com/zHQDqJYv/laptop-7136991-640.jpg"
          className="w-full object-cover max-h-[600px] rounded-sm"
        />
      </section>
    </div>
  );
}

export default AboutUs;
