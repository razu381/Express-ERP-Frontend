import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase_config";
const googelProvider = new GoogleAuthProvider();

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export let AuthContext = createContext();

function AuthProvider({ children }) {
  let [user, setUser] = useState();
  let [userRole, setUserRole] = useState();
  let [loading, setLoading] = useState(true);
  let axiosPublic = useAxiosPublic();

  function createAccount(email, pass) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  }
  function signIn(email, pass) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  }
  function LogOut() {
    setLoading(true);
    return signOut(auth);
  }
  function editProfile(userData) {
    return updateProfile(auth.currentUser, userData);
  }

  function resetPass(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (CurrUser) => {
      setUser(CurrUser);
      if (CurrUser?.email) {
        axiosPublic
          .get(`/users/role/${CurrUser.email}`)
          .then((res) => {
            setUserRole(res.data?.role);
            axiosPublic
              .post("/jwt", { email: CurrUser.email, role: res.data.role })
              .then((res) => {
                localStorage.setItem("access-token", res.data?.token);
                setLoading(false);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        setUserRole(null);
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  let authInfo = {
    user,
    setUser,
    loading,
    createAccount,
    signIn,
    LogOut,
    editProfile,
    resetPass,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
