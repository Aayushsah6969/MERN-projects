import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  // State for manual login
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle manual login form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle manual login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:3000/user/login', formData);
      const { token, user } = response.data;

      localStorage.setItem('Book-User-Data', JSON.stringify(user));
      localStorage.setItem('token', token);

      setSuccess(true);
      setFormData({ email: '', password: '' });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
    setLoading(false);
  };

  // Handle Google login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post('http://localhost:3000/user/google-login', {
          token: tokenResponse.access_token,
        });
        const { token, user } = response.data;

        localStorage.setItem('Book-User-Data', JSON.stringify(user));
        localStorage.setItem('token', token);

        navigate('/');
      } catch (error) {
        console.error('Google Login Error:', error);
        setError('Google login failed. Please try again.');
      }
    },
    onError: () => {
      console.error('Google Login Error');
      setError('Google login failed. Please try again.');
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg dark:bg-gray-600">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 dark:text-white">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Login successful!</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 mt-4 dark:text-white">
          Forgot Password? <a href="/forgot-password" className="text-green-600">Reset Now</a>
        </p>
        <p className="text-center text-gray-500 mt-4 dark:text-white">
          Don't have an account? <a href="/signup" className="text-red-600">Register now</a>
        </p>

        <div className="mt-4">
          <button
            onClick={() => googleLogin()}
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-600"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
