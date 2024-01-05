import React, { useEffect, useState } from "react";
import AdminMenu from "./../../components/layouts/AdminMenu";
import axios from "axios";
import { Modal } from "antd";
import { toast } from "react-toastify";
import CustomUserForm from "../../components/Form/CustomUserForm";



const Users = () => {


  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userImage, setUserImage] = useState("");

  ////// updated 
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");
  const [updatedUserImage, setUpdatedUserImage] = useState("");



  //get all cat

  const UserControlller = async () => {
    try {
      const { data } = await axios.get("https://techmart-api.vercel.app/api/users");
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting user");
    }
  };

  useEffect(() => {
    UserControlller();
  }, []);


  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://techmart-api.vercel.app/api/user/${selected._id}`,
        { name: updatedName, email: updatedEmail, role: updatedRole, userImage: updatedUserImage }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setUpdatedEmail("");
        setUpdatedRole("");
        setUpdatedUserImage("");
        setVisible(false);
        UserControlller();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://techmart-api.vercel.app/api/user/${pId}`
      );
      if (data.success) {
        toast.success(`user is deleted`);

        UserControlller();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <div >
      <div >
        <div className="md:grid grid-cols-6  gap-10 p-10">
          <div className="col-span-2 mt-[50px]">
            <AdminMenu />
          </div>
          {/* <div className="col-span-1"></div> */}
          <div className="col-span-2 mt-[20px] md:w-[800px]">
            <h1 className="text-center font-semibold text-2xl py-2">All Users</h1>
            <table className="w-[100%] text-center">
              <thead>
                <tr className="flex justify-evenly items-center ">
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Edit Button</th>
                </tr>
              </thead>
              <tbody className="">
                {users?.map((c) => (
                  <>
                    <tr key={c._id} className=" hover:shadow-2xl flex justify-evenly items-center p-4 ">
                      <img src={c.userImage} alt={c.name} className=" w-[75px] h-[75px] rounded-full" />
                      <td >{c.name}</td>
                      <td >{c.email}</td>
                      {/* <td >{c.role}</td> */}

                      <td > {c.role === 0 ? (<h1 className="text-orange-600 font-medium text-lg">User</h1>) : (<h1 className="text-emerald-500 font-bold text-lg">Admin</h1>)} </td>
                      <td className=" flex flex-row gap-1 items-center justify-center">
                        <button
                          className="btn-update "
                          onClick={() => {
                            setVisible(true);
                            setUpdatedUserImage(c.userImage);
                            setUpdatedName(c.name);
                            setUpdatedEmail(c.email);
                            setUpdatedRole(c.role);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-del "
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>

            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CustomUserForm
                // value={updatedName}
                // setValue={setUpdatedName}
                name={updatedName}
                setName={setUpdatedName}
                email={updatedEmail}
                setEmail={setEmail}
                role={updatedRole}
                setRole={setUpdatedRole}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
