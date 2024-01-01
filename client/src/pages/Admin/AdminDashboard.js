import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import { useAuth } from "../../context/auth";


const AdminDashboard = () => {
  const [auth] = useAuth();


  return (
    <div>
      <div className=" ">
        <div className="md:grid grid-cols-6 gap-10 p-10">
          <div className="col-span-2 md:mt-[50px]">
            <AdminMenu />
          </div> <div className="col-span-1"></div>
          <div className="col-span-2 mt-[100px] ">
            <img src={auth?.user?.userImage} alt={auth?.user?.name} className="md:w-[250px] rounded-full" />
            <h3 className="text-lg font-medium py-2"> Admin Name : {auth?.user?.name}</h3>
            <h3 className="text-lg font-medium py-1"> Admin Email : {auth?.user?.email}</h3>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
