import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";


const CategoryProduct = () => {


  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);



  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `https://techmart-api.vercel.app/api/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="flex flex-wrap justify-around px-[50px]">
              {products?.map((p) => (
                <div className="m-2 pb-5 bg-slate-100" key={p._id}>
                  <img
                    src={p.photo}
                    alt={p.name}
                    height="300"
                    width="300px"
                  />
                  <div className="px-2">
                    <div className="py-2 ">
                      <h5 className="text-xl font-semibold">{p.name.slice(0, 25)}</h5>
                      <h5 className="text-xl font-medium text-sky-700">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text py-2">
                      {p.description.slice(0, 30)}...
                    </p>
                    <div className="flex justify-evenly">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/shop-page/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button type="button" class="btn btn-primary" onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
