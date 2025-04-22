import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MyOrders from "./components/MyOrders";
import LandingPage from "./components/LandingPage";
import Shop from "./components/Shop";
import OneProduct from "./components/OneProduct";
import Contact from "./components/Contact";
import Offers from "./components/Offers";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword";

function App() {

  return (
   
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/offer" element={<Offers/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/shop/:id" element={<OneProduct/>} />
        <Route path="/myorders" element={<MyOrders/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/update-password" element={<UpdatePassword/>} />

      </Routes>
      <Footer/>
    </>
 
  )
}

export default App
