// import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import About from './components/About';
import './App.css';
import NoteState from './context/notes/NoteState';
import Login from './components/Login-Signup/Login';
import Signup from './components/Login-Signup/Signup';

function App() {

  

  return (
    <NoteState>
      <Router>
        <Navbar />
      
        <Routes>
          <Route path="/" element={<Home   />} />
          <Route path="/about" element={<About  />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup  />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
