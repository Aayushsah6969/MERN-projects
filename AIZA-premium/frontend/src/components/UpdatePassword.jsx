import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // For accessing query parameters

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();  // To access query parameters (for token)

  const resetToken = new URLSearchParams(location.search).get('token');  // Extract token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!resetToken || !newPassword) {
      setError("Token and new password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/update-password", {
        resetToken,
        newPassword,
      });
      setMessage(response.data.message);
      setError(""); // Clear any previous errors
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
          >
            Update Password
          </button>
        </form>

        {message && <p className="text-green-600 text-center mt-4">{message}</p>}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default UpdatePassword;
