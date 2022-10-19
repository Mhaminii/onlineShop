import React , {useEffect, useState} from "react";
import axios from 'axios'
import './App.css';
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import AllProduct from './components/AllProduct';
import ProductDetails from './components/product/productDetails'
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ProtectedRoute from "./components/route/ProtectedRoute";

import {loadUser} from './actions/userActions'
import store from './store'
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import UsersList from "./components/admin/UsersList";

import Dashboard from "./components/admin/Dashboard";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrder from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetails";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UpdateUser from "./components/admin/UpdateUser";

function App() { 

  const [stripeApiKey , setStripeApiKey] = useState('')

  useEffect(()=>{
    store.dispatch(loadUser())

    async function getStripeApiKey (){
      const {data} = await axios.get('/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    
    getStripeApiKey()

  }, [])

  return (
    <Router>
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search/:keyword" element={<Home/>} />
        <Route path="/products" element={<AllProduct/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/me" element={<Profile/>} />
        <Route path="/me/update" element={<UpdateProfile/>} />
        <Route path="/password/update" element={<UpdatePassword/>} />
        <Route path="/password/forgot" element={<ForgotPassword/>} />
        <Route path="/password/reset/:token" element={<NewPassword/>} />

        <Route path="/cart" element={<Cart/>} />
        <Route path="/shipping" element={<Shipping/>} />
        <Route path="/order/confrim" element={<ConfirmOrder/>} />
        <Route path = "/payment" element={ stripeApiKey && 
          <Elements stripe={loadStripe(stripeApiKey)}> <Payment/> </Elements>} />
        <Route path="/success" element={<OrderSuccess/>} />
        <Route path="/orders/me" element={<ListOrder/>} />
        <Route path="/order/:id" element={<OrderDetails/>} />
        <Route path="/admin/orders" element={<OrdersList/>} />

        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/admin/products" element={<ProductList/>} />
        <Route path="/admin/product" element={<NewProduct/>} />
        <Route path="/admin/product/:id" element={<UpdateProduct/>} />
        <Route path="/admin/order/:id" element={<ProcessOrder/>} />
        <Route path="/admin/users" element={<UsersList/>} />
        <Route path="/admin/user/:id" element={<UpdateUser/>} />

      </Routes>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
