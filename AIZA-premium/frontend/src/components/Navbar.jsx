import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const token = localStorage.getItem('token');

    const storedUserData = localStorage.getItem('Book-User-Data');
    const user = JSON.parse(storedUserData);

    const handleToggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Book-User-Data');
        navigate('/');
        window.location.reload();
    };

    return (
        <header
            className={`fixed w-full p-2 z-50 transition-all duration-300   ${isScrolled ? 'bg-white shadow-md' : 'bg-gray-500'
                }`}
        >
            <div className={`container mx-auto flex justify-between items-center ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                <Link to='/'>
                    <h1 className="text-3xl font-bold text-blue-900">AIZA</h1>
                    <span className='text-blue-700'>Collections</span>
                </Link>
                <nav className="hidden md:flex space-x-6">
                    <a href='/' className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-900  text-2xl`}>
                        Home
                    </a>
                    <a href='/shop' className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-900  text-2xl`}>
                        Shop
                    </a>
                    <a href='/offer' className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-900  text-2xl`}>
                        Sales/Offers
                    </a>
                    <a href='/' className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-900  text-2xl`}>
                        About Us
                    </a>
                    <a href='/contact' className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-900  text-2xl`}>
                        Contact
                    </a>
                </nav>
                <div className="flex items-center space-x-4">

                    {token ?
                        <div className='flex '>
                            <div className="relative m-4">
                                <Link to='/myorders' className={`fas fa-shopping-cart ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-900 text-2xl cursor-pointer`}></Link>
                            </div>
                            <div className="relative m-4">
                                <i onClick={handleToggleMenu} className={`fas fa-user ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-900 text-2xl cursor-pointer`}></i>

                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-10 w-48 bg-gray-300 shadow-lg rounded-md p-4 z-10">
                                        <h4 className="text-lg font-semibold">{user.fullname}</h4>
                                        <Link to="/" className="block text-gray-700 hover:bg-gray-100 rounded-md p-2">Settings</Link>
                                        <Link to="/" className="block text-gray-700 hover:bg-gray-100 rounded-md p-2">Profile</Link>
                                        <Link to="/" className="block text-gray-700 bg-blue-500 hover:bg-blue-400 rounded-md p-2" onClick={handleLogout}>Logout</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        :

                        <Link to='/login' className="w-full mt-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-200 ease-in-out">
                            Login
                        </Link>
                    }



                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <i className="fas fa-bars text-white-600 text-2xl hover:text-blue-900"></i>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <nav className="flex flex-col space-y-2 p-4">
                        <a href='/' className="text-gray-600 hover:text-blue-900">
                            Home
                        </a>
                        <a href='/shop' className="text-gray-600 hover:text-blue-900">
                            Shop
                        </a>
                        <a href='/offer' className="text-gray-600 hover:text-blue-900">
                           Sales/Offers
                        </a>
                        <a href='/aboutus' className="text-gray-600 hover:text-blue-900">
                            About Us
                        </a>
                        <a href='/contact' className="text-gray-600 hover:text-blue-900">
                            Contact
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;