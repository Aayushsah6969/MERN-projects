import { useState } from 'react';
import axios from 'axios';

const UploadProduct = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    category: '',
    description: '',
    images: [], // Updated to hold multiple images
    isFeatured: false,
  });

  // State to handle success or error messages
  const [message, setMessage] = useState('');

  // Handle form change
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) }); // Handle multiple file uploads
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked }); // Handle checkbox change
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if file size of any file is greater than 5MB
    if (formData.images.some((file) => file.size > 5 * 1024 * 1024)) {
      setMessage('Each file size should be less than 5MB.');
      return;
    }

    const form = new FormData(); // Use FormData to handle file upload
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('discount', formData.discount);
    form.append('category', formData.category);
    form.append('description', formData.description);
    form.append('isFeatured', formData.isFeatured);

    // Append multiple images
    formData.images.forEach((image, index) => {
      form.append(`images`, image);
    });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/products/uploadproduct', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setMessage('Product uploaded successfully!');
      setFormData({
        name: '',
        price: '',
        discount: '',
        category: '',
        description: '',
        images: [],
        isFeatured: false,
      });
    } catch (error) {
      console.error('Error uploading the Product:', error.response?.data || error.message);
      setMessage('Error uploading the Product.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 dark:bg-gray-700 bg-gray-200 p-10 w-full">
  <h2 className="text-2xl font-bold mb-5 dark:text-white">Upload a New Product</h2>
  {message && <p className="mb-4 text-blue-500">{message}</p>}
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
          htmlFor="name"
        >
          Product Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter product name"
          required
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
          htmlFor="price"
        >
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter price"
          required
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
          htmlFor="discount"
        >
          Discount Percentage
        </label>
        <input
          id="discount"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter discount"
          required
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
          htmlFor="category"
        >
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter category"
          required
        />
      </div>
    </div>

    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name="isFeatured"
        id="isFeatured"
        className="w-5 h-5"
        checked={formData.isFeatured}
        onChange={handleChange}
      />
      <label
        className="text-gray-700 text-sm font-bold dark:text-white"
        htmlFor="isFeatured"
      >
        Featured Product
      </label>
    </div>

    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
        htmlFor="description"
      >
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter description"
        required
      ></textarea>
    </div>

    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
        htmlFor="images"
      >
        Upload Images
      </label>
      <input
        id="images"
        name="images"
        type="file"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        multiple
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Upload Product
    </button>
  </form>
</div>

  );
};

export default UploadProduct;
