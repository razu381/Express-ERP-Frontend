import React from "react";
import { easeOut, motion } from "motion/react";

function Stats() {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl mt-7 px-4 py-8 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut }}
          >
            Trusted by Customers Around The World
          </motion.h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            We have happy and loyal customers from 50+ countries and 5
            continents. We serve accross Asia, South America, North America,
            Australia & Africa
          </p>
        </div>

        <dl className="mg-6 grid grid-cols-2 gap-4 divide-y divide-gray-100 sm:mt-8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="flex flex-col px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Total Customers
            </dt>

            <dd className="text-4xl font-extrabold text-indigo-500 md:text-5xl">
              1000000+
            </dd>
          </div>

          <div className="flex flex-col px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Countries Served
            </dt>

            <dd className="text-4xl font-extrabold text-indigo-500 md:text-5xl">
              53
            </dd>
          </div>

          <div className="flex flex-col px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Continents Served
            </dt>

            <dd className="text-4xl font-extrabold text-indigo-500 md:text-5xl">
              5
            </dd>
          </div>

          <div className="flex flex-col px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Revenue
            </dt>

            <dd className="text-4xl font-extrabold text-indigo-500 md:text-5xl">
              86M
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Stats;
