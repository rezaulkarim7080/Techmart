import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space } from 'antd';
import { useCart } from '../../context/cart';
import useCategory from '../../hooks/useCategory';
import SearchInput from './../Form/SearchInput';



const Header = () => {

    const [nav, setNav] = useState(false);

    const [cart] = useCart();
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        // navigate('/login')
        toast.success("Logout Successfully");
    };


    const handlenav = () => {
        setNav(!nav);
    };
    const closeNav = () => {
        setNav(false);
    };



    return (
        <div className=" flex justify-between items-center h-20 max-w-[100%] 
   mx-auto px-5 bg-slate-800 text-slate-100">
            <Link to={"/"} onClick={closeNav}>

                <h1 className="width-full text-4xl font-bold text-white">
                    TechMart
                </h1>
            </Link>

            <ul className="hidden md:flex items-center text-lg ">
                <SearchInput />
                <Link to={'/'} onClick={closeNav}>
                    <li className="p-4 pl-10 hover:text-indigo-700">Home</li>
                </Link>
                <Link to={'/shop-page'} onClick={closeNav}>
                    <li className="p-4 hover:text-indigo-700">Shop</li>
                </Link>



                {/* ///////////   */}

                <Link to={'/cart'} onClick={closeNav}>
                    <li className="p-4 hover:text-indigo-700">Cart <span className='bg-indigo-700 text-white rounded-full px-2 py-1'>{cart?.length}</span></li>
                </Link>

                {/* /////////////////  */}
                {

                    !auth.user ? (<> <Link to='/register' className='btn' >Login</Link>
                    </>)
                        : (auth.user.role === 0 ?
                            (<>
                                <div className='flex justify-around items-center gap-4'>
                                    <Link to='' onClick={closeNav}>

                                        <img src={auth.user.userImage} alt={auth.user.name} className='w-[50px] rounded-full' />
                                    </Link>

                                    <Link to='/user-dashboard' className='btn' onClick={closeNav}>Dashboard</Link>
                                    <Link to='/' onClick={handleLogout} >
                                        <button className='btn'>Logout</button>
                                    </Link>

                                </div>

                            </>)
                            :
                            (<>

                                <div className='flex justify-around items-center gap-4'>
                                    <Link to='' onClick={closeNav}>

                                        <img src={auth.user.userImage} alt={auth.user.name} className='w-[55px] h-[55px] rounded-full' />
                                    </Link>
                                    <Link to='/admin-dashboard' className='btn' onClick={closeNav}>Dashboard</Link>
                                    <Link to='/' onClick={handleLogout} >
                                        <button className='btn'>Logout</button>
                                    </Link>
                                </div>
                            </>)

                        )
                }
                {/* //////////////////////  */}


            </ul>



            {/* Reaponsive */}

            <div onClick={handlenav} className="block md:hidden">
                {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}

            </div>
            <div className={nav ? 'fixed left-0 top-0 w-[80%] z-50 h-full bg-slate-800 ease-out duration-500' : 'fixed left-[-100%] z-50'}>
                <ul className="pt-24 flex flex-col justify-center  items-center">

                    <SearchInput />
                    <Link to={'/'} onClick={closeNav}>
                        <li className="p-4  hover:text-indigo-700 text-center w-full border-b 
              border-b-[#ffffff]">Home</li>
                    </Link>
                    <Link to={'/shop-page'} onClick={closeNav}>
                        <li className="p-4 hover:text-indigo-700 text-center border-b 
              border-b-[#ffffff]">Shop</li>
                    </Link>
                    <Link to={'/cart'} onClick={closeNav}>
                        <li className="p-4 hover:text-indigo-700">Cart <span className='bg-indigo-700 text-white rounded-full px-2 py-1'>{cart?.length}</span></li>
                    </Link>
                    {

                        !auth.user ? (<> <Link to='/register' className='btn' onClick={closeNav}>Login</Link>
                        </>)
                            : (auth.user.role === 0 ?
                                (<>
                                    <div className='flex flex-col items-center gap-4'>
                                        <Link to='' onClick={closeNav}>

                                            <img src={auth.user.userImage} alt={auth.user.name} className='w-[50px] rounded-full' />
                                        </Link>

                                        <Link to='/user-dashboard' className='btn' onClick={closeNav}>Dashboard</Link>
                                        <Link to='/' onClick={handleLogout}>
                                            <button className='btn' onClick={closeNav}>Logout</button>
                                        </Link>

                                    </div>

                                </>)
                                :
                                (<>

                                    <div className='flex flex-col items-center gap-4'>
                                        <Link to='' onClick={closeNav}>

                                            <img src={auth.user.userImage} alt={auth.user.name} className='w-[55px] h-[55px] rounded-full' />
                                        </Link>
                                        <Link to='/admin-dashboard' className='btn' onClick={closeNav}>Dashboard</Link>
                                        <Link to='/' onClick={closeNav}>
                                            <button className='btn' onClick={handleLogout}>Logout</button>
                                        </Link>
                                    </div>
                                </>)

                            )
                    }
                    {/* <Link to={'/login'}>
                        <li className="p-4 text-center border-b 
                 border-b-[#ffffff]">Login</li>
                    </Link> */}
                </ul>
            </div>
        </div >
    )
}

export default Header
