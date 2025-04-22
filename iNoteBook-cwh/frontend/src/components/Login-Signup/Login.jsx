import { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/auth/userlogin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const data = await response.json();
    console.log(data);

    if (data.success) {
      localStorage.setItem('token', data.authtoken);
      navigate("/");
    } else {
      alert('Invalid credentials');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };



  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="submit-button"  >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
