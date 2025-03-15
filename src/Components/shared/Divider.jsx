import React from "react";
import { IoIosPeople } from "react-icons/io";

function Divider() {
  return (
    <span className="flex justify-center items-center pt-2 pb-10 mx-[20%] md:mx-[35%]">
      <span className="h-px flex-1 bg-indigo-500"></span>
      <span className="shrink-0 px-3">
        <IoIosPeople size={20} className="-mt-1" color="indigo" />
      </span>
      <span className="h-px flex-1 bg-indigo-500"></span>
    </span>
  );
}

export default Divider;
