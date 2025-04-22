import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce"; // Import lodash debounce
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products/getproduct");
        console.log(response.data);
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = useCallback(
    debounce((term) => {
      const lowercasedTerm = term.toLowerCase();
      const filtered = products.filter(
        (product) =>
          (product.name && product.name.toLowerCase().includes(lowercasedTerm)) ||
          (product.category && product.category.toLowerCase().includes(lowercasedTerm))
      );
      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to first page
    }, 300),
    [products]
  );

  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginate = (pageNumber) => {
    // Set the current page (this could be updating state in a React component or similar)
    setCurrentPage(pageNumber);
  
    // Scroll the page to the top with smooth animation
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        {/* Search Bar */}
        <div className="mb-8 flex justify-center mt-20">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Products Grid */}
        <div className="flex flex-wrap  justify-center">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Link to={`/shop/${product._id}`} key={product._id} className="lg:w-1/5 md:w-1/4 p-1 m-2  w-full border">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={product.images[0]}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.name}
                  </h2>
                  {product.discount>0 ? 
               <div> <div className="flex items-center"><del className="mt-1 p-1">Rs. {product.price}</del> <b>{product.discount}%</b></div>
                <p>Rs. {product.price-((product.discount/100)*product.price)}</p></div>
                :  
                <p className="mt-1">Rs. {product.price}</p>
                }
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center w-full">No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="inline-flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
