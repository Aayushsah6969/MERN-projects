import axios from 'axios';
import { useEffect, useState } from 'react';

const AllProducts = () => {
  const [products, setproducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentproduct, setCurrentproduct] = useState(null); // Holds the product details being edited
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    category: '',
    image: ''
  });

  // Fetch products from API
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products/getproduct');
        setproducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchproducts();
  }, []);

  // Handle opening the edit modal
  const onEdit = (product) => {
    setIsModalOpen(true);
    setCurrentproduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      discount: product.discount,
      category: product.category,
      image: product.image,
    });
  };

  // Handle closing the edit modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentproduct(null);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle saving edited product
  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');  // Assuming JWT is saved in localStorage

    try {
      await axios.put(`http://localhost:3000/products/updateproduct/${currentproduct._id}`, formData,{
        headers: { Authorization: `Bearer ${token}` }
      });
      setproducts(products.map((product) => (product._id === currentproduct._id ? { ...product, ...formData } : product)));
      closeModal();
      alert('product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update the product');
    }
  };

  // Handle delete product with confirmation
  const onDelete = async (id) => {
    const token = localStorage.getItem('token');  // Assuming JWT is saved in localStorage

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:3000/products/deleteproduct/${id}`,{
          headers: { Authorization: `Bearer ${token}` }
        });
        setproducts(products.filter((product) => product._id !== id));
        alert('product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete the product');
      }
    }
  };

// Filter products based on search term (name or category)
const filteredproducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.category.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <>
      {/* Search Bar */}
      <div className="m-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {filteredproducts.length > 0 ? 
      (
        filteredproducts.map((product) => (
          <div key={product._id} className="m-4 dark:bg-gray-600 flex justify-between items-center bg-gray-100 p-4 rounded-md shadow mb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h2>
            <p className='dark:text-white'>Price: {product.price}</p>
            <p className='dark:text-white'>Discount: {product.discount}%</p>
            <p className='dark:text-white'>Category: {product.category}</p>
            <img src={product.images[0]} className="w-16 h-auto" alt={product.name} />
            <div className="space-x-2">
              <button
                onClick={() => onEdit(product)} // Open modal and pass product
                className="bg-blue-500 dark:text-white hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product._id)} // Pass product id to onDelete
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded dark:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-white">No products available.</p>
      )}

      {/* Edit product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2 dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Edit product</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="name">
                product Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="price">
                Discount Percentage
              </label>
              <input
                id="discount"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="category">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="image">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                type="text"
                readOnly
                value={formData.image}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
