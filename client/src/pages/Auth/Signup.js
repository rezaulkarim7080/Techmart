import React, { useState, useEffect } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userImage, setUserImage] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name && !email && !userImage && !password) {
        setError("Fill All Details");
      } else if (!name) {
        setError("please Enter your Name");
      } else if (!email) {
        setError("please Enter your email");
      } else if (!userImage) {
        setError("please Enter your userImage");
      } else if (!password) {
        setError("please Enter your password");
      } else if (password.length < 5)
        setError("password need minimum 5 character");
      else {
        const res = await axios.post("https://techmart-api.vercel.app/api/register", {
          name,
          email,
          password,
          userImage,

        });
        if (res && res.data.success) {
          toast.success("registation success full");
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="h-screen">
        <div className="w-[80%] max-w-md m-auto my-6 rounded-md shadow-lg sm:p-8 bg-slate-50">
          <div>
            <div>
              <h2 className="mb-3 text-3xl font-semibold text-center">
                Create an account
              </h2>
            </div>
          </div>

          {/* Form here */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="space-y-2">
                <label className="block text-sm"> Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  value={name}
                  required
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm">Email </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div className="space-y-2 ">
                <div className="flex justify-between">
                  <label className="text-sm">Password</label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    name="password"
                    placeholder="password"
                    className="w-full px-3 py-2 border"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <AiOutlineEyeInvisible
                      className="absolute top-2 right-2"
                      size={25}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <MdOutlineVisibility
                      size={25}
                      className="absolute top-2 right-2"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm"> Image Url</label>
                <input
                  type="text"
                  name="userImage"
                  placeholder="Image Url"
                  id="userImage"
                  value={userImage}
                  onChange={(e) => setUserImage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <p className="py-3 text-xl">{error} </p>
              <div className="py-2">
                <button
                  type="submit"
                  value="Register"

                  className="w-full px-8 py-3 font-semibold rounded-md hover:bg-indigo-700  bg-indigo-600 text-white"
                >

                  Sign up
                </button>
              </div>
              <hr className="py-2" />

              <div className="flex justify-center items-center py-2">
                <p className="text-sm text-center">Already have an account?</p>
                <div className=" text-indigo-600 text-lg font-semibold focus:underline hover:underline">
                  <Link to="/login">Login</Link>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
