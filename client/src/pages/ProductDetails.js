import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";


const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [products, setProducts] = useState([]);


  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://techmart-api.vercel.app/api/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://techmart-api.vercel.app/api/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="">
      <div className="grid md:grid-cols-2 p-[50px]">
        <div className="col-span-1 flex justify-center">
          <img
            src={product.photo}
            alt={product.name}
            height="300"
            width="300px"
          />
        </div>
        <div className="col-span-1">
          <h1 className="text-center text-3xl font-semibold py-3">Product Details</h1>
          <hr className="py-2" />
          <h6 className=" text-lg font-medium py-1">Name : {product.name}</h6>
          <h6 className=" text-lg font-normal py-1">Description : {product.description}</h6>
          <h6 className="text-indigo-600 text-lg font-medium py-1">
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6 className=" text-lg font-medium py-1">Category : {product?.category?.name}</h6>


          {/* <button class="btn py-3">ADD TO CART</button> */}

          <button
            className="btn py-3"
            onClick={() => {
              if (!cart.some((item) => item._id === product._id)) {
                setCart([...cart, product]);
                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                toast.success("Item Added to cart");
                navigate("/cart");
              } else {
                toast.warning("Item is already in the cart");
              }
            }}
          >
            ADD TO CART
          </button>




          {/* ////////////////ADD TO CART */}

        </div>
      </div>
      <hr />
      <div className="row container similar-products">


        {/* Similar Products  */}

        <h4 className="text-center text-2xl font-medium">Similar Products </h4>

        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="flex flex-wrap  px-[50px] py-10">
          {relatedProducts?.map((p) => (
            <div className="m-2 bg-slate-50 border-[1px] border-black hover:shadow-lg" key={p._id}>
              <img
                src={p.photo}
                alt={p.name}
                height="300"
                width="300px"
              />
              <div className="card-body p-5">
                <div className="card-name-price">
                  <h5 className="text-xl font-semibold">{p.name.slice(0, 25)}...</h5>
                  <h5 className="text-xl font-medium text-indigo-600">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <div className="flex justify-evenly py-1">
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
      </div>
    </div>
  );
};

export default ProductDetails;
