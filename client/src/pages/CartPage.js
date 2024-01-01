import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";


const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Calculate total item count
  const totalItems = () => {
    let count = 0;
    cart?.forEach((item) => {
      count += 1; // Assuming each unique item has a quantity of 1
    });
    return count;
  };
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("https://techmart-api.vercel.app/api/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments


  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("https://techmart-api.vercel.app/api/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);////// for empty cart langth 
      navigate("/");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12 bg-slate-50 py-5">
            <h1 className="text-center p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                  }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>

        {/* /////////////////////////////    */}

        <div className="container ">
          <div className="grid grid-cols-12 p-[50px] gap-10">
            <div className="col-span-7 ">
              {cart?.map((p) => (
                <div className="flex flex-row items-center justify-evenly border-[1px] border-black my-2" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={p.photo}
                      alt={p.name}
                      width="100px"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <h1 className="text-lg font-medium">{p.name}</h1>
                    {/* <p>{p.description}</p> */}

                    <h1 className="text-lg font-medium text-indigo-700">Price : ${p.price}.00</h1>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>


            {/* //////////  Total | Checkout | Payment  ///////// */}


            <div className="col-span-5 flex flex-col  justify-center text-left">
              <h2 className="text-2xl font-medium py-2">Cart Summary</h2>
              <h1 className="text-2xl font-medium py-2">Total | Checkout | Payment</h1>
              <hr />
              <h4 className="text-2xl font-bold py-2">Total Items : {totalItems()} </h4>
              <h4 className="text-2xl font-bold py-2">Total : {totalPrice()} </h4>
              {auth?.user?.name ? (
                <>
                  <div className="mb-3">
                    <h4 className="py-2">Current User Email</h4>
                    <h5 className="py-2 text-lg">{auth?.user?.email}</h5>
                    <button
                      className="btn "
                      onClick={() => navigate("/user-dashboard/user/profile")}
                    // onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Email
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/user-dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}


              {/* ///////////////////  */}



              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.name}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
