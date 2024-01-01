import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import UserMenu from './../../components/layouts/UserMenu';
import { toast } from "react-toastify";
import { MdOutlineVisibility } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //get user data
  useEffect(() => {
    const { email, name } = auth?.user;
    setName(name);
    setEmail(email);

  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://localhost:5000/api/profile", {
        name,
        email,
        password,

      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div >
      <div className="p-10">
        <div className="md:grid grid-cols-12 gap-10">
          <div className="col-span-5 mt-[50px]">
            <UserMenu />
          </div>

          <div className="col-span-7 md:mt-[10px] md:w-[600px]">

            {/* profile form  */}
            <div className="w-full max-w-md m-auto my-6 rounded-md ">
              <div>
                <div>
                  <h2 className="mb-3 text-3xl font-semibold text-center">
                    Update Profile
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
                      className="w-full px-3 py-2 border bg-slate-50 rounded-md text-black"
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
                      // onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border bg-slate-50 rounded-md text-black"
                    />
                  </div>
                  <div className="space-y-2 ">
                    <div className="flex justify-between">
                      <label className="text-sm">Change Password</label>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        name="password"
                        placeholder="enter new password"
                        className="w-full px-3 py-2 border bg-slate-50"
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
                  <button
                    type="submit"
                    value="Register"
                    className="w-full px-8 py-3 font-semibold rounded-md hover:bg-amber-600 bg-amber-500 text-white hover:shadow-2xl"
                  >
                    Update
                  </button>

                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
