import React, { useState, useEffect } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {

  const [auth, setAuth] = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email && !password) {
        setError("Fill All Details");
      } else if (!email) {
        setError("please Enter your email");
      } else if (!password) {
        setError("please Enter your password");
      } else if (password.length < 5)
        setError("password need minimum 5 character");
      else {
        const res = await axios.post("https://techmart-api.vercel.app/api/login", {
          email,
          password,
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
          // navigate("/");
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
        <div className="w-[80%]  max-w-md m-auto my-6 rounded-md shadow-lg sm:p-8 bg-slate-50">
          <div>
            <div>
              <h2 className="mb-3 text-3xl font-semibold text-center">
                Login account
              </h2>
            </div>
          </div>

          {/* Form here */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
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

              <p className="py-2 text-lg text-red-600">{error} </p>

              <div className="py-2">
                <button
                  type="submit"
                  value="Register"
                  className="w-full px-8 py-3 font-semibold rounded-md  bg-indigo-600 text-white"
                >
                  Login
                </button>
              </div>
              <hr className="py-2" />
              <div className="mb-3">
                <button
                  type="button"
                  className="w-full px-8 py-3 font-semibold rounded-md  bg-indigo-600 text-white"
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Forgot Password
                </button>
              </div>


              <div className="flex justify-center items-center">
                <p className="text-sm text-center">Already have an account?</p>
                <div className=" text-indigo-600 text-lg font-semibold  focus:underline hover:underline">
                  <Link to="/register">Signup</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
