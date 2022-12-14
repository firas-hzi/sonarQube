import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import {Header} from './Components/Header/Header';
import { Login } from './Components/Login/Login';
import { Profile } from './Components/Profile/Profile';
import { Register } from './Components/Register/Register';
import { Shop } from './Components/Shop/Shop';
import { Notification } from './Components/Notifications/Notification';
import { Cart } from './Components/Cart/Cart';
import { Checkout } from './Components/Checkout/Checkout';
import { CheckoutComplete } from './Components/Checkout/CheckoutComplete';
import { Admin } from './Components/Admin/admin';
import { ForgotPassword } from './Components/ResetPassword/ForgotPassword';
function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
      <Header />
      <Routes>
     
        <Route path="" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/shop" element={<Shop />}/>
        <Route path="/notification" element={<Notification />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/reset" element={<ForgotPassword />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />}/>;
        <Route path="/checkout-complete" element={<CheckoutComplete />}/>;
      </Routes>
      <Footer />
    </BrowserRouter>
    
    </div>
  );
}
export default App;