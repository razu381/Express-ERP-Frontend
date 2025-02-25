import React from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Fotoer from "./Components/shared/Footer";
import Footer from "./Components/shared/Footer";

function Root() {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
