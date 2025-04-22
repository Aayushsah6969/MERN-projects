import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]); // Use camelCase for consistency

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products/getproduct");
        console.log(response.data);

        // Filter products where isFeatured is true
        const featured = response.data.filter(product => product.isFeatured === true);
        setFilteredProducts(featured);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {filteredProducts.map((product, index) => (
              <Link to={`/shop/${product._id}`} key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  {product.discount>0 ? 
               <div> <del className="mt-1">Rs.{product.price}</del>
                <p>{product.price-((product.discount/100)*product.price)}</p></div>
                :  
                <p className="mt-1">Rs.{product.price}</p>
                }
                  <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                    Buy Now
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
