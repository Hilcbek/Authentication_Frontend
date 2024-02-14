import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useUpdate from "../Hooks/updateHook";
import { baseUrl } from "../../libs/axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { LOGOUT } from "../../Toolkit/userSlice";
import { motion as m } from "framer-motion";
const Header = () => {
  let { username, profile } = useSelector((state) => state.user);
  let updateReload = useUpdate();
  let dispatcher = useDispatch();
  let [open, setOpen] = useState(false);
  let handleLogout = async () => {
    try {
      let res = await baseUrl.post("/auth/signOut");
      if (res.data) {
        toast.success("logged out successfully!");
        dispatcher(LOGOUT({}));
        updateReload.setReload();
        <Navigate to={"/sign-in"} />;
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  let topBar = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      // backgroundColor: "rgba(255, 255, 255,1)",
    },
  };
  let centerBar = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  let bottomBar = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      // backgroundColor: "rgba(255, 255, 255,1)",
    },
  };
  return (
    <nav className="relative w-full py-2 flex items-center justify-between xs:px-4 sm:px-10 md:px-20 lg:px-24 xl:px-40 shadow-sm ring-black ring-b-1">
      <ul className="flex items-center justify-center">
        <li className="flex items-center justify-center">
          <Link
            to={"/"}
            className="md:text-xl font-Inter bg-gradient-to-r from bg-pink-500 from-emerald-500 text-transparent bg-clip-text"
          >
            Complete Auth
          </Link>
        </li>
      </ul>
      <ul className="hidden md:flex items-center justify-center gap-3">
        {updateReload.reload && username?.length > 0 ? (
          <div className="flex items-center justify-start gap-2">
            <Link
              to={"/"}
              className="flex items-center justify-center text-xs active:bg-black active:text-white p-2 rounded-md cursor-pointer transition duration-200 active:scale-[.9] border-solid border-gray-300 border-[1px]"
            >
              Home
            </Link>
            <Link
              to={"/about"}
              className="flex items-center justify-center text-xs active:bg-black active:text-white p-2 rounded-md cursor-pointer transition duration-200 active:scale-[.9] border-solid border-gray-300 border-[1px]"
            >
              About the developer
            </Link>
            <Link
              to={"/profile"}
              className="w-9 h-9 p-1 bg-gray-100 cursor-pointer active:scale-[.9] transition duration-300  rounded-full"
            >
              <img
                src={profile}
                className="w-full h-full rounded-full object-cover"
                alt=""
              />
            </Link>
            <p className="text-xs rounded-3xl bg-gray-100 p-1 border-solid border-[1px] border-gray-200">
              {username}
            </p>
            <button
              onClick={handleLogout}
              className="px-3 rounded-[5px] tracking-wider border-solid border-[1px] border-gray-300 active:scale-[.9] transition duration-200 ease-in-out text-xs font-medium p-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to={"/sign-up"}
              className="flex items-center justify-center text-xs active:bg-black active:text-white p-2 rounded-md cursor-pointer transition duration-200 active:scale-[.9] border-solid border-gray-300 border-[1px]"
            >
              Sign-In
            </Link>
            <Link
              to={"/sign-in"}
              className="flex items-center justify-center text-xs active:bg-black active:text-white p-2 rounded-md cursor-pointer transition duration-200 active:scale-[.9] border-solid border-gray-300 border-[1px]"
            >
              Sign-In
            </Link>
          </>
        )}
      </ul>
      <ul
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 md:hidden flex items-center z-[99999999999999] justify-center flex-col gap-[9.6px] transition duration-200"
      >
        <m.li
          variants={topBar}
          animate={open ? "opened" : "closed"}
          className="h-1 bg-black rounded-md w-10 origin-left"
        ></m.li>
        <m.li
          variants={centerBar}
          animate={open ? "opened" : "closed"}
          className="h-1 bg-black rounded-md w-10"
        ></m.li>
        <m.li
          variants={bottomBar}
          animate={open ? "opened" : "closed"}
          className="h-1 bg-black rounded-md w-10 origin-left"
        ></m.li>
      </ul>
      <ul
        className={`xs:w-10/12 sm:w-7/12 shadow-md shadow-black/60 h-full fixed top-0 bg-white ${
          open ? "right-0" : "right-[-110%]"
        } md:hidden flex items-start pt-32 justify-center transition-all z-[99999999] duration-300 ease-linear`}
      >
        {updateReload.reload && username?.length > 0 ? (
          <div className="flex items-center justify-start gap-2 flex-col w-full">
            <Link
              onClick={() => setOpen((prev) => !prev)}
              to={"/"}
              className="flex w-11/12 mx-auto items-center justify-center text-xs active:bg-black active:text-white p-4 rounded-md cursor-pointer transition duration-200 active:scale-[.9] border-solid border-gray-300 border-[1px]"
            >
              Home
            </Link>
            <Link
              onClick={() => setOpen((prev) => !prev)}
              to={"/about"}
              className="flex w-11/12 mx-auto items-center justify-center text-xs active:bg-black active:text-white p-4 rounded-md cursor-pointer transition duration-200 active:scale-[.9] border-solid border-gray-300 border-[1px]"
            >
              About the developer
            </Link>
            <Link
              onClick={() => setOpen((prev) => !prev)}
              to={"/profile"}
              className="w-9 h-9 p-1 bg-gray-100 cursor-pointer active:scale-[.9] transition duration-300  rounded-full"
            >
              <img
                src={profile}
                className="w-full h-full rounded-full object-cover"
                alt=""
              />
            </Link>
            <p className="text-xs w-11/12 text-center font-bold mx-auto rounded-3xl bg-gray-100 p-4 border-solid border-[1px] border-gray-200">
              {username}
            </p>
            <button
              onClick={() => {
                handleLogout();
                setOpen((prev) => !prev);
              }}
              className="px-3 rounded-[5px] w-11/12 mx-auto tracking-wider border-solid border-[1px] border-gray-300 active:scale-[.9] transition duration-200 ease-in-out text-xs font-medium p-4"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-start flex-col gap-2 w-11/12">
            <Link
              onClick={() => setOpen((prev) => !prev)}
              to={"/sign-up"}
              className="flex items-center w-11/12 mx-auto justify-center text-xs active:bg-black active:text-white p-4 rounded-md cursor-pointer transition duration-200 active:scale-[.9] border-solid border-gray-300 border-[1px]"
            >
              Sign-In
            </Link>
            <Link
              onClick={() => setOpen((prev) => !prev)}
              to={"/sign-in"}
              className="flex items-center w-11/12 mx-auto justify-center text-xs active:bg-black active:text-white p-4 rounded-md cursor-pointer transition duration-200 active:scale-[.9] border-solid border-gray-300 border-[1px]"
            >
              Sign-In
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Header;
