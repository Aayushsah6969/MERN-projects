import { useState } from 'react';
import './Navbar.css';
import { FaBars, } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);


  const handleMenuClick = () => {
    setMenuActive(!menuActive);
    // setSearchActive(false); // Hide search when menu is opened
  };

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.reload();  // To refresh the page when logout is clicked. This is a workaround as react-router doesn't support automatic page refresh.
 // window.location.href = '/';  // This will redirect the user to the root route.
}

  return (
    <nav>
      <div className="menu-icon" onClick={handleMenuClick}>
        <FaBars />
      </div>
      <Link to='/'>  <div className="logo">
        iNoteBook
      </div>
      </Link>

      <ul className={`nav-items ${menuActive ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="about">About</Link></li>
      </ul>

      <div className="buttons">
       {!localStorage.getItem('token')?

        <><Link to='/Login'>  <button>Login</button></Link><Link to='/Signup'>    <button>SignUp</button></Link></>:
        // <Link to='/Logout'> <button>Logout</button></Link>
          <button onClick={handleLogout}>Logout</button> 
      }
      </div>

    </nav>
  );
};

export default Navbar;
