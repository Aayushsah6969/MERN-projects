import Navbar from './Header'
import { Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import AllProducts from "./AllProducts";
import UploadProduct from "./UploadProduct";
import AllUsers from "./AllUsers";
import Home from './Home';
import AllOrders from './AllOrders';

const Dashboard = () => {
    return (
        <div className='dark:bg-gray-800'>
            <Navbar />
            <TopBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/allproducts" element={<AllProducts />} />
                <Route path="/uploadProduct" element={<UploadProduct />} />
                <Route path="/allusers" element={<AllUsers />} />
                <Route path="/allorders" element={<AllOrders />} />
            </Routes>
        </div>
    )
}

export default Dashboard