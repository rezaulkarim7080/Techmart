import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;


const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://localhost-5000/api/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setPhoto(data.product.photo);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
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

  //Update product function

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://localhost-5000/api/update-product/${id}`, {
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


  //delete a product

  const handleDelete = async () => {
    try {
      // let answer = window.prompt("Are You Sure want to delete this product ? ");
      // if (!answer) return;
      const { data } = await axios.delete(
        `https://localhost-5000/api/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/admin-dashboard/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div >
      <div className="container-fluid m-3 p-3">
        <h1 className="text-center text-2xl font-semibold py-2">Update Product</h1>
        <div className="md:grid md:grid-cols-6 md:gap-10">
          <div className="col-span-2 mt-[50px]">
            <AdminMenu />
          </div>
          {/* <div className="col-span-1"></div> */}
          <div className="col-span-2 mt-[20px]">

            <div className="md:grid md:grid-cols-12 items-center md:w-[800px] bg-slate-50 shadow-xl rounded-2xl p-5">

              {/* informations  */}
              <div className="md:col-span-8">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="bg-white mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
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
                    className="w-[100%] p-3 bg-white"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={photo}
                    placeholder="Image Link"
                    className="w-[100%] p-3 bg-white"
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="write a description"
                    className="w-[100%] p-3 bg-white"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="write a Price"
                    className="w-[100%] p-3 bg-white"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="write a quantity"
                    className="w-[100%] p-3 bg-white"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="w-[100%] p-3 bg-white"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "yes" : "No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn-update" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn-del btn-danger" onClick={handleDelete}>
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
              {/* image  */}
              <div className="md:col-span-4">
                <div className="mb-3">

                  <div className="text-center">
                    <img
                      src={photo}
                      alt="product_photo"
                      height={"400px"}

                    />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
