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



const Layout = () => {
  const location =useLocation();
  return(
  <>
    <Navbar />
    <Outlet />
    {location.pathname !== '/cartpage' && location.pathname !== '/login' && <Footer />}

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
          </Route>
          <Route path='/cartpage' element={<Cartproducts/>}/>
          <Route path='/payment' element={<Payment/>}/>
         
        </Routes>
      
    </BrowserRouter>
    
  );
}

export default Router;
