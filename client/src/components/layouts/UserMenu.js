import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <h1 className="text-2xl font-medium text-center py-5">User Deshboard</h1>
      <div className="text-center bg-slate-50 ">
        <div className="flex flex-col gap-2">
          {/* <h4  className="font-semibold text-2xl border-[1px] rounded-lg border-black p-3 hover:shadow-2xl">Dashboard</h4> */}
          <NavLink
            to="/user-dashboard"
            className="font-semibold text-2xl border-[1px] rounded-lg border-black p-3 hover:shadow-2xl"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/user-dashboard/user/profile"
            className="font-semibold text-2xl border-[1px] rounded-lg border-black p-3 hover:shadow-2xl"
          >
            Profile
          </NavLink>
          <NavLink
            to="/user-dashboard/user/orders"
            className="font-semibold text-2xl border-[1px] rounded-lg border-black p-3 hover:shadow-2xl"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
