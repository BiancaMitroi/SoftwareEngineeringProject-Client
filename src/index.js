import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './pages/Layout';
import Register from "./pages/Register";
import Login from "./pages/Login";
import AllProductsPage from "./pages/AllProductsPage";
import CartPage from './pages/CartPage';
import PlaceOrder from './pages/PlaceOrder'
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          
          <Route index element = {<Layout/>} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="allproductspage" element={<AllProductsPage />} />
          <Route path="cart" element={<CartPage />} />
          
          <Route path="placeorder" element={<PlaceOrder/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);