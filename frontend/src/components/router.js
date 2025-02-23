import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import Products from './products';
import Productdetails from './productdetails';
import BrandProduct from './brandproduct';
import Cartproducts from './Cartproducts';
import Login from './login';
import Footer from './footer';
import Payment from './payment'
import Register from './registration';
import ForgotPassword from './forget_passwoed';
import { Outlet,useLocation } from 'react-router-dom';
import Resetpassword from './resetpassword';
import AddProducts from './addProducts';




const Layout = () => {
  const location =useLocation();
  return(
  <>
    <Navbar />
    <Outlet />
    {location.pathname !== '/cartpage' && location.pathname !== '/login' && location.pathname !=='/reset-password' && location.pathname !== '/register' && location.pathname !== '/forgot-password' &&<Footer />}

  </>
  );
};


function Router() {
  return (
    
    <BrowserRouter>
        
      
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/brand/:category/:brandid" element={<BrandProduct />} />
          <Route path="/:category/:subcategory" element={<Products/>}/>
          <Route path="/:category" element={<Products/>}/>
          <Route path="/products/:category/:id" element={<Productdetails />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password' element={<Resetpassword/>}/>
          </Route>
          <Route path='/cartpage' element={<Cartproducts/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/addProducts' element={<AddProducts/>}></Route>
        </Routes>
      
    </BrowserRouter>
    
  );
}

export default Router;
