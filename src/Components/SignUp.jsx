import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Auth/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import GoogleLogin from "./shared/GoogleLogin";

function Signup() {
  let {
    createAccount: userSignUp,
    editProfile,
    loginWithGoogle,
  } = useContext(AuthContext);

  let imageApi = import.meta.env.VITE_image_api;

  let navigate = useNavigate();
  let axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Role: "default",
      designation: "default",
    },
  });

  const onSubmit = async (user) => {
    localStorage.setItem("userRole", user?.role);
    console.log(user);
    let imageLink;
    if (user.displayUrl[0]) {
      const formData = new FormData();
      formData.append("image", user.displayUrl[0]);

      let res = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${imageApi}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      imageLink = res.data.data.display_url;
    } else {
      imageLink = "https://i.ibb.co.com/fGBWg7VP/profile.png";
    }

    if (imageLink) {
      userSignUp(user.email, user.pass)
        .then((data) => {
          console.log(data);
          editProfile({
            displayName: user.name,
            photoURL: imageLink,
          })
            .then(() => {
              let verified = user.role === "HR" ? true : false;
              axiosPublic
                .post("https://employe-management-server.vercel.app/users", {
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  designation: user.designation,
                  bank_account: user.bank_account,
                  salary: user.salary,
                  isVerified: verified,
                  photo: imageLink,
                })
                .then((res) => {
                  if (res.data.insertedId) {
                    toast.success("user signed up successfully");
                    navigate("/dashboard/profile");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  toast.error(err);
                });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className="hero bg-california-950">
        <div className=" flex-col py-10 lg:flex-row-reverse">
          <div className="card bg-white bg-opacity-5 w-full shrink-0 shadow-2xl">
            <h2 className="text-center text-white text-2xl font-bold pt-5">
              Sign Up
            </h2>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    {...register("name", { required: true, minLength: 4 })}
                  />
                  {errors.name?.type == "minLength" && (
                    <p className="text-red-600">
                      Name should be at least 4 characters
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <select
                    defaultValue="default"
                    {...register("role", { required: true })}
                    className="select select-bordered text-gray-400 w-full "
                  >
                    <option disabled value="default">
                      Select Role
                    </option>
                    <option>HR</option>
                    <option>Employee</option>
                  </select>
                </div>
                <div className="form-control">
                  <select
                    defaultValue="default"
                    {...register("designation")}
                    className="select select-bordered text-gray-400 w-full "
                  >
                    <option disabled value="default">
                      Select Designation
                    </option>
                    <option> Sales Assistant</option>
                    <option>Social Media executive</option>
                    <option>Digital Marketer</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Bank Account</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bank Account"
                    className="input input-bordered"
                    {...register("bank_account", { required: true })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Salary</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Salary"
                    className="input input-bordered"
                    {...register("salary", { required: true })}
                  />
                </div>
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
                  {errors.email && (
                    <p className="text-red-600">Email field is required</p>
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
                    {...register("pass", {
                      required: true,
                      pattern: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{7,}$/,
                    })}
                  />
                  {errors.pass?.type === "pattern" && (
                    <p className="text-red-600 ">
                      Password must have 6 or more characters, one special
                      character and one capital letter
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <input
                    {...register("displayUrl")}
                    type="file"
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary w-full hover:bg-blue-600">
                    Sign up
                  </button>
                </div>
                <GoogleLogin title="Sign up" />
              </form>
              <p className="p-5 text-center">
                Already have an account ,
                <Link to="/login" className="text-blue-600 pl-0.5">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
