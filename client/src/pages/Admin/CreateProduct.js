import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
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

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost-5000/api/create-product", {
        name,
        description,
        price,
        quantity,
        photo,
        category,

      });
      if (res && res.data.success) {
        toast.success("Product Created Successfully");
        navigate("/admin-dashboard/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

  };

  return (
    <div >
      <div className="">
        <div className="md:grid grid-cols-6 gap-10 p-10">
          <div className="col-span-2 mt-[50px]">
            <AdminMenu />
          </div><div className="col-span-1"></div>
          <div className="col-span-2 mt-[10px]  rounded-3xl shadow-xl p-5 md:w-[500px]">
            <h1 className="text-center text-2xl font-semibold pb-5">Create Product</h1>
            <div className="m-1 w-full">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="bg-slate-50 mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="w-[100%] p-3 bg-slate-50"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={photo}
                  placeholder="Image Link"
                  className="w-[100%] p-3 bg-slate-50"
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="w-[100%] p-3 bg-slate-50"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="w-[100%] p-3 bg-slate-50"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="w-[100%] p-3 bg-slate-50"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="bg-slate-50 mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
