
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/layouts/Header';
import ShopPage from './pages/ShopPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPasssword from './pages/Auth/ForgotPasssword';
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './pages/user/Dashboard';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import UpdateProduct from './pages/Admin/UpdateProduct';
import CreateProduct from './pages/Admin/CreateProduct';
import Products from './pages/Admin/Products';
import Users from './pages/Admin/Users';
import AdminOrders from './pages/Admin/AdminOrders';
import ProductDetails from './pages/ProductDetails';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import Categories from './pages/Categories';
import Search from './pages/Search';
import UpdateUser from './pages/Admin/UpdateUser';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';






function App() {

  return (
    <div >
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={1000} />
        <Header />
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/shop-page' element={<ShopPage />} />
          <Route path='/search' element={<Search />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/category/:slug' element={<CategoryProduct />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path="/shop-page/product/:slug" element={<ProductDetails />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPasssword />} />

          {/* //user  */}

          <Route element={<PrivateRoute />}>
            <Route path='/user-dashboard' element={<Dashboard />} />
            <Route path='/user-dashboard/user/orders' element={<Orders />} />
            <Route path='/user-dashboard/user/profile' element={<Profile />} />
          </Route>


          {/* //admin  */}
          <Route element={<AdminRoute />}>
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path="admin-dashboard/create-category" element={<CreateCategory />} />
            <Route path="admin-dashboard/create-product" element={<CreateProduct />} />
            <Route path="product/:slug" element={<UpdateProduct />} />
            <Route path="admin-dashboard/products" element={<Products />} />
            <Route path="admin-dashboard/users" element={<Users />} />
            <Route path="user/:_id" element={<UpdateUser />} />
            <Route path="admin-dashboard/orders" element={<AdminOrders />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </div>

  );
}

export default App;
