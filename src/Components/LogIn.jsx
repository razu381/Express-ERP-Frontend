import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Auth/AuthProvider";
import { useForm } from "react-hook-form";
import GoogleLogin from "./shared/GoogleLogin";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useCheckRole from "../Hooks/useCheckRole";
import Swal from "sweetalert2";

function LogIn() {
  let { signIn } = useContext(AuthContext);
  let location = useLocation().state?.from?.pathname;
  let navigate = useNavigate();
  let axiosPublic = useAxiosPublic();
  let [email, setEmail] = useState();
  let [pass, setPass] = useState();

  console.log(location);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (user) => {
    let res = await axiosPublic.get(`/users/role/${user?.email}`);
    console.log(res);

    if (res.data?.role === "fired") {
      Swal.fire(
        `You are fired,
        you can't login anymore
                
        `
      );
    } else {
      signIn(user.email, user.pass)
        .then((data) => {
          if (location) {
            navigate(location);
          } else {
            navigate("/dashboard/profile");
          }
        })
        .catch((err) => {
          if (err.code === "auth/invalid-credential") {
            setError("email", {
              type: "manual",
              message: "Invalid email or password!",
            });
            setError("pass", {
              type: "manual",
              message: "Invalid email or password!",
            });
          }
        });
    }
  };

  function hanldeFill(role) {
    console.log("admin was clicked");
    if (role === "admin") {
      reset({
        email: "sirazu382@gmail.com",
        pass: "adminrazu52",
      });
    } else if (role === "hr") {
      reset({
        email: "sirazu52@gmail.com",
        pass: "hrrazu52",
      });
    } else {
      reset({
        email: "symboilde123@gmail.com",
        pass: "employeerazu52",
      });
    }
  }

  return (
    <div>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="hero bg-california-950">
        <div className=" flex-col py-10 lg:flex-row-reverse">
          <div className="card bg-white bg-opacity-5 w-full  shrink-0 shadow-2xl">
            <h2 className="text-center text-indigo-600 text-2xl font-bold pt-5">
              Sign In
            </h2>
            <h2 className="text-center mt-5 mb-3">Fill Demo Login</h2>
            <div className="inline-flex justify-center items-center mb-5 -space-x-px overflow-hidden rounded-md border bg-white shadow-xs mx-8">
              <button
                onClick={() => hanldeFill("admin")}
                className="w-full inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-800 hover:text-white focus:relative"
              >
                Admin
              </button>

              <button
                onClick={() => hanldeFill("hr")}
                className="w-full inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-800 hover:text-white focus:relative"
              >
                HR
              </button>

              <button
                onClick={() => hanldeFill("employee")}
                className="w-full inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-400 hover:bg-indigo-800 hover:text-white focus:relative"
              >
                Employee
              </button>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    autoComplete="username"
                    {...register("email", { required: true })}
                  />
                  {errors?.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    autoComplete="new-password"
                    {...register("pass")}
                  />
                  {errors?.pass && (
                    <p className="text-red-600">{errors.email?.message}</p>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary w-full bg-indigo-500">
                    Sign In
                  </button>
                </div>
                <GoogleLogin title="Sign In" />
              </form>
              <p className="p-5 text-center">
                New here?
                <Link to="/signup" className="text-blue-600 pl-1">
                  Signup here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
