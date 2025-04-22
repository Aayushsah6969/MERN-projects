import { Link } from "react-router-dom";
import Category from "./Category";
import FeaturedProducts from "./FeaturedProducts";
import Reviews from "./Reviews";
import Subscribe from "./Subscribe";

const LandingPage = () => {


  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className=" h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">AIZA Collection</h1>
          <p className="text-2xl md:text-3xl mb-8">Elevate Your Style</p>
          <Link to='/shop' className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Category Section */}
      <Category/>

      {/* Featured Products */}
      <FeaturedProducts/>

      {/* Testimonials */}
 <Reviews/>

      {/* Call-to-Action */}
<Subscribe/>      

   
    </div>
  );
};

export default LandingPage;
