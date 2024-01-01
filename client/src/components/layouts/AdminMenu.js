import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center  ">
        <h4 className="font-bold text-3xl text-center ">Admin Panel</h4>
        <div className="flex flex-col gap-2">

          <NavLink
            to="/admin-dashboard"
            className="font-semibold text-2xl border-[1px] rounded-lg border-black p-3 hover:shadow-md"
          >
            Admin
          </NavLink>
          <NavLink
            to="/admin-dashboard/create-category"
            className="font-semibold text-2xl border-[1px] rounded-lg border-black p-3 hover:shadow-md"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/admin-dashboard/create-product"
            className="font-semibold text-2xl border-[1px] rounded-lg border-black p-3 hover:shadow-md"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/admin-dashboard/products"
            className="font-semibold text-2xl border-[1px] rounded-lg border-black p-3 hover:shadow-md"
          >
            Products
          </NavLink>
          <NavLink
            to="/admin-dashboard/orders"
            className="font-semibold text-2xl border-[1px] rounded-lg border-black p-3 hover:shadow-md"
          >
            Orders
          </NavLink>
          <NavLink
            to="/admin-dashboard/users"
            className="font-semibold text-2xl border-[1px] rounded-lg border-black p-3 hover:shadow-md"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
