import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from "../context/cart";
import axios from 'axios';
import { Button, Checkbox, Radio } from "antd";
import { Prices } from './../components/Prices';




const ShopPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);




    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:5000/api/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };






    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/get-category");
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
        getTotal();
    }, []);

    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/product-list/${page}`);
            // const { data } = await axios.get("http://localhost:5000/api/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);

        }
    };
    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);



    // filter by catagory

    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };


    useEffect(() => {
        if (!checked.length && !radio.length) {
            getAllProducts();
        } else {
            filterProduct();
        }
    }, [checked, radio]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product

    const filterProduct = async () => {
        try {
            const { data } = await axios.post("http://localhost:5000/api/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };


    //////////////// 

    return (
        <div className="px-5 py-5">
            <div className='md:grid grid-cols-12 mt-3'>
                {/* part 1 */}
                <div className='col-span-3 '>
                    <h3 className='text-3xl font-medium py-2 mt-5'>Filter by catagory</h3>
                    {/* catagory Filters */}

                    <div className="flex flex-col py-2 ">
                        {categories?.map((c) => (
                            <Checkbox className='text-2xl '
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>

                    {/* price filter */}

                    <h4 className="text-3xl font-medium  mt-4 py-2">Filter By Price</h4>

                    <div className="flex flex-col py-2 ">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)} className=''>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array} className='text-xl py-1'>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="flex flex-col py-2">
                        <button
                            className="btn"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>

                {/* part 2 */}


                <div className='col-span-9'>

                    <div className='flex justify-evenly items-center py-5'>
                        <h3 className='text-3xl font-medium  text-center'>All Products List</h3>
                        {/* <h3 className=' font-medium text-end'>Total Product {total}</h3> */}
                    </div>




                    <div className="flex flex-wrap justify-around gap-2">
                        {products?.map((p) => (
                            <Link
                                key={p._id}

                                to={`product/${p.slug}`}
                                // to={``}
                                className="border-[1px] border-black rounded-xl hover:shadow-2xl"
                            >
                                <div className=" m-2" style={{ width: "18rem", height: "auto" }}>
                                    <img
                                        src={p.photo}
                                        alt={p.name}
                                        className="card-img-top"
                                    // style={{ width: "100%", height: "auto" }}
                                    />
                                    <div className="px-2">
                                        <h5 className="text-lg font-medium ">{p.name.slice(0, 25)}</h5>
                                        <h5 className="text-lg font-bold text-sky-700">${p.price}</h5>


                                    </div>
                                    <div className='flex justify-around py-2'>
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
                    <div className="text-center  py-5">
                        {
                            products && products.length < total && (<button className='btn ' onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}> {
                                    loading ? "Loading.." : "LoadMore"
                                }</button>)

                        }
                    </div>
                </div>


            </div>

        </div>
    )
}

export default ShopPage