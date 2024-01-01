import React, { useState, useEffect } from "react";
import UserMenu from './../../components/layouts/UserMenu';

import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();


  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://localhost-5000/api/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);


  return (
    <div title={"Your Orders"}>
      <div className="p-10">
        <div className="md:grid grid-cols-12 gap-10 ">
          <div className="col-span-5 mt-[50px]">
            <UserMenu />
          </div>

          <div className="col-span-7 mt-[10px] ">
            <h1 className="text-center text-2xl font-semibold py-5 ">All Orders</h1>
            {
              orders.length === 0 ? (<div className="text-center"><Link to={'/shop-page'} className="btn">Shop Now</Link></div>) : (<>
                {orders?.map((o, i) => {
                  return (
                    <div className="border-[1px] border-black py-2 flex flex-col items-center">
                      <table className="table  w-[600px]" >

                        {/* table head   */}
                        <thead >
                          <tr >
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col"> date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>

                        {/* table body   */}
                        <tbody >
                          <tr className="">
                            <td>{i + 1}</td>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createAt).fromNow()}</td>
                            {o?.payment.success ? (<h5 className="text-lg font-semibold text-emerald-600 text-center" >Success</h5>) : (<h5 className="text-lg font-semibold text-red-600 text-center">Faild</h5>)}
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="container ">
                        {o?.products?.map((p, i) => (
                          <div className="row mb-2 p-3 card flex-row" key={p._id}>
                            <div className="col-md-4">
                              <img
                                src={p.photo}
                                className="card-img-top"
                                alt={p.name}
                                width="100px"
                                height={"100px"}
                              />
                            </div>
                            <div className="col-md-8">
                              <p>{p.name}</p>
                              <p>{p.description.substring(0, 30)}</p>
                              <p>Price : {p.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>)
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
