import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Replace "YOUR_GOOGLE_CLIENT_ID" with your actual Google Client ID
const CLIENT_ID = "12548025570-viv6334mnhb2rps9qc23q4fk4qbvl94c.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
