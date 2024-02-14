import React, { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase/firebase";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../libs/axios";
import { DELETE, LOGOUT, UPDATE } from "../../Toolkit/userSlice";
import useUpdate from "../Hooks/updateHook";
const Profile = () => {
  let [loading, setLoading] = useState(false);
  let { username, email, profile, id } = useSelector((state) => state.user);
  let imageRef = useRef();
  let [imagePercentage, setImagePercentage] = useState(null);
  let update = useUpdate();
  let dispatcher = useDispatch();
  let [data, setData] = useState({
    username: username,
    email: email,
    profile: profile,
  });
  let [image, setImage] = useState(undefined);
  let handleFileUpload = (image) => {
    try {
      setLoading(true);
      let storage = getStorage(app);
      let FileName = new Date().getTime() + image.name;
      let storageRef = ref(storage, FileName);
      let uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          let progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setImagePercentage(Math.round(progress));
        },
        (error) => {
          toast.error("Image size must be less 5 MB");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            setData({ ...data, profile: downloadUrl })
          );
        }
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setImagePercentage(null);
      }, 300);
    }
  };
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  let UpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await baseUrl.put(`/auth/update/${id}`, {
        username: data.username,
        email: data.email,
        profile: data.profile,
      });
      if (res.data) {
        dispatcher(
          UPDATE({
            username: res.data.data.username,
            email: res.data.data.email,
            profile: res.data.data.image,
          })
        );
        update.setReload();
        toast.success("Updated successfully!");
      }
    } catch (error) {
      toast(error.response.data.error);
    } finally {
      setLoading(false);
      setImagePercentage(null);
    }
  };

  let handleDelete = async () => {
    try {
      let res = await baseUrl.delete(`/auth/delete/${id}`);
      if (res.data) {
        dispatcher(DELETE({}));
        <Navigate to={'/sign-in'} />
        update.setReload();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  let handleLogout = async () => {
    try {
      let res = await baseUrl.post("/auth/signOut");
      if(res.data){
        toast.success('logged out successfully!');
        dispatcher(LOGOUT({}));
        update.setReload();
        <Navigate to={'/sign-in'} />
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  return (
    <div className="w-full pt-32 h-full flex items-center justify-center">
      <div className="shadow-md shadow-gray-20 rounded-md p-4 xs:w-10/12 sm:w-9/12 md:w-7/12 lg:5/12 xl:w-3/12 mx-auto flex items-center justify-center flex-col">
        <h1 className="text-gray-900 mb-5 font-semibold text-2xl tracking-wider">
          Update
        </h1>
        {imagePercentage &&
          (imagePercentage > 0 && imagePercentage < 100 ? (
            <p className="my-2 text-xs font-semibold text-sky-500 font-Inter">
              uploading in progress {imagePercentage}%
            </p>
          ) : (
            <p>Your profile uploaded successfully!</p>
          ))}
        <form
          action=""
          className="flex items-start justify-start flex-col w-full text-[11px] gap-4"
        >
          <input
            type="file"
            name=""
            id=""
            ref={imageRef}
            onChange={(e) => setImage(e.target.files[0])}
            hidden
            accept="images/*"
          />
          <div
            onClick={() => imageRef.current.click()}
            className="w-14 h-14 active:scale-[.9] transition duration-300 cursor-pointer rounded-full mx-auto p-1 bg-gray-100"
          >
            <img
              src={profile}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex items-start w-11/12 mx-auto justify-start flex-col relative">
            <input
              value={data.username}
              defaultValue={username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="p-3 rounded-md w-full border-solid border-gray-200 outline-none border-[1px] peer"
              type="text"
              id="username"
            />
            <label
              className="absolute transform translate-y-0 peer-focus:-translate-y-2 transition-all duration-200 ease-in-out bg-white peer-focus:scale-[.9] scale-100 top-0 left-2"
              htmlFor="username"
            >
              Update username
            </label>
          </div>
          <div className="flex items-start w-11/12 mx-auto justify-start flex-col relative">
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="p-3 rounded-md w-full border-solid border-gray-200 outline-none border-[1px] peer"
              type="text"
              id="email"
              defaultValue={email}
            />
            <label
              className="absolute transform translate-y-0 peer-focus:-translate-y-2 transition-all duration-200 ease-in-out bg-white peer-focus:scale-[.9] scale-100 top-0 left-2"
              htmlFor="email"
            >
              Update email-Address
            </label>
          </div>
          <button
            disabled={loading}
            onClick={UpdateProfile}
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
                <span className="ml-2">Updating...</span>
              </>
            ) : (
              "Update"
            )}
          </button>
        </form>
        <div className="w-11/12 mx-auto flex items-center justify-between  my-4 text-xs">
          <button
            onClick={handleDelete}
            className="p-3 bg-rose-500 text-white rounded-md cursor-pointer active:scale-[.96] transition duration-300 ease-in-out"
          >
            Delete Account
          </button>
          <button
            onClick={handleLogout}
            className="p-3 rounded-md bg-gray-700 text-white active:scale-[.97] transition duration-300 ease-in-out"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
