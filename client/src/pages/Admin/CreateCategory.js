import React, { useEffect, useState } from "react";
import AdminMenu from "./../../components/layouts/AdminMenu";
import axios from "axios";


import { Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";
import { toast } from "react-toastify";



const CreateCategory = () => {


  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const clear = () => {
    setName("")

  }

  //handle Form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://localhost-5000/api/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      clear();
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  //get all cat

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://localhost-5000/api/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://localhost-5000/api/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
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
        `https://localhost-5000/api/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
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

          <div className="col-span-2 md:mt-[50px]">
            <AdminMenu />
          </div><div className="col-span-1"></div>

          <div className="col-span-2 mt-[20px]">
            {/* <h1>Manage Category</h1> */}
            <h1 className="text-center text-2xl font-semibold py-2">Create Category</h1>
            <div className="p-5 w-50 bg-slate-100 rounded-lg">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}

              />
            </div>
            <div className="w-75">
              <table className="table ">
                <thead className="py-2">
                  <tr className="text-2xl font-medium ">
                    <th scope="col ">Name</th>
                    <th scope="col ">Edit </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id} className="text-2xl font-semibold">{c.name}</td>
                        <td>
                          <button
                            className="hover:bg-amber-600 bg-amber-500 px-4 py-2 text-center font-medium text-white rounded-md border border-transparent ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-del ms-2"
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
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
