import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuthData from "../../Hooks/useAuthData";
import { useState } from "react";

function GoogleLogin({ title }) {
  let { loginWithGoogle } = useAuthData();
  let location = useLocation().state;
  let navigate = useNavigate();
  let axiosPublic = useAxiosPublic();

  function handleGoogle() {
    localStorage.setItem("userRole", "Employee");
    loginWithGoogle()
      .then((data) => {
        //console.log(data);
        axiosPublic
          .get(`users/${data?.user.email}`)
          .then((res) => {
            console.log(res);
            if (!res.data) {
              axiosPublic
                .post("/users", {
                  name: data.user.displayName,
                  email: data.user.email,
                  role: "Employee",
                  designation: "Digital Marketer",
                  salary: 250000,
                  bank_account: "IBNA-3435354343-343434343-33",
                  isVerified: false,
                  photo: data?.user?.photoURL,
                })
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => console.log(err?.message));
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
        if (location) {
          navigate(location);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err?.message));
  }

  return (
    <div className="btn btn-outline border-yellow-600" onClick={handleGoogle}>
      <FcGoogle /> {title} with google
    </div>
  );
}

export default GoogleLogin;
