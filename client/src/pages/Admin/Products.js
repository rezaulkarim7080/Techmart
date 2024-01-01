import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layouts/AdminMenu";

import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Products = () => {


  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("https://localhost-5000/api/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      {/* part 1 AdminMenu */}

      <div className="md:grid grid-cols-6  gap-10 p-10">
        <div className="col-span-2 mt-[50px]">
          <AdminMenu />
        </div>
        {/* part 2 BLANK */}
        {/* <div className="col-span-1"></div> */}

        {/* part 3 Products */}

        <div className="col-span-4 mt-3">
          <h3 className="text-center text-2xl font-semibold pb-5">All Products List</h3>
          <div className="flex flex-wrap justify-around gap-4 ">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className=""
              >
                <div className=" border-[1px] border-black p-5 hover:shadow-xl" style={{ width: "15rem" }}>

                  <img
                    src={p.photo}
                    alt={p.name}
                    className=""
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div className="">
                    <h5 className="font-semibold text-xl">{p.name.slice(0, 25)}</h5>
                    <p className="text-lg">{p.description.slice(0, 25)}</p>
                    <button className="btn-update"> Edit Product</button>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
