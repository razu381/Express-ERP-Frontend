import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthData from "./useAuthData";

const axiosSecure = axios.create({
  baseURL: "https://employe-management-server.vercel.app",
});

function useAxiosSecure() {
  let navigate = useNavigate();
  let { LogOut } = useAuthData();

  axiosSecure.interceptors.request.use(
    function (config) {
      let token = localStorage.getItem("access-token");

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
  //intercept the response
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      let status = error.response.status;
      console.log("Status error in the interceptor", status);
      if (status === 401 || status === 403) {
        await LogOut();
        navigate("/login");
        console.log(error);
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}

export default useAxiosSecure;
