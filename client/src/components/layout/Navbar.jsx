import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaUser, FaHome, FaList, FaPlus } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-blue-800 font-bold text-2xl">FindPerson</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                isActive('/') ? 'text-blue-800' : 'text-gray-700 hover:text-blue-800'
              }`}
            >
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
            <Link 
              to="/missing" 
              className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                isActive('/missing') ? 'text-blue-800' : 'text-gray-700 hover:text-blue-800'
              }`}
            >
              <FaList className="text-lg" />
              <span>Missing Persons</span>
            </Link>
            <Link 
              to="/report" 
              className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                isActive('/report') ? 'text-blue-800' : 'text-gray-700 hover:text-blue-800'
              }`}
            >
              <FaPlus className="text-lg" />
              <span>Report Missing</span>
            </Link>
          </nav>

          <div className="flex items-center">
            <Link 
              to="/report" 
              className="hidden md:block btn-primary mr-4"
            >
              Report Missing Person
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-blue-800 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 px-2 bg-white border-t mt-2 animate-fade-in">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 p-3 rounded-md ${
                isActive('/') ? 'bg-blue-50 text-blue-800' : 'text-gray-700'
              }`}
            >
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
            <Link 
              to="/missing" 
              className={`flex items-center space-x-2 p-3 rounded-md ${
                isActive('/missing') ? 'bg-blue-50 text-blue-800' : 'text-gray-700'
              }`}
            >
              <FaList className="text-lg" />
              <span>Missing Persons</span>
            </Link>
            <Link 
              to="/report" 
              className={`flex items-center space-x-2 p-3 rounded-md ${
                isActive('/report') ? 'bg-blue-50 text-blue-800' : 'text-gray-700'
              }`}
            >
              <FaPlus className="text-lg" />
              <span>Report Missing</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;