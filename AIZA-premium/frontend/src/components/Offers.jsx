import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Offers = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products/getproduct");
        const discountedProducts = response.data.filter(product => product.discount > 40);
        setProducts(discountedProducts);
        setFilteredProducts(discountedProducts);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <h2 className="text-2xl font-bold text-center mb-1 mt-20">Exclusive Offers</h2>
        <p className="text-center mb-8">Here you will get some exclusive offers from our store at best price and that all suits you.</p>

        {/* Products Grid */}
        <div className="flex flex-wrap justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/shop/${product._id}`} key={product._id} className="lg:w-1/5 md:w-1/4 p-1 m-2  w-full border">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={product.image}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.name}
                  </h2>
                  {product.discount > 0 && (
                    <div>
                      <del className="mt-1">Rs.{product.price}</del>
                      <p>{product.price - (product.discount / 100) * product.price}</p>
                      <p className="text-green-500">Discount: {product.discount}%</p>
                    </div>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center w-full">No offers available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Offers;
