import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;


const UpdateUser = () => {
    const navigate = useNavigate();
    const params = useParams();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [userImage, setUserImage] = useState("");
    const [id, setId] = useState("");

    //get single product

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `https://techmart-api.vercel.app/api/user/${params.id}`
            );
            setId(data.user._id);
            setName(data.user.name);
            setId(data.user.userImage);
            setEmail(data.user.email);
            setRole(data.user.role);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);


    //Update User function

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`https://techmart-api.vercel.app/api/user/${id}`, {
                userImage,
                name,
                email,
                role,

            });
            if (res && res.data.success) {
                toast.success("Product Created Successfully");
                navigate("/admin-dashboard/users");
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

            const { data } = await axios.delete(
                `https://techmart-api.vercel.app/api/user/${id}`
            );
            toast.success("user DEleted Succfully");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };



    ///////// 

    return (
        <div>
            <div className="container-fluid m-3 p-3">
                <div className="md:grid grid-cols-6 gap-10">
                    <div className="col-span-2 mt-[150px]">
                        <AdminMenu />
                    </div><div className="col-span-1"></div>
                    <div className="col-span-2 mt-[100px]">
                        <h1>Update user</h1>
                        <div className="m-1 w-75">


                            <div className="mb-3">

                                <div className="text-center">
                                    <img
                                        src={userImage}
                                        alt="product_photo"
                                        height={"200px"}
                                        className=""
                                    />
                                </div>

                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={userImage}
                                    placeholder="Image Link"
                                    className="form-control"
                                    onChange={(e) => setUserImage(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={email}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Role "
                                    size="large"
                                    // showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setRole(value);
                                    }}
                                >
                                    <Option value="0">user</Option>
                                    <Option value="1">Admin</Option>
                                </Select>
                                {/* <input
                                    type="text"
                                    value={role}
                                    placeholder="write a role"
                                    className="form-control"
                                    onChange={(e) => setRole(e.target.value)}
                                /> */}
                            </div>

                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
