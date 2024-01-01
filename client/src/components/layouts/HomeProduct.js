import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/cart';
import { useState } from 'react';

const HomeProduct = () => {

    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(1);








    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`https://localhost-5000/api/product-list/${page}`);
            // const { data } = await axios.get("https://localhost-5000/api/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);

        }
    };
    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);




    return (
        <div>
            <h1 className="text-4xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 py-10">Explore Our New Products</h1>
            <div className="flex flex-wrap justify-center gap-5">
                {products?.map((p) => (
                    <Link
                        key={p._id}

                        to={`/shop-page/product/${p.slug}`}
                        // to={``}
                        className="border-[1px] border-black rounded-xl hover:shadow-xl"
                    >
                        <div className="m-2" style={{ width: "18rem", height: "auto" }}>
                            <img
                                src={p.photo}
                                alt={p.name}

                            />
                            <div className="">
                                <h5 className="text-lg font-semibold py-1">{p.name.slice(0, 25)}</h5>
                                <h5 className="text-xl font-medium py-1">Price : ${p.price}</h5>


                            </div>
                            <div className='flex justify-around py-5'>
                                <button type="button" class="btn" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
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
                    </Link>
                ))}
            </div>
            {/* //////  LoadMore  // */}
            <div className="text-center py-3">
                <Link to={'/shop-page'}>
                    <button className=' bg-indigo-700 px-3 py-3 text-lg font-medium text-white rounded-lg ' >LoadMore</button>
                </Link>
            </div>
        </div>
    )
}

export default HomeProduct