import React, { Profiler, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../libs/axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../Toolkit/userSlice";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase/firebase";
const SignIn = () => {
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState({
    username: "",
    password: "",
  });
  let dispatcher = useDispatch();
  let navigate = useNavigate();
  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let { username, password } = data;
      let res = await baseUrl.post("/auth/sign-in", {
        username,
        password,
      });
      if (res.data) {
        setData({ username: "", password: "" });
        dispatcher(
          LOGIN({
            id : res.data.data._id,
            username: res.data.data.username,
            profile: res.data.data.image,
            email : res.data.data.email
          })
        );
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
    let HandleGoogleAuth = async (e) => {
      e.preventDefault();
      try {
        setLoading(true)
        let googleProvider = new GoogleAuthProvider();
        let auth = getAuth(app);
        let result = await signInWithPopup(auth, googleProvider);
        let res = await baseUrl.post("/auth/google-sign-in", {
          username: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL,
        });
        dispatcher(
          LOGIN({
            id: res.data.data._id,
            username: res.data.data.username,
            profile: res.data.data.image,
            email: res.data.data.email,
          })
        );
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false)
      }
    };
  return (
    <div className="w-full pt-32 h-full flex items-center justify-center">
      <div className="shadow-md shadow-gray-20 rounded-md p-4 xs:w-10/12 sm:w-9/12 md:w-7/12 lg:5/12 xl:w-3/12 mx-auto flex items-center justify-center flex-col">
        <h1 className="text-gray-900 mb-5 font-semibold text-2xl tracking-wider">
          Sign In
        </h1>
        <form
          action=""
          className="flex items-start justify-start flex-col w-full text-[11px] gap-4"
        >
          <div className="flex items-start w-11/12 mx-auto justify-start flex-col relative">
            <input
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="p-3 rounded-md w-full border-solid border-gray-200 outline-none border-[1px] peer"
              type="text"
              id="username"
            />
            <label
              className="absolute transform translate-y-0 peer-focus:-translate-y-2 transition-all duration-200 ease-in-out bg-white peer-focus:scale-[.9] scale-100 top-0 left-2"
              htmlFor="username"
            >
              Username
            </label>
          </div>
          <div className="flex items-start w-11/12 mx-auto justify-start flex-col relative">
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="p-3 rounded-md w-full border-solid border-gray-200 outline-none border-[1px] peer"
              type="text"
              id="password"
            />
            <label
              className="absolute transform translate-y-0 peer-focus:-translate-y-2 transition-all duration-200 ease-in-out bg-white peer-focus:scale-[.9] scale-100 top-0 left-2"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`${
              loading ? "bg-black/70" : "bg-black"
            } p-3 rounded-md text-white w-11/12 mx-auto flex items-center justify-center active:scale-[.98] scale-[1] transition-all duration-200 cursor-pointer`}
          >
            {loading ? (
              <>
                <ClipLoader
                  color={"#fff"}
                  loading={loading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <span className="ml-2">Signing...</span>
              </>
            ) : (
              "Sign-in"
            )}
          </button>
          <button
            onClick={HandleGoogleAuth}
            className="w-11/12 active:scale-[.98] transition duration-300 ease-in-out mx-auto flex items-center justify-center gap-3 ring-1 ring-black rounded-md p-2"
          >
            <FcGoogle size={24} />
            <span className="md:text-md">Continue with Google</span>
          </button>
        </form>
        <div className="flex items-center justify-center text-[12px] gap-3 mt-3 text-gray-700 font-medium">
          <span>Don't have an account?</span>
          <Link className="text-sky-600" to={"/sign-up"}>
            Sign-Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
