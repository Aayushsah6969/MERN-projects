import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
const navigate = useNavigate();

  const handleResetPassword = async () => {
   if(!email){
     alert('Please enter your email');
     return;
   } 
   else{
    await axios
      .post('http://localhost:3000/user/reset-password', { email })
      .then((response) => {
        console.log(response);
        // alert(response.data.message);
        if(response.data.success===true){
            localStorage.setItem('passwordResetToken',response.data.passwordResetToken);
            navigate('/update-password');
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.log(error);
      });
   }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
    
       <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleResetPassword}
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Reset Password
        </button>
      
      </div>
    </div>
  );
};

export default ForgotPassword;
